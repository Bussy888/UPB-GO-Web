"use client"
import React from 'react';
import { useEffect, useState} from 'react';
import { useForm } from "react-hook-form";
import {reauthenticateWithCredential, EmailAuthProvider, updatePassword, sendPasswordResetEmail} from "firebase/auth";
import { useRouter } from 'next/navigation';
import { useAuth, useUser} from 'reactfire';
import { useUserContext } from '../../../layout';
const CambiarPasswordPage = () => {
    const auth = useAuth();
    const router = useRouter();
    const {user, setUser} = useUserContext();
  useEffect(() => {
    if(!user){
        router.push('/main/login');
    }else{
        console.log("hola");
    }
  }, [])

  const changePassword = async() =>{
    /*const credential = EmailAuthProvider.credential(user.email, userUpdate.oldPassword);
    const response = await reauthenticateWithCredential(user, credential);
    console.log(response);
    const responseNewPass = await updatePassword(auth.currentUser, userUpdate.newPassword);
    console.log(responseNewPass);
    debugger;*/

    const responseNewPass = await sendPasswordResetEmail(auth, user.email);
    setUser(null);
    router.push('/main/login');
  }
  
  const onSubmit = () =>{
    changePassword();
  }

  const back = () =>{
    router.push('/main/start');
  }

  return (
    <div className='flex w-full h-screen bg-[#F2F2F2] justify-center align-middle items-center'>
      <div className='flex flex-col bg-[#EAEAEA] border-2 border-black p-6 gap-10 w-5/12'>
        <div className='flex w-full text-2xl text-start text-black'>Cambiar contraseña</div>
        <div className='flex flex-col gap-10 border-2 border-black bg-[#f6f6f6] p-5 w-full' >
          <div className='flex flex-col h-1/3'>
            <div className=" text-xl text-black font-medium text-center">Después de hacer click en ‘Confirmar’, upb-go enviará un email a la cuenta con la que hizo login. Siga las instrucciones de este email para cambiar su contraseña.</div>
          </div>
        </div>
        <div className='flex w-full justify-center items-center align-middle flex-row gap-2'>
          <button className=' flex text-xl font-medium w-1/3 h-9 bg-[#CDCDCD] px-5 py-6 text-stone-600 justify-center items-center align-middle' onClick={() => back()}>Atrás</button>
          <button className=' flex text-xl font-medium w-1/3 h-9 bg-[#929292] px-5 py-6 text-white justify-center items-center align-middle' onClick={()=> onSubmit()}>Confirmar</button>
        </div>
        
      </div>
    </div>
  )
}

export default CambiarPasswordPage;