import React, { useState, useContext ,useEffect} from 'react'
import { StyleSheet, View, Image, Text, SafeAreaView, ScrollView, AlertButton } from 'react-native'
import logoImg from '../assets/image/logo.png';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import CustomGap from '../components/CustomGap';
import { AxiosContext } from '../context/AxiosContext';
import { AuthContext } from '../context/AuthContext'
import CustomAlert from '../components/CustomAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';

function RegisterScreen({ navigation }) {
    const controller = new AbortController();
    const authContext = useContext(AuthContext);
    const [fullname, setFullname] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [repassword, setRePassword] = useState('');
    const [visible, setModalVisible] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertTitle, setAlertTitle] = useState('');

    const { publicAxios } = useContext(AxiosContext)

    const onRegister = () => {
        try {
            // Validate input require 
            if (!(fullname && password && email && repassword)) {
                setModalVisible(true)
                setAlertType('info')
                setAlertMessage('All input is required')
            } else {
                //validate match password
                if ((password !== repassword) || (password.length < 7) || (repassword.length < 7)) {
                    setModalVisible(true)
                    setAlertType('info')
                    setAlertMessage('password not match or password length less than 8 letter')
                } else {
                    // register api
                    publicAxios.post('/register', {
                        fullname: fullname,
                        email: email,
                        password: password,
                        role: role
                    },{ signal: controller.signal }).then(function (response) {
                        setModalVisible(true)
                        setAlertType('success')
                        setAlertMessage(response.data.message)
                        const { accessToken, refreshToken } = response.data;
                        authContext.setAuthState({
                            accessToken,
                            refreshToken,
                            authenticated: true,
                        })
                        // save token in secure store
                        AsyncStorage.setItem('token',
                            JSON.stringify(
                                {
                                    accessToken,
                                    refreshToken
                                }
                            )
                        )
                    }).catch(function (error) {
                        setModalVisible(true)
                        setAlertType('warning')
                        setAlertTitle('status code : ' + error.response.status)
                        setAlertMessage(error.response.data.message)
                    })

                }


            }
        } catch (error) {
            setModalVisible(true)
            setAlertType('warning')
            setAlertMessage(error)
        }

    }
    const clearState = () => { 
        setPassword(null)
        setRePassword(null)
    }
    useEffect(() => {
        return (() => {
            setModalVisible(null)
            setAlertType(null)
            setAlertTitle(null)
            setAlertMessage(null)
            setRole(null)
            setEmail(null)
            setFullname(null)
            controller.abort();
        })
    },[])

    return (

        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                <CustomAlert
                    alertStyle={alertType}
                    title={alertType}
                    subtitle={alertTitle}
                    message={alertMessage}
                    btDone={() => {
                        setModalVisible(!visible)
                        clearState()
                    }}
                    visible={visible}
                />
                <View style={styles.logo}>
                    <Image style={styles.imageLogo}
                        source={logoImg}
                    />
                </View>
                <View>
                    <Text style={styles.textSignUp}>
                        Sign Up
                    </Text>
                </View>

                <CustomTextInput
                    placeholder='Fullname'
                    value={fullname}
                    setValue={setFullname} />
                <CustomTextInput
                    placeholder='Email Address'
                    value={email}
                    setValue={setEmail} />
                <CustomTextInput
                    placeholder='Role : "Host" or "Resident"'
                    value={role}
                    setValue={setRole} />
                <CustomTextInput
                    placeholder='Password'
                    secure={true}
                    iconEye={true}
                    value={password}
                    setValue={setPassword} />
                <CustomTextInput
                    placeholder='Comfirm-Password'
                    secure={true}
                    iconEye={true}
                    value={repassword}
                    setValue={setRePassword} />

                <CustomGap height={40} />
                <CustomButton
                    text='Register'
                    bgColor='#E9C300'
                    fgColor='#FFFFFF'
                    padding={10}
                    width={'100%'}
                    fontFamily='Medium'
                    onPress={onRegister}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1A2938',
        paddingHorizontal: 35,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-start',
    },
    scrollView: {
        width: '100%',
    },
    logo: {
        alignItems: 'center',
        marginBottom: 20,
    },
    imageLogo: {
        width: 154,
        height: 129,
        marginTop: 60
    },
    textSignUp: {
        fontFamily: 'Kanit-Medium',
        fontSize: 22,
        color: '#FFFFFF',
        marginBottom: 15,
        alignSelf: 'center'

    }
})

export default RegisterScreen