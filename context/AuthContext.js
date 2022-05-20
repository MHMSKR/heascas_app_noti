import React from 'react'
import { createContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);
const { Provider } = AuthContext;

function AuthProvider({ children }) {
    const [AuthState, setAuthState] = useState({
        accessToken: null,
        refreshToken: null,
        authenticated: null
    });

    const Logout = () => {
        // reset token to null in secure store
        AsyncStorage.removeItem('token')
        // set AuthState 
        setAuthState({
            accessToken: null,
            refreshToken: null,
            authenticated: false
        });
    };

        // funtion get access token in AuthState a the time
    const getAccessToken = () => {
        return AuthState.accessToken;
    }
    return (
        <Provider value={
            {
                AuthState,
                setAuthState,
                Logout,
                getAccessToken,

            }
        }>
            {children}
        </Provider>
    )
}

export {AuthProvider,AuthContext}