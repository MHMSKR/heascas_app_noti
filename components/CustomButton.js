import { View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
const CustomButton = ({ onPress, text, fgColor, bgColor, border, fontFamily,width,height = 40,fontSize=15,marginV = 5}) => {
  return (

      <TouchableOpacity style={[
        styles.container,
        bgColor ? { backgroundColor: bgColor } : {},
        border ? { borderWidth: 1, borderColor: fgColor } : {},
        {width: width,height:height,marginVertical:marginV}
      ]}
        onPress={onPress} >
        <Text style={[
          styles.text,
          fgColor ? { color: fgColor } : {},
          fontFamily ? { fontFamily: `Kanit-${fontFamily}` } : { fontFamily: 'Kanit-Light' },
          {fontSize:fontSize}
        ]}>{text}</Text>
      </TouchableOpacity>

  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
})

export default CustomButton