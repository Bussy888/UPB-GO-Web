"use client"
import React from 'react';
import { Inter } from 'next/font/google'
import { FirebaseAppProvider} from 'reactfire';
import './globals.css'
import config from '@/firebase/config';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <FirebaseAppProvider firebaseConfig={config}>
      <body className={inter.className}>{children}</body>
      </FirebaseAppProvider>
    </html>
  )
}
