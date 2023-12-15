"use client"
import React, { useState } from 'react';
import { useAuth} from 'reactfire';
import { useEffect} from 'react';
import {signOut} from "firebase/auth";
import { useRouter } from 'next/navigation';
import { useUserContext } from '../../layout';
import {useFirestore, useFirestoreCollectionData} from "reactfire";
import {collection, addDoc, setDoc, doc, getDoc} from "firebase/firestore";
const StartPage = () =>{
    const {user, setUser} = useUserContext();
    const [userDoc, setUserDoc] = useState();
    const firestore = useFirestore();
    const getDocJs = async()=>{
        const docRef = doc(firestore, "users", user?.uid);
        const userDocSnap = await getDoc(docRef);
        setUserDoc(userDocSnap.data())
    }
    useEffect(() => {
        console.log(user);
        if(user==null){
          router.push('/main/login');
        }
        getDocJs();
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

    //TODO: añadir opcion de enviar email de cambio de contraseña a otro email
    
    return (
        <div className='flex w-full h-screen bg-[#F2F2F2] justify-center align-middle items-center'>
            <div className='flex flex-col bg-[#EAEAEA] border-2 border-black py-6 px-6 gap-10'>
                <button className=' flex text-xl font-light w-80 h-9 bg-[#929292] px-5 py-7 text-white justify-center items-center align-middle' type="submit" onClick={() => redirigir('eventos')}>Eventos</button>
                {userDoc?.admin ? <button className=' flex text-xl font-light w-80 h-9 bg-[#929292] px-5 py-7 text-white justify-center items-center align-middle' onClick={() => redirigir('usuarios')}>Crear Usuario</button>: <></>}
                {userDoc?.admin ? <button className=' flex text-xl font-light w-80 h-9 bg-[#929292] px-5 py-7 text-white justify-center items-center align-middle' onClick={()=>redirigir('cambiarPasswordUsuario')}>Cambiar Contraseña</button>: <button className=' flex text-xl font-light w-80 h-9 bg-[#929292] px-5 py-7 text-white justify-center items-center align-middle' type="submit" onClick={()=>redirigir('cambiarPassword')}>Cambiar Contraseña</button>}
                <button className=' flex text-xl font-normal w-80 h-9 bg-[#CB2F2F] px-5 py-7 text-white justify-center items-center align-middle' type="submit" onClick={() =>salir()}>Salir</button>
            </div>
        </div>
    );
}

export default StartPage;