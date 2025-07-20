// import Icon from 'react-native-vector-icons';
import React, {useState, useEffect} from "react";
import {Image, TouchableOpacity} from "react-native";
import {icons} from "@/constants/icons";

const HeartButton = () => {
    const [isLiked, setIsLiked] = useState(false);
    const handleLike = () => {
        setIsLiked(!isLiked)
    }

    return (
        <TouchableOpacity 
            onPress={handleLike}
            style={{ 
                position: 'absolute',
                right: 16,
                top: 16,
                zIndex: 1
            }}
        >
            {isLiked ? (
                <Image 
                    source={icons.heart} 
                    style={{ 
                        width: 32, 
                        height: 32 
                    }}
                    resizeMode="contain"
                />
                ) : (
                <Image 
                    source={icons.heart2} 
                    style={{ 
                        width: 32, 
                        height: 32 
                    }}
                    resizeMode="contain"
                />
            )}
        </TouchableOpacity>
    );
};

export default HeartButton;