"use client"
import React from 'react';
import { useEffect, useState} from 'react';
import { useForm } from "react-hook-form";
import { useAuth} from 'reactfire';
import {signInWithEmailAndPassword} from "firebase/auth";
import { useRouter } from 'next/navigation';
import Modal from 'react-modal';
import { useUserContext } from '../../layout';
import { customStyles } from '@/utils/CustomStyles';
const LoginPage = () =>{

    const {user, setUser} = useUserContext();
    useEffect(() => {
      if(user!=null){
          router.push('/main/start');
      }
    }, [])

    const { register, formState: { errors }, handleSubmit} = useForm();
    const auth = useAuth();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const showModal = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen)
        const closeModal = () => {
          setIsOpen(false);
        }
        setTimeout(closeModal, 500);
    }
    
    const signIn = async (email, password, event) =>{
        //"esteEselPassword"
        
        try {
            const response = await signInWithEmailAndPassword(auth,email,password);
            console.log(response)
            const userFirebase = auth.currentUser;
            console.log(userFirebase);
            setUser(userFirebase);
            router.push('/main/start');
        } catch(error){
            showModal(event);
        }
    }
    const onSubmit = (data, event) =>{
        const user ={
            user:data.email,
            password:data.password
        }
        signIn(user.user, user.password, event);
    }
    
    return (
        <div className='flex w-full h-screen bg-[#F2F2F2] justify-center align-middle items-center'>
            <div className='flex flex-col bg-[#EAEAEA] border-2 border-black py-6 px-6'>
                <form className='flex flex-col gap-10' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col'>
                        <label className=" text-xl text-black mb-5 font-medium">Email</label>
                        <input
                            type="text"
                            className=" text-base border-2 border-black w-72 h-9 invalid:border-red-800 px-4 py-3 text-black"
                            placeholder="ejemplo123@upb.com"
                            {...register('email', {
                                required: true
                            })}
                        />
                        {errors.email?.type === 'required' && <h1 className=" text-base text-red-700">*Debe llenar este campo</h1>}
                    </div>
                    <div className='flex flex-col'>
                        <label className=" text-xl text-black mb-5 font-medium">Password</label>
                        <input
                            type="password"
                            className=" text-base border-2 border-black w-72 h-9 invalid:border-red-800 px-4 py-3 text-black"
                            placeholder="*******"
                            {...register('password', {
                                required: true
                            })}
                        />
                        {errors.password?.type === 'required' && <h1 className=" text-base text-red-700">*Debe llenar este campo</h1>}
                    </div>
                    <button className=' flex text-xl font-medium w-76 h-9 bg-[#929292] px-5 py-6 text-white justify-center items-center align-middle' type="submit">Continuar</button>

                </form>
                <Modal isOpen={isOpen} style={customStyles}>
                    <div className="texto-normal font-normal flex w-full h-full justify-center items-center">Contraseña o email incorrectos</div>
                </Modal>
                
            </div>
        </div>
    );
}

export default LoginPage;