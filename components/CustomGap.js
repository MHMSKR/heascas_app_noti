import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const CustomGap = ({height}) => {
  return (
    <View style={[styles.container,{height:height}]}>

    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
})
export default CustomGap