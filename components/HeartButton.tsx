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
        <TouchableOpacity onPress={handleLike}>
            {isLiked ? (
                <Image source={(icons.heart)} className="w-8 h-8 ml-[22rem]" />
                ) : (
                <Image source={(icons.heart2)} className="w-8 h-8 ml-[22rem]" />
            )}
        </TouchableOpacity>
    );
};

export default HeartButton;