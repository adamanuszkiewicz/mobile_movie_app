// Device-specific polyfills for Galaxy S20+
import { Platform, Dimensions } from 'react-native';

console.log('Loading device-specific polyfills for Galaxy S20+...');

// Get actual device dimensions
const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

// Enhanced PlatformConstants for Galaxy S20+
const GalaxyS20PlusConstants = {
  OS: 'android',
  Version: 33, // Android 13
  isTV: false,
  isTesting: false,
  reactNativeVersion: { major: 0, minor: 79, patch: 5 },
  forceTouchAvailable: false,
  interfaceIdiom: 'phone',
  Brand: 'samsung',
  Model: 'SM-G986B',
  Manufacturer: 'Samsung',
  DeviceType: 'Handset',
  // Galaxy S20+ specific dimensions
  Dimensions: {
    window: { 
      width: deviceWidth, 
      height: deviceHeight, 
      scale: Platform.select({ android: 2.75, default: 2 }),
      fontScale: 1 
    },
    screen: { 
      width: screenWidth, 
      height: screenHeight, 
      scale: Platform.select({ android: 2.75, default: 2 }),
      fontScale: 1 
    }
  },
  getConstants: function() {
    return this;
  }
};

// Override global constants early
if (global.TurboModuleRegistry) {
  const originalGetEnforcing = global.TurboModuleRegistry.getEnforcing;
  
  global.TurboModuleRegistry.getEnforcing = function(name) {
    if (name === 'PlatformConstants') {
      console.log('Providing Galaxy S20+ specific PlatformConstants');
      return GalaxyS20PlusConstants;
    }
    return originalGetEnforcing.call(this, name);
  };
}

// Also set up direct global access
global.__PLATFORM_CONSTANTS__ = GalaxyS20PlusConstants;

console.log('Galaxy S20+ device polyfills loaded successfully');
