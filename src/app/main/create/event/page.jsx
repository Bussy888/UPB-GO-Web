"use client"
import React from 'react';
import { useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser} from 'reactfire';
import {useFirestore, useFirestoreCollectionData} from "reactfire";
import {collection, addDoc, setDoc, doc, getDoc} from "firebase/firestore";
import { useUserContext } from '@/app/layout';
import ActividadPrueba from '@/utils/ActividadPrueba';
import { dateToString, stringDate } from '@/utils/Date';
import ShortUniqueId from 'short-unique-id';
const EventosPage = () => {
    const auth = useAuth();
    const router = useRouter();
    const {user, setUser} = useUserContext();
    const firestore = useFirestore();
    const uid = new ShortUniqueId({length: process.env.UID_LENGTH})
    
    const postData = async (evento) =>{
      const userRef = doc(firestore, "users", user?.uid)
      const updateResponse = await updateDoc(userRef, {
        eventos: increment(1)
      })
      console.log(updateResponse);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data()
      const idEvento=user?.uid+"Evento"+userData.eventos;

      const responseSet = await setDoc(doc(firestore, "eventos", idEvento),evento);
      console.log(responseSet)

      const actividadPrueba = await setDoc(doc(firestore, "eventos/"+idEvento+"/actividades", idEvento+"Actividad"+actividad.posicion),{
        codigo: ActividadPrueba.codigo,
        descripcion: ActividadPrueba.descripcion,
        nombre_carta: ActividadPrueba.nombre_carta,
        nombre_modelo: ActividadPrueba.nombre_modelo,
        pista: ActividadPrueba.pista,
        posicion: ActividadPrueba.posicion,
        evento_id: idEvento
      });
      console.log(actividadPrueba)

      const primerEquipo = await addDoc(
        collection(firestore, "eventos/"+idEvento+"/equipos"),
        {
          secuencia: "0",
          nombre: "Rojo",
          asignado: false,
          evento_id: idEvento
        }
      )
      console.log(primerEquipo.data());
    }

    const onSubmit = (data) =>{
      const evento ={
          nombre: data.nombre,
          fecha: dateToString(data.fecha),
          user_id: user?.uid,
          codigo: uid.rnd()
      }
      postData(evento);
  }
  useEffect(() => {
    if(!auth.currentUser){
        router.push('/main/login');
    }else{
        console.log("hola");
    }
  }, [])

  const back = () =>{
    router.push('/main/start/eventos');
  }

  return (
    <div className='flex w-full min-h-screen bg-[#F2F2F2] justify-center align-middle items-center'>
      <form className='flex flex-col bg-[#EAEAEA] border-2 border-black py-6 px-6 gap-10 justify-center align-middle items-center w-5/12' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex text-black text-2xl font-normal text-start w-full'>Nuevo Evento</div>
        <div className='flex flex-col border-2 border-black p-5 gap-5 w-full bg-[#f6f6f6]'>
                    <div className='flex flex-col'>
                        <label className=" text-xl text-black mb-5 font-medium">Nombre:</label>
                        <input
                            type="text"
                            className=" w-full text-base p-4 text-black bg-[#E1E1E1]"
                            placeholder="Ingrese una pregunta o actividad"
                            {...register('nombre', {
                                required: true
                            })}
                        />
                        {errors.nombre?.type === 'required' && <h1 className=" text-base text-red-700">*Debe llenar este campo</h1>}
                    </div>
                    <div className='flex flex-col'>
                        <label className=" text-xl text-black mb-5 font-medium">Fecha:</label>
                        <input
                            type="date"
                            className=" w-full text-base p-4 text-black bg-[#E1E1E1]"
                            min={stringDate()}
                            placeholder="Donde encontrarán la actividad los participantes"
                            {...register('fecha', {
                              valueAsDate: true,
                              required: true
                            })}
                        />
                        {errors.fecha?.type === 'required' && <h1 className=" text-base text-red-700">*Debe elegir una fecha</h1>}
                    </div>
        </div>
        <div className='flex w-full justify-center items-center align-middle flex-row gap-2'>
          <div className=' flex text-xl font-medium w-1/3 h-9 bg-[#CDCDCD] px-5 py-6 text-stone-600 justify-center items-center align-middle' onClick={() => back()}>Atrás</div>
          <button className=' flex text-xl font-medium w-1/3 h-9 bg-[#929292] px-5 py-6 text-white justify-center items-center align-middle' type='submit'>Guardar</button>
        </div>
      </form>
    </div>
  )
}

export default EventosPage;