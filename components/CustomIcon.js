import { StyleSheet, TouchableOpacity, Image, Text } from 'react-native'
import React from 'react'

const CustomIcon = ({ source, onPressIn, onPressOut, onPress, iconStyle, touchStyle, text, textStyle }) => {
    if (text) {
        return (
            <TouchableOpacity
                style={[styles.touch, touchStyle]}
                onPress={onPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}>
                <Image
                    source={source}
                    style={[iconStyle]} />
                <Text style={textStyle}>{text}</Text>
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity
                style={[styles.touch, touchStyle]}
                onPress={onPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}>
                <Image
                    source={source}
                    style={[iconStyle]} />
            </TouchableOpacity>
        )
    }

}

export default CustomIcon

const styles = StyleSheet.create({
    touch: {
        justifyContent: 'center',
        alignItems: 'center',

    }
})