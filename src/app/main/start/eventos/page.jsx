"use client"
import React from 'react';
import { useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser} from 'reactfire';
const EventosPage = () => {
    const auth = useAuth();
    const router = useRouter();
    const user = useUser();
  useEffect(() => {
    //TODO: add context to save user there
    if(!auth.currentUser){
        router.push('/main/login');
    }else{
        console.log("hola");
    }
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      </div>
    </main>
  )
}

export default EventosPage;