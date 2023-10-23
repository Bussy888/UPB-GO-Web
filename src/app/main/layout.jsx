"use client"
import React from 'react';
import { Inter } from 'next/font/google'
import {AuthProvider, useFirebaseApp } from 'reactfire';
import { getAuth } from 'firebase/auth';
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  const app = useFirebaseApp();
    const auth = getAuth(app);
  return (
      <AuthProvider sdk={auth}>
      <body className={inter.className}>{children}</body>
      </AuthProvider>
  )
}