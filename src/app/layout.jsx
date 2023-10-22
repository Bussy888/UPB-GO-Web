"use client"
import React from 'react';
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthUserProvider } from '@/firebase/authContext';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthUserProvider children={children}>
      </AuthUserProvider>
    </html>
  )
}
