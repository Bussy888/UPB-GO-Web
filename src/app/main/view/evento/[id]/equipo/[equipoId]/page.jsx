"use client"
import React from 'react';
import { useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser} from 'reactfire';
import { useForm } from "react-hook-form";
import { useEquipoContext, useUserContext } from '@/app/layout';
import {useFirestore, useFirestoreCollectionData} from "reactfire";
import {collection, addDoc, setDoc, doc, getDoc, updateDoc} from "firebase/firestore";
import { dateToString, stringDate } from '@/utils/Date';
const EditActivityPage = ({params}) => {
    const auth = useAuth();
    const router = useRouter();
    const firestore = useFirestore();
    const [evento, setEvento] = useState();
    const {user, setUser} = useUserContext();
    const {equipo, setEquipo} = useEquipoContext();

  const { register, watch, formState: { errors }, handleSubmit} = useForm({defaultValues: {admin: false}});

  const postData = async (updateEquipo) =>{
    const equipoRef = doc(firestore, "eventos/"+params.id+"/equipos", params.equipoId);
    const equipoDoc = await updateDoc(equipoRef, updateEquipo)
    console.log(equipoDoc)
    
    router.push('/main/view/evento/'+params.id);
}
const onSubmit = (data) =>{
    const equipoUpdate ={
        secuencia: data.secuencia,
        nombre: data.nombre,
        asignado: data.asignado
    }
    postData(equipoUpdate);
}

  const back = () =>{
    router.push('/main/view/evento/'+params.id);
  }

  const loadActivity = async () =>{
    const activityRef = doc(firestore, "eventos/"+params.id, params.equipoId);
    const activityDoc = await getDoc(eventoRef);
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
                              value: activity.nombre,
                                required: true
                            })}
                        />
                        {errors.nombre?.type === 'required' && <h1 className=" text-base text-red-700">*Debe llenar este campo</h1>}
                    </div>
                    <div className='flex flex-col'>
                        <label className=" text-xl text-black mb-5 font-medium">Secuencia:</label>
                        <input
                          id="secuencia"
                            type="text"
                            className=" w-full text-base p-4 text-black bg-[#E1E1E1]"
                            {...register('descripcion', {
                              value: equipo.secuencia,
                                required: true
                            })}
                        />
                        {errors.secuencia?.type === 'required' && <h1 className=" text-base text-red-700">*Debe llenar este campo</h1>}
                    </div>
                    <div className = 'flex flex-row w-full items-center justify-center align-middle gap-3'>
                          <input 
                                type='checkbox'
                                value={equipo.asignado}
                                {...register("asignado")}/>
                          <label className=" text-left font-medium text-black">Asignado</label>
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

export default EditActivityPage;