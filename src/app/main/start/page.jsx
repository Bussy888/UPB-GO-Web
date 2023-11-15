"use client"
import React from 'react';
import { useAuth} from 'reactfire';
import { useEffect} from 'react';
import {signOut} from "firebase/auth";
import { useRouter } from 'next/navigation';
import { useUserContext } from '../../layout';
const StartPage = () =>{
    const {user, setUser} = useUserContext();
    useEffect(() => {
        console.log(user);
        if(user==null){
          router.push('/main/login');
        }
    }, [])
    const auth = useAuth();
    const router = useRouter();
    const signOutFunc = async () =>{
        const response = await signOut(auth);
        console.log(response)
        const userFirebase = auth.currentUser;
        console.log(userFirebase);
        setUser(null);
        router.push('/main/login');
    }
    const salir = () =>{
        signOutFunc();
    }
    const redirigir = (texto) =>{
        if(user!=null){
            router.push('/main/start/'+texto);
        } else{
            router.push('/main/login');
        }
    }
    
    return (
        <div className='flex w-full h-screen bg-[#F2F2F2] justify-center align-middle items-center'>
            <div className='flex flex-col bg-[#EAEAEA] border-2 border-black py-6 px-6 gap-10'>
                <button className=' flex text-xl font-medium w-76 h-9 bg-[#929292] px-5 py-6 text-white justify-center items-center align-middle' type="submit" onClick={() => redirigir('eventos')}>Eventos</button>
                <button className=' flex text-xl font-medium w-76 h-9 bg-[#929292] px-5 py-6 text-white justify-center items-center align-middle' type="submit" onClick={() => redirigir('usuarios')}>Crear Usuario</button>
                <button className=' flex text-xl font-medium w-76 h-9 bg-[#929292] px-5 py-6 text-white justify-center items-center align-middle' type="submit" onClick={()=>redirigir('cambiarPassword')}>Cambiar Contraseña</button>
                <button className=' flex text-xl font-medium w-76 h-9 bg-[#CB2F2F] px-5 py-6 text-white justify-center items-center align-middle' type="submit" onClick={() =>salir()}>Salir</button>
            </div>
        </div>
    );
}

export default StartPage;