"use client"
import React from 'react';
import { useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser} from 'reactfire';
import { useUserContext } from '../../../../layout';
import {useFirestore, useFirestoreCollectionData} from "reactfire";
import {collection, addDoc, setDoc, doc, getDoc, getDocs, where, deleteDoc} from "firebase/firestore";
const EventBox = (evento) => {
  const auth = useAuth();
  const router = useRouter();
  const {user, setUser} = useUserContext();
  const firestore = useFirestore();
  const actividadesCollection = collection(firestore, "eventos/"+evento.evento.id+"/actividades");
  const [actividades, setActividades] = useState([]);
  const compararPosicion = (a,b) =>{
    return a.posicion - b.posicion
  }

  const deleteActividades = async() =>{
    actividades.map(
      async (actividad) =>
      {
        const response = await deleteDoc(doc(firestore, "eventos/"+evento.evento.id+"/actividades", actividad.id));
        console.log(response);
      }
    )
  }

  const deleteEvento = async () =>{
    const response = await deleteDoc(doc(firestore, "eventos", evento.evento.id));
    console.log(response);
  }

  const startDeletion = () =>{
    deleteActividades();
    deleteEvento();
    evento.setChanged(!evento.changed)
  }

  const loadActividades = async () =>{
    const docsActividades = await getDocs(actividadesCollection);
    const aux = docsActividades.docs.map(doc => {
      const data = doc.data();
      const newActivity = {
        id: doc.id,
        codigo: data.codigo,
        descripcion: data.descripcion,
        pista: data.pista,
        posicion: data.posicion
      }
      return newActivity;
    });
    console.log(aux)
    const sortedAux = aux.sort(compararPosicion);
    setActividades(sortedAux);
  }

useEffect(() => {
  //TODO: add context to save user there
  if(!auth.currentUser){
      router.push('/main/login');
  }else{
      loadActividades();
  }
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
        
        <div className='flex flex-wrap flex-col gap-5 w-full text-black text-left whitespace-normal font-normal text-base' >
          {actividades.length === 0 ?
            <></>
            :
            
            actividades.map((actividadLista, index) => 
            <div className='flex w-full text-black' key={index}>
              # {actividadLista.posicion} {actividadLista.descripcion}
            </div>)
            
            }
        </div>
        <div className='flex w-full justify-center items-center align-middle flex-row gap-2'>
          <button className=' flex text-base font-normal bg-[#CB2F2F] py-4 px-6 text-white justify-center items-center align-middle' onClick={() => startDeletion()}>Eliminar</button>
        </div>
      </div>
      </div>
    </>
  )
}

export default EventBox;