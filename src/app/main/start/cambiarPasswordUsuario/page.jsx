"use client"
import React from 'react';
import { useEffect} from 'react';
import { useRouter } from 'next/navigation';
import {createUserWithEmailAndPassword} from "firebase/auth";
import { useAuth, useUser} from 'reactfire';
import { useForm } from "react-hook-form";
import {useFirestore, useFirestoreCollectionData} from "reactfire";
import {collection, addDoc, setDoc, doc} from "firebase/firestore";
const UsuariosPage = () => {
    const auth = useAuth();
    const router = useRouter();
    const firestore = useFirestore();
    const usersCollection = collection(firestore, 'users');

  useEffect(() => {
    //TODO: add context to save user there
    if(!auth.currentUser){
        router.push('/main/login');
    }else{
        console.log("hola");
    }
  }, [])

  const { register, watch, formState: { errors }, handleSubmit} = useForm({defaultValues: {admin: false}});

  const changePassword = async (user) =>{
    const responseNewPass = await sendPasswordResetEmail(auth, user.email);
    router.push('/main/start');
}
const onSubmit = (data) =>{
    const user ={
        email:data.email
    }
    changePassword(user);
}

const back = () =>{
  router.push('/main/start');
}

  return (
    <div className='flex w-full h-screen bg-[#F2F2F2] justify-center align-middle items-center'>
      <form className='flex flex-col bg-[#EAEAEA] border-2 border-black py-6 px-6 gap-10 justify-center align-middle items-center w-5/12' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex text-black text-2xl font-normal text-start w-full'>Nuevo Usuario</div>
        <div className='flex flex-col border-2 border-black p-5 gap-5 w-full bg-[#f6f6f6]'>
                    <div className='flex flex-col'>
                        <label className=" text-xl text-black mb-5 font-medium">Email</label>
                        <input
                            type="text"
                            className=" w-full text-base p-4 text-black bg-[#E1E1E1]"
                            placeholder="ejemplo123@upb.com"
                            {...register('email', {
                                required: true
                            })}
                        />
                        {errors.email?.type === 'required' && <h1 className=" text-base text-red-700">*Debe llenar este campo</h1>}
                    </div>
        </div>
        <div className='flex w-full justify-center items-center align-middle flex-row gap-2'>
          <div className=' flex text-xl font-medium w-1/3 h-9 bg-[#CDCDCD] px-5 py-6 text-stone-600 justify-center items-center align-middle' onClick={() => back()}>Atrás</div>
          <button className=' flex text-xl font-medium w-1/3 h-9 bg-[#929292] px-5 py-6 text-white justify-center items-center align-middle' type='submit'>Confirmar</button>
        </div>
      </form>
    </div>
  )
}

export default UsuariosPage;