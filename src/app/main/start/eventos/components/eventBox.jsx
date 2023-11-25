"use client"
import React from 'react';
import { useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser} from 'reactfire';
import { useUserContext } from '../../../../layout';
import {useFirestore, useFirestoreCollectionData} from "reactfire";
import {collection, addDoc, setDoc, doc, getDoc, getDocs, where, deleteDoc, getDocFromServer, updateDoc, increment} from "firebase/firestore";
const EventBox = (evento) => {
  const auth = useAuth();
  const router = useRouter();
  const {user, setUser} = useUserContext();
  const firestore = useFirestore();
  const eventosCollection = collection(firestore, "eventos");
  const actividadesCollection = collection(firestore, "eventos/"+evento.evento.id+"/actividades");
  const [actividades, setActividades] = useState([]);

  const compararPosicion = (a,b) =>{
    return a.posicion - b.posicion
  }

  const postData = async() =>{
    const userRef = doc(firestore, "users", user?.uid)
    const updateResponse = await updateDoc(userRef, {
      eventos: increment(1)
    })
    console.log(updateResponse);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data()
    const idEventoCopia=user?.uid+"Evento"+userData.eventos;
    const responseSet = await setDoc(doc(firestore, "eventos",idEventoCopia),{
      fecha: evento.evento.fecha,
      nombre: (evento.evento.nombre+" copia"),
      userId: user?.uid,
      //TODO: CREADOR DE SHORT CRYPTS
      codigo: "algo"
    });
    console.log(responseSet)
    actividades.map(
      async (actividad) =>
      {
        const response = await setDoc(doc(firestore, "eventos/"+idEventoCopia+"/actividades", user?.uid+"actividad"+actividad.posicion),{
          codigo: actividad.codigo,
          descripcion: actividad.descripcion,
          pista: actividad.pista,
          posicion: actividad.posicion,
          nombreCarta: actividad.nombre_carta,
          nombreModelo: actividad.nombre_modelo,
          eventoId: idEventoCopia
        });
      }
    )
  }

  const copiarEvento = async()=>{
    postData();
  }

  const deleteActividades = async() =>{
    actividades.map(
      async (actividad) =>
      {
        const response = await deleteDoc(doc(firestore, "eventos/"+evento.evento.id+"/actividades", actividad.id));
      }
    )
  }

  const deleteEvento = async () =>{
    const response = await deleteDoc(doc(firestore, "eventos", evento.evento.id));
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
        posicion: data.posicion,
        nombreCarta: data.nombre_carta,
        nombreModelo: data.nombre_modelo,
        eventoId: data.evento_id
      }
      return newActivity;
    });
    console.log(aux)
    const sortedAux = aux.sort(compararPosicion);
    setActividades(sortedAux);
  }

  const redirigir = (texto) =>{
    if(user!=null){
        router.push('/main/view/evento/'+texto);
    } else{
        router.push('/main/login');
    }
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
                <div className='flex text-base text-center text-black underline hover:text-gray-600 cursor-pointer' onClick={() => copiarEvento()}>Copiar</div>
                <div className='flex text-base text-center text-black underline hover:text-gray-600 cursor-pointer' onClick={() => redirigir(evento.evento.id)}>Ver</div>
            </div>
        </div>
        
        <div className='flex flex-wrap flex-col gap-5 w-full text-black text-left whitespace-normal font-normal text-base' >
          {actividades.length === 0 ?
            <></>
            :
            
            actividades.map((actividadLista, index) => 
            <div className='flex w-full text-black' index={index}>
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