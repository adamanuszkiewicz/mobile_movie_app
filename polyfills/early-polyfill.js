// Early polyfill that runs before React Native initialization
// This must be imported before any React Native code

console.log('Loading early TurboModuleRegistry polyfill...');

// Set up global polyfills immediately
if (typeof global !== 'undefined') {
  // Polyfill TurboModuleRegistry
  if (!global.TurboModuleRegistry) {
    global.TurboModuleRegistry = {
      getEnforcing: function(name) {
        console.log(`TurboModuleRegistry.getEnforcing called for: ${name}`);
        
        switch (name) {
          case 'PlatformConstants':
            return {
              OS: 'android',
              Version: 33,
              isTV: false,
              isTesting: false,
              reactNativeVersion: { major: 0, minor: 79, patch: 5 },
              forceTouchAvailable: false,
              interfaceIdiom: 'phone',
              Brand: 'samsung',
              Model: 'SM-G986B',
              getConstants: function() {
                return this;
              }
            };
          
          case 'DeviceInfo':
            return {
              getConstants: function() {
                return {
                  Dimensions: {
                    window: { width: 384, height: 854, scale: 2.75 },
                    screen: { width: 384, height: 854, scale: 2.75 }
                  }
                };
              }
            };
          
          case 'StatusBarManager':
            return {
              getConstants: function() {
                return {
                  HEIGHT: 24
                };
              },
              setStyle: function() {},
              setHidden: function() {}
            };
          
          default:
            console.warn(`Unknown TurboModule requested: ${name}`);
            return {
              getConstants: function() { return {}; }
            };
        }
      },
      
      get: function(name) {
        console.log(`TurboModuleRegistry.get called for: ${name}`);
        return this.getEnforcing(name);
      }
    };
    
    console.log('TurboModuleRegistry polyfill installed successfully');
  }
  
  // Also set up NativeModules polyfill
  if (!global.nativeModules) {
    global.nativeModules = {};
  }
  
  // Polyfill for __turboModuleProxy
  if (!global.__turboModuleProxy) {
    global.__turboModuleProxy = function(name) {
      console.log(`__turboModuleProxy called for: ${name}`);
      return global.TurboModuleRegistry.getEnforcing(name);
    };
  }
  
  // Error handling for TurboModule failures
  const originalError = console.error;
  console.error = function(...args) {
    const message = args.join(' ');
    
    if (message.includes('TurboModuleRegistry') || message.includes('PlatformConstants')) {
      console.warn('TurboModuleRegistry error intercepted during early initialization');
      return;
    }
    
    originalError.apply(console, args);
  };
}

// Also try to intercept require calls
const originalRequire = global.require;
if (originalRequire) {
  global.require = function(moduleName) {
    if (moduleName === 'react-native/Libraries/TurboModule/TurboModuleRegistry') {
      console.log('Intercepted TurboModuleRegistry require');
      return global.TurboModuleRegistry;
    }
    return originalRequire.apply(this, arguments);
  };
}

console.log('Early polyfill setup complete');
