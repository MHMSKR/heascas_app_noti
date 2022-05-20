import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import CustomButton from '../components/CustomButton'
import CustomeTextOutput from '../components/CustomeTextOutput'
import axios from 'axios'
const TestScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#1A2938"
                barStyle='#FFFFFF'
            />
            <CustomeTextOutput
                text='Public Screen'
                family={'Medium'}
                size={20}
                color={'#FFFFFF'}
            />
            <CustomButton
                text='Cover Screen'
                bgColor='#E9C300'
                fgColor='#FFFFFF'
                fontFamily='Medium'
                width={'100%'}
                onPress={() => { navigation.navigate('Cover') }}
            />
            <CustomButton
                text='Login Screen'
                bgColor='#E90144'
                fgColor='#FFFFFF'
                fontFamily='Medium'
                width={'100%'}
                onPress={() => { navigation.navigate('Login') }}
            />
            <CustomButton
                text='Register Screen'
                bgColor='#F661AD'
                fgColor='#FFFFFF'
                fontFamily='Medium'
                width={'100%'}
                onPress={() => { navigation.navigate('Register') }}
            />
            <CustomeTextOutput
                text='Auth Screen'
                family={'Medium'}
                size={20}
                color={'#FFFFFF'}
            />
            <CustomButton
                text='Home Screen'
                bgColor='#2B22AD'
                fgColor='#FFFFFF'
                fontFamily='Medium'
                width={'100%'}
                onPress={() => { navigation.navigate('Home') }}
            />
        </SafeAreaView>
    )
}

export default TestScreen

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#1A2938',
        paddingHorizontal: 35,
    }
})