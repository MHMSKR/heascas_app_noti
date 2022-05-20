import { View, Text } from 'react-native'
import React from 'react'

const CustomeTextOutput = ({ text = 'CustomText', size, family='Light', color }) => {
    return (
        <Text style={{ fontSize: size, fontFamily: `Kanit-${family}`, color: color }}>{text}</Text>
    )
}

export default CustomeTextOutput