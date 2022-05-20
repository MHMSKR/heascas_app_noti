import React, { useState , useEffect } from 'react';
import { Text, View, Image, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import logoImg from '../assets/image/logo.png';
import welcomImg from '../assets/image/welcom.png';
import CustomButton from '../components/CustomButton';
import CustomAlert from '../components/CustomAlert';


function CoverScreen({ navigation }) {

    const [visible, setModalVisible] = useState(true)
    return (
        <SafeAreaView style={styles.container}>
            <CustomAlert
                alertStyle={'info'}
                title ={'Info'}
                message ={'This application is still under development. Users may encounter bugs or errors while using the app. And this version only supports the Android operating system.'}
                btDone ={() => { setModalVisible(!visible)}}
                visible={visible} 
            />
            <StatusBar
                animated={true}
                backgroundColor="#1A2938"
                barStyle='#FFFFFF'
            />
            <View style={styles.logo}>
                <Image style={styles.imageLogo}
                    source={logoImg}
                />
            </View>
            <View >
                <Image style={styles.image}
                    source={welcomImg}
                />
            </View>
            <CustomButton
                text='Sign in'
                width={'100%'}
                bgColor='#E9C300'
                fgColor='#FFFFFF'
                fontFamily='Medium'
                onPress={() => {
                    navigation.navigate('Login')
                }} />
            <Text style={{ color: '#FFFFFF', fontFamily: 'Kanit-Medium', marginVertical: 3 }}>OR</Text>
            <CustomButton
                border={true}
                width={'100%'}
                text='Don’t have an account ? Sign Up'
                fgColor='#E9C300'
                onPress={() => { navigation.navigate('Register') }} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#1A2938',
        paddingHorizontal: 35
    },
    logo: {
        alignItems: 'center',
    },
    imageLogo: {
        width: 154,
        height: 129,
        marginTop: 80
    },
    image: {
        width: 294,
        height: 144,
        marginTop: 50,
        marginBottom: 60
    }
})
export default CoverScreen