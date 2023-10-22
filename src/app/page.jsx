"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../firebase/authContext';

const MainPage = () => {
  const { authUser} = useAuth();
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!authUser){
      router.push('/login')
    }
  }, [authUser])

  return (
    <>
    <div>
      hola
    </div>
    </>
  )
}

export default MainPage;