// Root entry point that loads polyfills before React Native initialization
import './polyfills/early-polyfill';

console.log('Early polyfills loaded, starting app...');

// Import the main app
import 'expo-router/entry';
