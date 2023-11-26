"use client"
import React from 'react';
import { useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser} from 'reactfire';
import { useUserContext } from '@/app/layout';
import {useFirestore, useFirestoreCollectionData} from "reactfire";
import {collection, addDoc, setDoc, doc, getDoc, getDocs, where, deleteDoc, getDocFromServer, updateDoc, increment} from "firebase/firestore";

const FilaProgresoBox = (params) =>{
    const {actividad, equipos, eventoId} = params;
    const firestore = useFirestore();
    const [registros, setRegistros] = useState([]);

    const loadRegistros = async () =>{
        const registrosCollection = collection(firestore, "eventos/"+params.eventoId+"/actividades/"+actividad.id+"/registros");
        const docsRegistros = await getDocs(registrosCollection);
        const aux = docsRegistros.docs.map(doc => {
          const data = doc.data();
          const newRegistro = {
            id: doc.id,
            horaRegistro: data.hora_registro
          }
          return newRegistro;
        });
        console.log(aux)
        setRegistros(aux);
    }

    useEffect(() => {
        loadRegistros();
    }, [])

    return(
        <div className='flex flex-row w-full justify-center align-middle items-center border-2'>
            <div className='flex w-full justify-center text-xs font-semibold text-black align-middle items-center bg-[#cfdee3] py-4 border-r-2'>
            Actividad #{actividad.posicion}
            </div>
            {equipos.length ===0 ?
            <></> :

            equipos.map((equipo, index) =>
                <div className='flex w-full justify-center align-middle items-center' key={index}>
                    {registros.length === 0 ? <></>
                    :
                        registros.filter(registro => registro.id === equipo.id).map((registro, index) =>
                            <div className='flex w-full justify-center align-middle items-center text-black text-xs text-center bg-[#cfdee3] py-4 border-r-2' key={index}>
                                {registro.horaRegistro}
                            </div>
                        )
                    }
                </div> 
            )
               
        }
        </div>
    )
}

export default FilaProgresoBox;