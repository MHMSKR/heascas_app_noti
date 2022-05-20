import React, { useContext, useState, useEffect, useCallback } from 'react';
import CoverScreen from './screens/CoverScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import TestScreen from './screens/TestScreen';
import HomeScreen from './screens/HomeScreen';
import CustomLoading from './components/CustomLoading';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthContext } from './context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestUserPermission , NotificationListener } from './src/utils/notification'

function Navigations() {
    // get Auth Context
    const authContaxt = useContext(AuthContext)
    const [status, setStatus] = useState('loading')
    // Load token funtion
    const loadJWT = useCallback(async function () {
        try {
            // get token in secure store
            const value = AsyncStorage.getItem('token')
            const token = JSON.parse(value);

            // set state on context
            authContaxt.setAuthState({
                accessToken: token.accessToken || null,
                refreshToken: token.refreshToken || null,
                authenticated: token.accessToken !== null
            })
            setStatus('success')

        } catch (error) {
            authContaxt.setAuthState({
                accessToken: null,
                refreshToken: null,
                authenticated: false
            })
            setStatus('error')
        }
    }, [])
    useEffect(()=>{
        requestUserPermission();
        NotificationListener();
      },[])

    useEffect(() => {

        loadJWT();
    }, [loadJWT])

    if (status == 'loading') {
        return <CustomLoading />
    }

    const Stack = createNativeStackNavigator();
    if (authContaxt.AuthState.authenticated === false) {
        return (
            <NavigationContainer >
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {/* <Stack.Screen name='Test' component={TestScreen} /> */}
                    <Stack.Screen name='Cover' component={CoverScreen} />
                    <Stack.Screen name='Login' component={LoginScreen} />
                    <Stack.Screen name='Register' component={RegisterScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    } else {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {/* <Stack.Screen name='Test' component={TestScreen} /> */}
                    <Stack.Screen name='Home' component={HomeScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }

}

export default Navigations