"use client"
import React from 'react';
import { useEffect, useState} from 'react';
import { useForm } from "react-hook-form";
import {reauthenticateWithCredential, EmailAuthProvider, updatePassword} from "firebase/auth";
import { useRouter } from 'next/navigation';
import { useAuth, useUser} from 'reactfire';
import { useUserContext } from '../../../layout';
const CambiarPasswordPage = () => {
    const auth = useAuth();
    const router = useRouter();
    const {user} = useUserContext();
  useEffect(() => {
    if(!user){
        router.push('/main/login');
    }else{
        console.log("hola");
    }
  }, [])
  const { register, watch, formState: { errors }, handleSubmit} = useForm();

  const changePassword = async(userUpdate) =>{
    const credential = EmailAuthProvider.credential(user.email, userUpdate.oldPassword);
    const response = await reauthenticateWithCredential(user, credential);
    console.log(response);
    const responseNewPass = await updatePassword(auth.currentUser, userUpdate.newPassword);
    console.log(responseNewPass);
    debugger;
  }
  
  const onSubmit = (data) =>{
    const userUpdate ={
        oldPassword:data.oldPassword,
        newPasswordassword:data.newPassword
    }
    changePassword(userUpdate);
  }

  return (
    <form className='flex w-full h-screen bg-[#F2F2F2] justify-center align-middle items-center' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col bg-[#EAEAEA] border-2 border-black p-6 gap-10 w-5/12'>
        <div className='flex w-full text-2xl text-start text-black'>Cambiar contraseña</div>
        <div className='flex flex-col gap-10 border-2 border-black bg-[#f6f6f6] p-5 w-full' >
          <div className='flex flex-col w-full h-1/3'>
            <label className=" flex text-xl text-black mb-5 font-medium">Anterior Contraseña</label>
          <input
              type="password"
              className="flex text-base bg-[#E1E1E1] w-full h-2/3 invalid:border-red-800 px-4 py-3 text-black align-middle items-center"
              placeholder="*****"
              {...register('oldPassword', {
                  required: true
              })}
          />
          {errors.oldPassword?.type === 'required' && <h1 className=" text-base text-red-700">*Debe llenar este campo</h1>}
          </div>
          <div className='flex flex-col h-1/3'>
            <label className=" text-xl text-black mb-5 font-medium">Nueva Contraseña</label>
            <input
              type="password"
              className="flex text-base bg-[#E1E1E1] w-full h-2/3 invalid:border-red-800 px-4 py-3 text-black align-middle items-center"
              placeholder="*****"
              {...register('newPassword', {
                  required: true
              })}
            />
            {errors.newPassword?.type === 'required' && <h1 className=" text-base text-red-700">*Debe llenar este campo</h1>}
          </div>
          <div className='flex flex-col h-1/3'>
            <label className=" text-xl text-black mb-5 font-medium">Confirmar Nueva Contraseña</label>
            <input
              type="password"
              className="flex text-base bg-[#E1E1E1] w-full h-2/3 invalid:border-red-800 px-4 py-3 text-black align-middle items-center"
              placeholder="*****"
              {...register('confirmNewPassword', {
                  required: true,
                  validate: (val) =>{
                    if(watch('newPassword') != val){
                      return false;
                    }
                  }
              })}
            />
            {errors.confirmNewPassword?.type === 'required' && <h1 className=" text-base text-red-700">*Debe llenar este campo</h1>}
            {errors.confirmNewPassword?.type === 'validate' && <h1 className=" text-base text-red-700">*Las contraseñas no coinciden</h1>}
          </div>
        </div>
        <div className='flex w-full justify-center items-center align-middle'>
          <button className=' flex text-xl font-medium w-1/3 h-9 bg-[#929292] px-5 py-6 text-white justify-center items-center align-middle' type="submit">Guardar</button>
        </div>
        
      </div>
    </form>
  )
}

export default CambiarPasswordPage;