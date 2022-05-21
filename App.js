import React,{useEffect} from 'react';
import { AuthProvider } from './context/AuthContext'
import { AxiosProvider } from './context/AxiosContext'
import  Navigations from './Navigations'


export default function App() {
  return (
    <AuthProvider >
      <AxiosProvider>
        <Navigations />
      </AxiosProvider>
    </AuthProvider>
  );
}