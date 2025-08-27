import React from 'react';
import { View, Platform, Text } from 'react-native';
import { useScreenSize } from '../hooks/useScreenSize';

interface MobileViewportProps {
  children: React.ReactNode;
}

export const MobileViewport: React.FC<MobileViewportProps> = ({ children }) => {
  const { width: screenWidth, height: screenHeight, isMobile } = useScreenSize();
  
  // Galaxy S20+ dimensions in CSS pixels
  const MOBILE_WIDTH = 384;
  const MOBILE_HEIGHT = 854;
  
  // On native mobile or small screens, use full viewport
  if (Platform.OS !== 'web' || isMobile) {
    return (
      <View style={{ 
        flex: 1,
        backgroundColor: '#000000' 
      }}>
        {children}
      </View>
    );
  }
  
  // On desktop web, create a mobile-like container
  return (
    <View style={{
      width: screenWidth,
      height: screenHeight,
      backgroundColor: '#1a1a1a',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    }}>
      {/* Phone Frame */}
      <View style={{
        width: MOBILE_WIDTH + 8,
        height: Math.min(MOBILE_HEIGHT + 8, screenHeight - 40),
        backgroundColor: '#2a2a2a',
        borderRadius: 32,
        padding: 4,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 25 },
        shadowOpacity: 0.4,
        shadowRadius: 80,
        elevation: 25,
      }}>
        {/* Screen */}
        <View style={{
          width: MOBILE_WIDTH,
          height: Math.min(MOBILE_HEIGHT, screenHeight - 48),
          backgroundColor: '#000000',
          borderRadius: 28,
          overflow: 'hidden',
        }}>
          {/* Notch/Camera cutout simulation */}
          <View style={{
            position: 'absolute',
            top: 0,
            left: (MOBILE_WIDTH - 120) / 2,
            width: 120,
            height: 24,
            backgroundColor: '#2a2a2a',
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            zIndex: 1000
          }} />
          
          {/* App Content */}
          <View style={{
            flex: 1,
            backgroundColor: '#000000',
            paddingTop: 24, // Account for notch
          }}>
            {children}
          </View>
        </View>
      </View>
      
      {/* Device Info */}
      <View style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        padding: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 8,
      }}>
        <Text style={{ 
          color: '#ffffff', 
          fontSize: 12, 
          opacity: 0.7 
        }}>
          Galaxy S20+ Simulation
        </Text>
      </View>
    </View>
  );
};

export default MobileViewport;
