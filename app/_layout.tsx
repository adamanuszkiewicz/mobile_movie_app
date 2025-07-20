import '../polyfills/early-polyfill';
import '../polyfills/device-polyfill';
import { Stack } from "expo-router";
import './globals.css';
import '../polyfills/turbomodule';
import { StatusBar, Platform } from "react-native";
import { MobileViewport } from '../components/MobileViewport';

export default function RootLayout() {
  // Added some Galaxy S20+ specific console logging for debugging
  console.log('RootLayout initializing...');
  console.log('Platform:', Platform.OS, Platform.Version);
  console.log('TurboModuleRegistry available:', !!(global as any).TurboModuleRegistry);
  
  return (
      <>
        <StatusBar hidden={true} />
        <MobileViewport>
          <Stack>
             <Stack.Screen
                 name="(tabs)"
                 options={{ headerShown: false }}
             />
             <Stack.Screen
                 name="movies/[id]"
                 options={{ headerShown: false }}
             />
          </Stack>
        </MobileViewport>
      </>
  );
}
