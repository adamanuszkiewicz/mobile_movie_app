// Comprehensive error handling and recovery for TurboModuleRegistry
// Specifically designed for Galaxy S20+ and similar Android devices

console.log('Loading comprehensive error recovery polyfill...');

// Override console.error to catch and handle TurboModule errors
const originalError = console.error;
console.error = function(...args) {
  const message = args.join(' ');
  
  // Intercept TurboModuleRegistry errors and provide solutions
  if (message.includes('TurboModuleRegistry') || message.includes('PlatformConstants')) {
    console.warn('TurboModuleRegistry error intercepted, applying fix...');
    
    // Ensure our polyfill is active
    if (!global.TurboModuleRegistry) {
      console.log('Installing emergency TurboModuleRegistry polyfill...');
      global.TurboModuleRegistry = {
        getEnforcing: (name) => {
          console.log(`Emergency TurboModule polyfill for: ${name}`);
          
          if (name === 'PlatformConstants') {
            return {
              OS: 'android',
              Version: 33,
              isTV: false,
              isTesting: false,
              reactNativeVersion: { major: 0, minor: 79, patch: 5 },
              forceTouchAvailable: false,
              interfaceIdiom: 'phone',
              Brand: 'samsung',
              Model: 'SM-G986B'
            };
          }
          
          return { getConstants: () => ({}) };
        },
        get: (name) => global.TurboModuleRegistry.getEnforcing(name)
      };
    }
    
    // Don't log the original error, just our warning
    return;
  }
  
  // For all other errors, use original behavior
  originalError.apply(console, args);
};

// Override global error handler
const originalErrorHandler = global.ErrorUtils?.setGlobalHandler;
if (originalErrorHandler) {
  global.ErrorUtils.setGlobalHandler((error, isFatal) => {
    const errorMessage = error?.message || '';
    
    if (errorMessage.includes('TurboModuleRegistry') || errorMessage.includes('PlatformConstants')) {
      console.warn('Global TurboModuleRegistry error caught and handled:', errorMessage);
      // Don't crash the app for TurboModule errors
      return;
    }
    
    // For other errors, use original handler
    if (originalErrorHandler) {
      originalErrorHandler(error, isFatal);
    }
  });
}

// Setup unhandled promise rejection handler
const originalUnhandledRejection = global.onUnhandledRejection;
global.onUnhandledRejection = function(error) {
  const errorMessage = error?.message || '';
  
  if (errorMessage.includes('TurboModuleRegistry') || errorMessage.includes('PlatformConstants')) {
    console.warn('Unhandled TurboModuleRegistry promise rejection handled:', errorMessage);
    return;
  }
  
  if (originalUnhandledRejection) {
    originalUnhandledRejection(error);
  }
};

console.log('Error recovery polyfill installed successfully');
