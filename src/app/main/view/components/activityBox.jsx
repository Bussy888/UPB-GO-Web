"use client"
import React from 'react';
import { useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser} from 'reactfire';
import { useUserContext } from '../../../../layout';
import {useFirestore, useFirestoreCollectionData} from "reactfire";
import {collection, addDoc, setDoc, doc, getDoc, getDocs, where, deleteDoc, getDocFromServer, updateDoc, increment} from "firebase/firestore";

const ActivityBox = (params) =>{
    const {actividad, eventoId, startDeletion} = params;
    const router = useRouter();

    const redirigirEditar = (text) =>{
        router.push('/main/view/evento/'+eventoId+"/actividad/"+text);
    }

    return(
        <div className='flex flex-col w-full justify-center align-middle items-center p-5 gap-5' key={index}>
                <div className='flex flex-row w-full justify-center align-middle items-center'>
                  <div className='flex w-full text-base text-black'>
                    # {actividad.posicion} {actividad.descripcion}
                  </div>
                  {
                  actividad.posicion === 0 ? <></>
                  :
                  <div className='flex w-1/5 text-xs text-right text-black underline hover:text-gray-600 cursor-pointer' onClick={() => startDeletion(actividad)}>
                    Eliminar
                  </div>
                  }
                  <div className='flex w-1/5 text-xs text-right text-black underline hover:text-gray-600 cursor-pointer' onClick={() => redirigirEditar(actividad.id)}>
                    Editar
                  </div>
                </div>
                <div className='w-full px-7 py-5 justify-left align-start items-start text-left bg-[#cfdee3]'>
                  Código: {actividad.codigo}
                </div>
                
        </div>
    )
}

export default ActivityBox;