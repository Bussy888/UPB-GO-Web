"use client"
import React from 'react';
import { useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser} from 'reactfire';
import {useFirestore, useFirestoreCollectionData} from "reactfire";
import {collection, addDoc, setDoc, doc, getDoc} from "firebase/firestore";
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

  const back = () =>{
    router.push('/main/start');
  }

  return (
    <div className='flex w-full h-screen bg-[#F2F2F2] justify-center align-middle items-center'>
      <div className='flex flex-col bg-[#EAEAEA] border-2 border-black p-6 gap-10 w-5/12'>
        <div className='flex w-full text-2xl text-start text-black'>Eventos</div>
        <div className='flex flex-col gap-10 border-2 border-black bg-[#f6f6f6] p-5 w-full' >
          <div className='flex flex-col h-1/3'>
            <div className=" text-xl text-black font-medium text-center">Después de hacer click en ‘Confirmar’, upb-go enviará un email a la cuenta con la que hizo login. Siga las instrucciones de este email para cambiar su contraseña.</div>
          </div>
        </div>
        <div className='flex w-full justify-center items-center align-middle flex-row gap-2'>
          <button className=' flex text-xl font-medium w-1/3 h-9 bg-[#CDCDCD] px-5 py-6 text-stone-600 justify-center items-center align-middle' onClick={() => back()}>Atrás</button>
          <button className=' flex text-xl font-medium w-1/3 h-9 bg-[#929292] px-5 py-6 text-white justify-center items-center align-middle' onClick={()=> newEvent()}>Añadir</button>
        </div>
        
      </div>
    </div>
  )
}

export default EventosPage;