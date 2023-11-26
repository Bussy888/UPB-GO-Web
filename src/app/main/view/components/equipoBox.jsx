"use client"
import React from 'react';
import { useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser} from 'reactfire';
import { useUserContext } from '@/app/layout';
import {useFirestore, useFirestoreCollectionData} from "reactfire";
import {collection, addDoc, setDoc, doc, getDoc, getDocs, where, deleteDoc, getDocFromServer, updateDoc, increment} from "firebase/firestore";

const EquipoBox = (params) =>{
    const {equipo, eventoId, startEquipoDeletion} = params;
    const router = useRouter();

    const redirigirEditar = (text) =>{
        router.push('/main/view/evento/'+eventoId+"/equipo/"+text);
    }

    return(
        <div className='flex flex-col w-3/5 justify-center align-middle items-center gap-4' >
                  <div className='flex flex-row w-full'>
                    <div className='flex text-start text-black w-3/5 text-xs font-semibold'>
                    {equipo.nombre}
                    </div>
                    <div className='flex w-1/5 text-xs justify-end text-black font-normal underline hover:text-gray-600 cursor-pointer'
                    onClick={() => startEquipoDeletion(equipo.id)}>
                    Eliminar
                    </div>
                    <div className='flex w-1/5 text-xs justify-end text-black font-normal underline hover:text-gray-600 cursor-pointer'
                    onClick={() => redirigirEditar(equipo.id)}>
                    Editar
                    </div>
                  </div>

            <div className='flex flex-col gap-4 justify-center align-middle items-center'>
                <div className='flex text-center text-black w-full text-xs font-bold'>
                    Secuencia:
                </div>
                <div className='flex text-center text-black w-full text-xs font-normal'>
                    {equipo.secuencia}
                </div>
            </div>
            {equipo.asignado ? 
                <div className='flex flex-col w-3/5 py-3 gap-4 justify-center align-middle items-center text-black text-base bg-[#cfdee3]'>
                    Asignado
                </div> :<></>
            }

        </div>
    )
}

export default EquipoBox;