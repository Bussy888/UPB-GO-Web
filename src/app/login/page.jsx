"use client"
import React from 'react';
import { useForm } from "react-hook-form";
//firebase
import { FirebaseAppProvider, AuthProvider, useFirebaseApp} from 'reactfire';
import config from '@/firebase/config';

import Auxlogin from './components/auxlogin';


const LoginPage = () =>{
    return(
        <>
        <FirebaseAppProvider firebaseConfig={config}>
        
        <Auxlogin/>
        </FirebaseAppProvider>
        </>
    )
}

export default LoginPage;