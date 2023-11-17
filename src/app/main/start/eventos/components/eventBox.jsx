"use client"
import React from 'react';
import { useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser} from 'reactfire';
import {useFirestore, useFirestoreCollectionData} from "reactfire";
import {collection, addDoc, setDoc, doc, getDoc} from "firebase/firestore";
const EventBox = (evento) => {
    const auth = useAuth();
    const router = useRouter();
    const user = useUser();
  useEffect(() => {
    console.log(evento)
  }, [])

  return (
    <>
      <div className='flex flex-col border-2 border-black bg-[#f6f6f6] w-full' >
      <div className='flex flex-col bg-[#f6f6f6] p-5 gap-5 w-full'>
        <div className='flex flex-row'>
            <div className='flex flex-row w-3/5 gap-1 align-bottom items-end'>
                <div className='flex text-2xl text-start text-black'>{evento.evento.nombre}</div>
                <div className='flex text-xs text-start text-black mb-1'>({evento.evento.fecha})</div>
            </div>
            <div className='flex flex-row w-2/5 gap-2 items-end justify-end'>
                <div className='flex text-base text-center text-black underline hover:text-gray-700'>Copiar</div>
                <div className='flex text-base text-center text-black underline hover:text-gray-700'>Ver</div>
            </div>
        </div>
        
        <div className='flex flex-wrap gap-10 w-full text-black text-left whitespace-normal font-normal text-base' >
            Después de hacer click en ‘Confirmar’, upb-go enviará un email a la cuenta con la que hizo login. Siga las instrucciones de este email para cambiar su contraseña.
        </div>
        <div className='flex w-full justify-center items-center align-middle flex-row gap-2'>
          <button className=' flex text-base font-normal bg-[#CB2F2F] py-4 px-6 text-white justify-center items-center align-middle' onClick={() => back()}>Eliminar</button>
        </div>
      </div>
      </div>
    </>
  )
}

export default EventBox;