"use client"
import React from 'react';
import { useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser} from 'reactfire';
import { useUserContext } from '../../../layout';
import {useFirestore, useFirestoreCollectionData} from "reactfire";
import {collection, addDoc, setDoc, doc, getDocs, query, where} from "firebase/firestore";
import EventBox from './components/eventBox';
const EventosPage = () => {
    const auth = useAuth();
    const router = useRouter();
    const {user, setUser} = useUserContext();
    const firestore = useFirestore();
    const eventosCollection = collection(firestore, "eventos");
    const [eventos, setEventos] = useState([]);
    const [changed, setChanged] = useState(true)

    const loadEventos = async () =>{
      const queryEventos = query(eventosCollection, where("user_id", "==", user?.uid));
      const docsEventos = await getDocs(queryEventos);
      const aux = docsEventos.docs.map(doc => {
        const data = doc.data();
        const newEvent = {
          id: doc.id,
          nombre: data.nombre,
          fecha: data.fecha,
          userId: data.user_id,
          codigo: data.codigo
        }
        return newEvent;
      });
      console.log(aux)
      setEventos(aux);
    }

    const newEvent = () =>{
      router.push('/main/create/event');
    }

  useEffect(() => {
    //TODO: add context to save user there
    if(user === null){
        router.push('/main/login');
    }else{
        loadEventos();
    }
  }, [changed])

  const back = () =>{
    router.push('/main/start');
  }

  return (
    <div className='flex w-full h-screen bg-[#F2F2F2] justify-center align-middle items-center p-7'>
      <div className='flex flex-col h-5/6 bg-[#EAEAEA] border-2 border-black p-6 gap-10 w-5/12'>
        <div className='flex w-full text-2xl text-start text-black'>Eventos</div>
        
          <div className='flex flex-col h-4/5 gap-5 overflow-y-scroll'>
            {eventos.length === 0 ?
            <div className='flex flex-col gap-10 border-2 border-black bg-[#f6f6f6] p-5 w-full' >
            <div className=" text-xl text-black font-medium text-center">Puedes crear tu primer evento haciendo click en 'Añadir'</div>
            </div>:
            
            eventos.map((eventoLista, index) => <EventBox evento={eventoLista} key={index} changed={changed} setChanged={setChanged}></EventBox>)
            
            }
          
          </div>
        <div className='flex w-full justify-center items-center align-middle flex-row gap-2'>
          <button className=' flex text-xl font-medium w-2/5 h-9 bg-[#CDCDCD] px-5 py-7 text-stone-600 justify-center items-center align-middle' onClick={() => back()}>Atrás</button>
          <button className=' flex text-xl font-medium w-2/5 h-9 bg-[#929292] px-5 py-7 text-white justify-center items-center align-middle' onClick={()=> newEvent()}>Añadir</button>
        </div>
        
      </div>
    </div>
  )
}

export default EventosPage;