import React from 'react';
import {Tabs} from "expo-router";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import {Image, ImageBackground, Text, View} from "react-native";

const TabIcon = ({ focused, icon, title } : any) => {
    if (focused) {
        return (
            <View className="flex-1 justify-center items-center">
                <ImageBackground
                    source={images.highlight}
                    className="flex flex-row justify-center items-center rounded-full overflow-hidden"
                    style={{ 
                        paddingHorizontal: 16, 
                        paddingVertical: 8, 
                        minWidth: 80,
                        height: 50
                    }}
                >
                    <Image source={icon}
                           tintColor="#151312" className="size-5" />
                    <Text className="text-secondary text-sm font-semibold ml-2">{title}</Text>
                </ImageBackground>
            </View>
        )
    }

    return (
        <View className="flex-1 justify-center items-center">
            <Image source={icon}
                tintColor="#A8B5DB" className="size-5"
            />
        </View>
    )
}

const _Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "transparent",
                    height: 52, // Match tab bar height
                    paddingVertical: 8, // Add vertical padding for better alignment
                },
                tabBarStyle: {
                    backgroundColor: "#0f0d23",
                    borderRadius: 50,
                    marginHorizontal: 20,
                    marginBottom: 40,
                    height: 52,
                    position: "absolute",
                    overflow: "hidden",
                    borderWidth: 0.1,
                    borderColor: "0f0d23",
                    
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.home}
                            title="Home"
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.search}
                            title="Search"
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    title: "Saved",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.save}
                            title="Saved"
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.person}
                            title="Profile"
                        />
                    )
                }}
            />
        </Tabs>
    )
}
export default _Layout
