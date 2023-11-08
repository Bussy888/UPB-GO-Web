"use client"
import React from 'react';
import { createContext, useContext, useState } from 'react';
import { Inter } from 'next/font/google'
import { FirebaseAppProvider} from 'reactfire';
import './globals.css'
import config from '@/firebase/config';

const inter = Inter({ subsets: ['latin'] });

const UserContext = createContext();

export const useUserContext = () =>{
  return useContext(UserContext);
}

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);
  return (
    <html lang="en">
      <UserContext.Provider value={{user, setUser}}>
      <FirebaseAppProvider firebaseConfig={config}>
      <body className={inter.className}>{children}</body>
      </FirebaseAppProvider>
      </UserContext.Provider>
    </html>
  )
}
