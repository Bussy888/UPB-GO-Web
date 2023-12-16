"use client"
import React from 'react';
import { useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser} from 'reactfire';
import { useForm } from "react-hook-form";
import { useActivityContext, useUserContext } from '@/app/layout';
import {useFirestore, useFirestoreCollectionData} from "reactfire";
import {collection, addDoc, setDoc, doc, getDoc, updateDoc} from "firebase/firestore";
import { dateToString, stringDate } from '@/utils/Date';
import Imagenes from '@/utils/Imagenes';
import Modelos from '@/utils/Modelos';
import { compararNombre } from '@/utils/SortOperations';
const EditActivityPage = ({params}) => {
    const auth = useAuth();
    const router = useRouter();
    const firestore = useFirestore();
    const [evento, setEvento] = useState();
    const {user, setUser} = useUserContext();
    const {activity, setActivity} = useActivityContext();
    const [imagenes, setImagenes] = useState(Imagenes.sort(compararNombre));
    const [modelos, setModelos] = useState(Modelos.sort(compararNombre));

  const { register, watch, formState: { errors }, handleSubmit} = useForm({defaultValues: {admin: false}});

  const postData = async (updateActivity) =>{
    const activityRef = doc(firestore, "eventos/"+params.id+"/actividades", params.activityId);
    const activityDoc = await updateDoc(activityRef, updateActivity)
    console.log(activityDoc)
    
    router.push('/main/view/evento/'+params.id);
}
const onSubmit = (data) =>{
    const activityUpdate ={
        codigo: data.codigo,
        descripcion: data.descripcion,
        pista: data.pista,
        nombre_carta: data.carta,
        nombre_modelo: data.modelo,
    }
    postData(activityUpdate);
}

  const back = () =>{
    router.push('/main/view/evento/'+params.id);
  }

  const loadActivity = async () =>{
    const activityRef = doc(firestore, "eventos/"+params.id, params.activityId);
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
    if(!user){
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
                        <label className=" text-xl text-black mb-5 font-medium">Descripcion:</label>
                        <input
                          id="descripcion"
                            type="text"
                            editable={true}
                            multiline={true}
                            className=" w-full min-h-fit h-fit text-base p-4 text-black bg-[#E1E1E1] flex-wrap whitespace-normal"
                            {...register('descripcion', {
                              value: activity?.descripcion,
                                required: true
                            })}
                        />
                        {errors.descripcion?.type === 'required' && <h1 className=" text-base text-red-700">*Debe llenar este campo</h1>}
                    </div>
                    <div className='flex flex-col'>
                        <label className=" text-xl text-black mb-5 font-medium">Codigo:</label>
                        <input
                          id="codigo"
                            type="text"
                            className=" w-full text-base p-4 text-black bg-[#E1E1E1]"
                            {...register('codigo', {
                              value: activity?.codigo,
                                required: true
                            })}
                        />
                        {errors.codigo?.type === 'required' && <h1 className=" text-base text-red-700">*Debe llenar este campo</h1>}
                    </div>
                    <div className='flex flex-col'>
                        <label className=" text-xl text-black mb-5 font-medium">Pista:</label>
                        <input
                          id="pista"
                            type="text"
                            className=" w-full text-base p-4 text-black bg-[#E1E1E1]"
                            {...register('pista', {
                              value: activity?.pista,
                                required: true
                            })}
                        />
                        {errors.pista?.type === 'required' && <h1 className=" text-base text-red-700">*Debe llenar este campo</h1>}
                    </div>
                    <div className='flex flex-col'>
                        <label className=" text-xl text-black mb-5 font-medium">Carta:</label>
                        <select
                            type="text"
                            className=" w-full text-base p-4 text-black bg-[#E1E1E1] gap-5"
                            placeholder="Nombre de Carta"
                            {...register('carta', {
                                required: true
                            })}
                        >
                            {imagenes.map(imagen =>
                                <option value={imagen.archivo}>{imagen.nombre}</option>)}
                        </select>
                        {errors.nombreCarta?.type === 'required' && <h1 className=" text-base text-red-700">*Debe llenar este campo</h1>}
                    </div>
                    <div className='flex flex-col'>
                        <label className=" text-xl text-black mb-5 font-medium">Modelo:</label>
                        <select
                            type="text"
                            className=" w-full text-base p-4 text-black bg-[#E1E1E1]"
                            placeholder="Nombre del Modelo"
                            {...register('modelo', {
                                required: true
                            })}
                        >
                            {modelos.map((modelo, index) =>
                                <option value={modelo.archivo} key={index} className=" py-2">{modelo.nombre}</option>)}
                        </select>

                        {errors.nombreModelo?.type === 'required' && <h1 className=" text-base text-red-700">*Debe llenar este campo</h1>}
                    </div>
                    <div className='flex flex-col'>
                        <label className=" text-xl text-black mb-5 font-medium">Mensaje de acierto:</label>
                        <input
                          id="modelo"
                            type="text"
                            className=" w-full text-base p-4 text-black bg-[#E1E1E1]"
                            {...register('acierto', {
                              value: activity?.acierto,
                                required: true
                            })}
                        />
                        {errors.acierto?.type === 'required' && <h1 className=" text-base text-red-700">*Debe llenar este campo</h1>}
                    </div>
                    <div className='flex flex-col'>
                        <label className=" text-xl text-black mb-5 font-medium">Mensaje de fallo:</label>
                        <input
                          id="modelo"
                            type="text"
                            className=" w-full text-base p-4 text-black bg-[#E1E1E1]"
                            {...register('fallo', {
                              value: activity?.fallo,
                                required: true
                            })}
                        />
                        {errors.fallo?.type === 'required' && <h1 className=" text-base text-red-700">*Debe llenar este campo</h1>}
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