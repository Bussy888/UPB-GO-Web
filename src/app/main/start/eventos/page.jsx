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
    <div className='flex w-full h-screen bg-[#F2F2F2] justify-center align-middle items-center'>
      <div className='flex bg-[#EAEAEA] border-2 border-black py-6 px-6 gap-10 justify-center align-middle items-center'>
        <div className='flex flex-col border-2 border-black p-5 gap-5'>
          <div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default EventosPage;