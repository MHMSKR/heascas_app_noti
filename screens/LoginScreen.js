import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, Image, Text, SafeAreaView } from 'react-native'
import logoImg from '../assets/image/logo.png';
import CustomButton from '../components/CustomButton';
import CustomLoading from '../components/CustomLoading';
import CustomTextInput from '../components/CustomTextInput';
import CustomGap from '../components/CustomGap';
import CustomAlert from '../components/CustomAlert';
import { AuthContext } from '../context/AuthContext'
import { AxiosContext } from '../context/AxiosContext'
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginScreen({ navigation }) {
  const controller = new AbortController();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('')
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext)
  const [visible, setModalVisible] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');

  const fcmtoken = AsyncStorage.getItem('fcmtoken')
  const onLogin = () => {
    try {
      setStatus(true)
      if (!(username && password)) {
        setStatus(false)
        setModalVisible(true)
        setAlertType('info')
        setAlertMessage('All input is required')
      } else {
        // get respone from api login
        publicAxios.post('/login', {
          email: username,
          password: password,
          fcmtoken:fcmtoken,
        },{ signal: controller.signal}).then((response) => {
          // set context state 
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
          setModalVisible(true)
          setAlertType('success')
          setAlertMessage(response.data.message)
          setStatus(false)
        }).catch((error) => {
          setModalVisible(true)
          setAlertType('warning')
          setAlertTitle('status code : ' + error.response.status)
          setAlertMessage(error.response.data.message)
          setStatus(false)
        })
      }
    } catch (error) {
      setModalVisible(true)
      setAlertType('warning')
      setAlertTitle('status code : ' + error.response.status)
      setAlertMessage(error.response.data.message)
      setStatus(false)
    }
    
  } 
  const clearState = () => {
    setPassword(null)
  }
  useEffect(()=>{
    return(()=>{
      setModalVisible(null)
      setAlertType(null)
      setAlertTitle(null)
      setAlertMessage(null)
      setStatus(null)
      controller.abort(); 
    })
  },[])
  return (
    <SafeAreaView style={styles.container}>
      <CustomLoading  visible={status}/> 
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
        <Image style={[styles.imageLogo]}
          source={logoImg}
        />
      </View>
      <View>
        <Text style={styles.textSignIn}>
          Sign in
        </Text>
      </View>
      <CustomTextInput
        placeholder='Email Address'
        value={username}
        setValue={setUsername} />
      <CustomTextInput
        placeholder='Password'
        secure={true}
        iconEye={true}
        value={password}
        setValue={setPassword} />
      <CustomGap height={50} />
      <CustomButton
        text='Sign in'
        bgColor='#E9C300'
        fgColor='#FFFFFF'
        padding={10}
        fontFamily='Medium'
        width={'100%'}
        onPress={onLogin} />
      <Text style={{ color: '#FFFFFF', fontFamily: 'Kanit-Medium', marginVertical: 3 }}>OR</Text>
      <CustomButton
        border={true}
        text='Don’t have an account ? Sign Up'
        fgColor='#E9C300'
        width={'100%'}
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
    marginBottom: 40
  },
  imageLogo: {
    width: 154,
    height: 129,
    marginTop: 60
  },
  textSignIn: {
    fontFamily: 'Kanit-Medium',
    fontSize: 22,
    color: '#FFFFFF',
    marginBottom: 30
  },

})
export default LoginScreen