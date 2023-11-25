"use client"
import React from 'react';
import { useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser} from 'reactfire';
import { useUserContext } from '../../../../layout';
import {useFirestore, useFirestoreCollectionData} from "reactfire";
import {collection, addDoc, setDoc, doc, getDoc, getDocs, where, deleteDoc, getDocFromServer, updateDoc, increment} from "firebase/firestore";

const FilaProgresoBox = (params) =>{
    const {actividad, equipos} = params;
    const firestore = useFirestore();
    const [registros, setRegistros] = useState([]);

    const loadRegistros = async () =>{
        const registrosCollection = collection(firestore, "eventos/"+eventoId+"/actividades/"+actividad.id+"/registros");
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
        setRegistros(sortedAux);
    }

    useEffect(() => {
        loadRegistros();
    }, [])

    return(
        <div className='flex flex-row w-full justify-center align-middle items-center'>
            {equipos.length ===0 ?
            <></> :

            equipos.map((equipo, index) =>
                <div className='flex w-full justify-center align-middle items-center' key={index}>
                    {registros.length === 0 ? <></>
                    :
                        registros.filter(registro => registro.id === equipo.id).map((registro, index) =>
                            <div className='flex w-full text-black text-xs text-center' key={index}>
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