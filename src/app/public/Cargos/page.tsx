"use client"
import React, {useState, useEffect} from 'react'
import moment from 'moment'
import { useRouter } from 'next/navigation';

import api from "@/components/Services/api"

type cargosProps = {
    "crgId": number;
    "crgDescricao": string; 
}

export default function Cargos(){
    const [cargos, setCargos] = useState<Array<cargosProps>>([]);
    let status = "";

    useEffect(() => {   
        api.get(`/cargos`).then(res => {
            setCargos(res.data)           
        }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });    

    }, [])

    const router = useRouter();

    function handleSubmit(item: any) {
        const crgId = item.crgId;         
        router.push(`/AltCargo/${crgId}`)          
    }

    function handleNewCargo() {         
        router.push(`/NewCargo`)          
    }

    return(
        <div className='flex flex-col bg-slate-300 w-full h-full p-2 '>
            <div className="flex flex-col w-full h-14 bg-blue-900 mb-4">
                <div className='flex flex-col items-center justify-center px-2'>
                    <button className="flex items-center justify-center bg-sky-700 hover:bg-sky-600 w-full h-10 p-2 mt-2 cursor-pointer" onClick={handleNewCargo} >
                        <span className="text-white text-xs font-bold ">Novo Cargo</span>
                    </button>
                </div>
            </div>
            {cargos?.map((item:any, idx) => {
                return <button key={idx} >
                    <div className="flex flex-col w-full h-48 bg-blue-900 mb-4">
                        <div className='flex flex-col items-start justify-center px-2'>
                            <span className="text-xs text-slate-400 font-bold ">Descrição:</span>
                            <span className="text-sm text-white font-bold mb-2 ">{item.crgDescricao}</span>
                        </div>                        
                        <button className="flex items-center justify-center bg-sky-700 hover:bg-sky-600 w-full h-10 p-2 mt-2 cursor-pointer" onClick={() => handleSubmit(item)}>
                            <span className="text-white text-xs font-bold ">Editar</span>
                        </button>
                    </div>
                </button> 
            })} 
        </div>
    )
}
