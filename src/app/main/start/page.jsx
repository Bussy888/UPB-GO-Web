"use client"
import React from 'react';
import { useAuth} from 'reactfire';
import {signOut} from "firebase/auth";
import { useRouter } from 'next/navigation';
const StartPage = () =>{
    //TODO: AÑADIR SALIDAS A DISTINTAS PAGINAS
    //TODO: TENER LA BASE PARA TODAS LAS DISTINTAS PAGINAS
    const auth = useAuth();
    const router = useRouter();
    const signOutFunc = async () =>{
        const response = await signOut();
        console.log(response)
        const user = auth.currentUser;
        console.log(user);
    }
    const salir = () =>{
        signOutFunc();
    }
    
    return (
        <div className='flex w-full h-screen bg-[#F2F2F2] justify-center align-middle items-center'>
            <div className='flex flex-col bg-[#EAEAEA] border-2 border-black py-6 px-6 gap-10'>
                <button className=' flex text-xl font-medium w-76 h-9 bg-[#929292] px-5 py-6 text-white justify-center items-center align-middle' type="submit">Eventos</button>
                <button className=' flex text-xl font-medium w-76 h-9 bg-[#929292] px-5 py-6 text-white justify-center items-center align-middle' type="submit">Usuarios</button>
                <button className=' flex text-xl font-medium w-76 h-9 bg-[#929292] px-5 py-6 text-white justify-center items-center align-middle' type="submit">Cambiar Contraseña</button>
                <button className=' flex text-xl font-medium w-76 h-9 bg-[#CB2F2F] px-5 py-6 text-white justify-center items-center align-middle' type="submit" onClick={salir()}>Salir</button>
            </div>
        </div>
    );
}

export default StartPage;