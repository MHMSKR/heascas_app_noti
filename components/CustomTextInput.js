import { View, TextInput, StyleSheet, } from 'react-native'
import React, { useState } from 'react'
import view from '../assets/icons/hide.png'
import CustomIcon from './CustomIcon'

const CustomTextInput = ({ placeholder, secure, value, setValue, iconEye = false }) => {
    const [showPw, setShowPd] = useState(secure);
    const onPress = () => {
        setShowPd(!showPw)
    }
    if (iconEye) {
        return (
            <View style={styles.container}>
                <TextInput
                    value={value}
                    onChangeText={setValue}
                    placeholder={placeholder}
                    secureTextEntry={showPw}
                    style={styles.text}
                />
                <CustomIcon
                    source={view}
                    iconStyle={styles.icon}
                    touchStyle={styles.touch}
                    onPressIn={onPress}
                    onPressOut={onPress}
                />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <TextInput
                    value={value}
                    onChangeText={setValue}
                    placeholder={placeholder}
                    secureTextEntry={showPw}
                    style={styles.text}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginVertical: 5,
        borderRadius: 100,
        backgroundColor: 'white'
    },
    text: {
        fontFamily: 'Kanit-Light',
        fontSize: 15,
        width: '92%'
    },
    touch: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    icon: {
        width: 25,
        height: 25,
        opacity: 0.2
    },


})

export default CustomTextInput