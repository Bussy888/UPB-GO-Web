"use client"
import React from 'react';
import { useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser} from 'reactfire';
import { useForm } from "react-hook-form";
import { useUserContext } from '@/app/layout';
import {useFirestore, useFirestoreCollectionData} from "reactfire";
import {collection, addDoc, setDoc, doc, getDoc, updateDoc} from "firebase/firestore";
import { dateToString, stringDate } from '@/utils/Date';
const EditEventPage = ({params}) => {
    const auth = useAuth();
    const router = useRouter();
    const firestore = useFirestore();
    const [evento, setEvento] = useState();
    const {user, setUser} = useUserContext();

  const { register, watch, formState: { errors }, handleSubmit} = useForm({defaultValues: {admin: false}});

  const postData = async (updateEvento) =>{
    const eventoRef = doc(firestore, "eventos", params.id);
    const eventoDoc = await updateDoc(eventoRef, updateEvento)
    console.log(eventoDoc)
    
    router.push('/main/view/evento/'+params.id);
}
const onSubmit = (data) =>{
    const eventoUpdate ={
        nombre: data.nombre,
        fecha: dateToString(data.fecha)
    }
    postData(eventoUpdate);
}

  const back = () =>{
    router.push('/main/view/evento/'+params.id);
  }

  const loadEvento = async () =>{
    const eventoRef = doc(firestore, "eventos", params.id);
    const eventoDoc = await getDoc(eventoRef);
    const eventoData = eventoDoc.data();
    const newEvent = {
      id: eventoDoc.id,
      nombre: eventoData.nombre,
      fecha: eventoData.fecha,
      userId: eventoData.user_id,
      codigo: eventoData.codigo,
      cantidadActividades: eventoData.cantidad_actividades
    }
    setEvento(newEvent);
  }

  useEffect(() => {
    //TODO: add context to save user there
    if(!auth.currentUser){
        router.push('/main/login');
    }else{
        loadEvento();
    }
  }, [])

  return (
    <div className='flex w-full min-h-screen bg-[#F2F2F2] justify-center align-middle items-center'>
      <form className='flex flex-col bg-[#EAEAEA] border-2 border-black py-6 px-6 gap-10 justify-center align-middle items-center w-5/12' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex text-black text-2xl font-normal text-start w-full'>Editar Evento</div>
        <div className='flex flex-col border-2 border-black p-5 gap-5 w-full bg-[#f6f6f6]'>
                    <div className='flex flex-col'>
                        <label className=" text-xl text-black mb-5 font-medium">Nombre:</label>
                        <input
                          id="nombre"
                            type="text"
                            className=" w-full text-base p-4 text-black bg-[#E1E1E1]"
                            {...register('nombre', {
                              value: evento?.nombre,
                                required: true
                            })}
                        />
                        {errors.nombre?.type === 'required' && <h1 className=" text-base text-red-700">*Debe llenar este campo</h1>}
                    </div>
                    <div className='flex flex-col'>
                        <label className=" text-xl text-black mb-5 font-medium">Fecha:</label>
                        <input
                            type="date"
                            min={stringDate()}
                            valueAsDate={evento?.fecha}
                            className=" w-full text-base p-4 text-black bg-[#E1E1E1]"
                            {...register('fecha', {
                              valueAsDate: true,
                                required: true
                            })}
                        />
                        {errors.fecha?.type === 'required' && <h1 className=" text-base text-red-700">*Debe llenar este campo</h1>}
                    </div>
        </div>
        <div className='flex w-full justify-center items-center align-middle flex-row gap-2'>
          <div className=' flex text-xl font-medium w-1/3 h-9 bg-[#CDCDCD] px-5 py-6 text-stone-600 justify-center items-center align-middle cursor-pointer' onClick={() => back()}>Atrás</div>
          <button className=' flex text-xl font-medium w-1/3 h-9 bg-[#929292] px-5 py-6 text-white justify-center items-center align-middle' type='submit'>Guardar</button>
        </div>
      </form>
    </div>
  )
}

export default EditEventPage;