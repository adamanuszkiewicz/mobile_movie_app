import { Platform } from 'react-native';

console.log('Loading comprehensive TurboModuleRegistry polyfill...');

// Enhanced TurboModuleRegistry polyfill with better error handling
try {
  // Ensure global TurboModuleRegistry exists with comprehensive module support
  if (!global.TurboModuleRegistry) {
    global.TurboModuleRegistry = {
      getEnforcing: (name) => {
        console.log(`TurboModuleRegistry.getEnforcing: ${name}`);
        
        switch (name) {
          case 'PlatformConstants':
            return {
              OS: Platform.OS || 'android',
              Version: Platform.Version || 33,
              isTV: Platform.isTV || false,
              isTesting: Platform.isTesting || false,
              reactNativeVersion: { 
                major: 0, 
                minor: 79, 
                patch: 5,
                prerelease: null 
              },
              forceTouchAvailable: false,
              interfaceIdiom: Platform.isPad ? 'pad' : 'phone',
              Brand: 'samsung',
              Model: 'SM-G986B',
              Manufacturer: 'Samsung',
              getConstants: function() {
                return this;
              }
            };
          
          case 'DeviceInfo':
            return {
              getConstants: () => ({
                Dimensions: {
                  window: { width: 384, height: 854, scale: 2.75, fontScale: 1 },
                  screen: { width: 384, height: 854, scale: 2.75, fontScale: 1 }
                },
                isIPhoneX_deprecated: false,
                isTablet: false
              })
            };
          
          case 'StatusBarManager':
            return {
              getConstants: () => ({ HEIGHT: 24 }),
              setStyle: () => {},
              setHidden: () => {},
              setColor: () => {},
              setTranslucent: () => {}
            };
          
          case 'Appearance':
            return {
              getColorScheme: () => 'light',
              addChangeListener: () => ({ remove: () => {} }),
              removeChangeListener: () => {}
            };
          
          case 'I18nManager':
            return {
              isRTL: false,
              doLeftAndRightSwapInRTL: true,
              allowRTL: () => {},
              forceRTL: () => {},
              swapLeftAndRightInRTL: () => {}
            };
          
          default:
            console.warn(`Unknown TurboModule requested: ${name}, providing empty mock`);
            return {
              getConstants: () => ({}),
              addListener: () => ({ remove: () => {} }),
              removeListeners: () => {}
            };
        }
      },
      
      get: (name) => {
        try {
          return global.TurboModuleRegistry.getEnforcing(name);
        } catch (error) {
          console.warn(`TurboModuleRegistry.get failed for ${name}:`, error);
          return null;
        }
      }
    };
  }

  // Patch the actual React Native TurboModuleRegistry if it exists
  try {
    const RNTurboModuleRegistry = require('react-native/Libraries/TurboModule/TurboModuleRegistry');
    
    if (RNTurboModuleRegistry && RNTurboModuleRegistry.getEnforcing) {
      const originalGetEnforcing = RNTurboModuleRegistry.getEnforcing;
      const originalGet = RNTurboModuleRegistry.get;
      
      RNTurboModuleRegistry.getEnforcing = function(name) {
        try {
          return originalGetEnforcing.call(this, name);
        } catch (error) {
          console.warn(`Native TurboModule ${name} failed, using polyfill:`, error.message);
          return global.TurboModuleRegistry.getEnforcing(name);
        }
      };
      
      RNTurboModuleRegistry.get = function(name) {
        try {
          return originalGet ? originalGet.call(this, name) : null;
        } catch (error) {
          console.warn(`Native TurboModule get ${name} failed, using polyfill:`, error.message);
          return global.TurboModuleRegistry.get(name);
        }
      };
      
      console.log('Successfully patched React Native TurboModuleRegistry');
    }
  } catch (requireError) {
    console.log('React Native TurboModuleRegistry not available for patching, using global polyfill only');
  }
  
  console.log('TurboModuleRegistry polyfill setup completed successfully');
  
} catch (setupError) {
  console.error('TurboModuleRegistry polyfill setup failed:', setupError);
}
