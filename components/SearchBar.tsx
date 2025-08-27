import React from 'react'
import {View, Text, Image, TextInput, Pressable} from 'react-native'
import {icons} from "@/constants/icons";

interface Props {
    placeholder: string;
    onPress?: () => void;
    onFocus?: () => void;
    value?: string;
    onChangeText?: (text: string) => void;
}

const SearchBar = ({ placeholder, onPress, onFocus, value, onChangeText}: Props) => {
    return (
        <Pressable onPress={onPress}>
            <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
                <Image source={icons.search} className="size-5"
                       resizeMode="contain" tintColor="#ab8bff" />
                <TextInput
                    onFocus={onFocus}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    placeholderTextColor="#a8b5db"
                    className="flex-1 ml-2 text-white"
                    editable={!onPress} // Make it non-editable if onPress is provided (navigation mode)
                    pointerEvents={onPress ? 'none' : 'auto'} // Disable text input interactions when used for navigation
                />
            </View>
        </Pressable>
    )
}
export default SearchBar