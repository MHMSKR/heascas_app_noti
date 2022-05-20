import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import image from '../assets/icons/user.png'

const CustomeImage = ({ stylesImage, touchStyle, souceUri, onPress }) => {
    if (souceUri) {
        return (
            <TouchableOpacity onPress={onPress} style={[style.container, touchStyle]}>
                <Image 
                source={{ uri: souceUri }} 
                style={stylesImage} />
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity onPress={onPress} style={[style.container, touchStyle]}>
                <Image source={image} style={stylesImage} />
            </TouchableOpacity>
        )
    }


}

export default CustomeImage

const style = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})