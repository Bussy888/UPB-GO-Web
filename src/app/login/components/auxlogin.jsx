"use client"
import React from 'react';
import { AuthProvider, useFirebaseApp } from 'reactfire';
import { getAuth } from 'firebase/auth';
import FireLogin from './fireLogin';

const Auxlogin = () =>{
    const app = useFirebaseApp();
    const auth = getAuth(app);
    return (
        <AuthProvider sdk={auth}>
            <FireLogin></FireLogin>
        </AuthProvider>
    );
}

export default Auxlogin;