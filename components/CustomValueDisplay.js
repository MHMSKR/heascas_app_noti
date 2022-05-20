import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CustomValueDisplay = ({ name = 'name', value = 0,unit = 'unit' }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.circle}>
                <Text style={styles.value}>{value}</Text>
                <Text style={styles.unit}>{unit}</Text>
            </View>
        </View>
    )
}

export default CustomValueDisplay

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        margin: 5,
        width: 150,
        height: 150,
        elevation: 5,
        padding: 5,
    },
    name: {
        fontFamily: 'Kanit-Medium',
        height:20,
        textTransform:'capitalize'
    },
    circle:{
        width:110,
        height:110,
        alignSelf:'center',
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:5,
        borderColor:'#1A2938'
    },
    value:{
        fontFamily:'Kanit-Light',
        fontSize:28,
        marginTop:10,
        color:'#1A2938'
    },
    unit:{
        fontFamily: 'Kanit-Light',
        fontSize:18,
        color:'#1A2938',
    }
})