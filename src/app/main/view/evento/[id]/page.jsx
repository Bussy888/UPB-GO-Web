"use client"
import React from 'react';
import { useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser} from 'reactfire';
import { useUserContext } from '@/app/layout';
import {useFirestore, useFirestoreCollectionData} from "reactfire";
import {collection, addDoc, setDoc, doc, getDocs, getDoc, query, where} from "firebase/firestore";

const ViewEventoPage = ({params}) => {
    const auth = useAuth();
    const router = useRouter();
    const {user, setUser} = useUserContext();
    const firestore = useFirestore();
    const eventosCollection = collection(firestore, "eventos");
    const [actividades, setActividades] = useState([]);
    const [evento, setEvento] = useState();
    const [changed, setChanged] = useState(true)

    const compararPosicion = (a,b) =>{
        return a.posicion - b.posicion
      }

    const loadActividades = async (eventoId) =>{
        const actividadesCollection = collection(firestore, "eventos/"+eventoId+"/actividades");
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

    const loadEvento = async () =>{
        const eventoRef = doc(firestore, "eventos", params.id);
        const eventoDoc = await getDoc(eventoRef);
        const eventoData = eventoDoc.data();
        const newEvent = {
          id: eventoDoc.id,
          nombre: eventoData.nombre,
          fecha: eventoData.fecha,
          user_id: eventoData.user_id,
          codigo: eventoData.codigo
        }
        console.log(newEvent)
        setEvento(newEvent);
        await loadActividades(newEvent.id);
    }

useEffect(() => {
    //TODO: add context to save user there
    if(!user){
        router.push('/main/login');
    }else{
        loadEvento();
    }
  }, [changed])

  const back = () =>{
    router.push('/main/start/eventos');
  }

  return (
    <div className='flex w-full min-h-screen bg-[#F2F2F2] justify-center align-middle items-center p-7'>
      <div className='flex flex-col bg-[#EAEAEA] border-2 border-black p-6 gap-5 w-5/12'>
            <div className='flex flex-row w-3/5 gap-1 align-bottom items-end'>
                <div className='flex text-3xl text-start text-black'>{evento?.nombre}</div>
                <div className='flex text-xs text-start text-black mb-1'>({evento?.fecha})</div>
            </div>

            <div className='flex text-xl text-start text-black'>Progreso</div>

            <div className='flex text-xl text-start text-black'>Actividades</div>
        
          <div className='flex flex-col h-1/3 gap-5'>
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
          <button className=' flex text-xl font-medium w-4/5 h-9 bg-[#929292] px-5 py-7 text-white justify-center items-center align-middle' onClick={()=> back()}>Atrás</button>
        </div>
        
      </div>
    </div>
  )
}

export default ViewEventoPage;