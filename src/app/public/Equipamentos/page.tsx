"use client"
import React, {useState, useEffect} from 'react'
import moment from 'moment'
import { useRouter } from 'next/navigation';

import api from "@/components/Services/api"

type equipamentosProps = {
    "equId": number;
    "equDescricao": string; 
}

export default function Equipamentos(){
    const [equipamentos, setEquipamentos] = useState<Array<equipamentosProps>>([]);
    let status = "";

    useEffect(() => {   
        api.get(`/equipamentos`).then(res => {
            setEquipamentos(res.data)           
        }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });    

    }, [])

    const router = useRouter();

    function handleSubmit(item: any) {
        const equId = item.equId;         
        router.push(`/AltEquipamento/${equId}`)          
    }

    function handleNewEquipamento() {         
        router.push(`/NewEquipamento`)          
    }

    return(
        <div className='flex flex-col bg-slate-300 w-full h-full p-2 '>
            <div className="flex flex-col w-full h-14 bg-blue-900 mb-4">
                <div className='flex flex-col items-center justify-center px-2'>
                    <button className="flex items-center justify-center bg-sky-700 hover:bg-sky-600 w-full h-10 p-2 mt-2 cursor-pointer" onClick={handleNewEquipamento} >
                        <span className="text-white text-xs font-bold ">Novo Equipamento</span>
                    </button>
                </div>
            </div>
            {equipamentos?.map((item:any, idx) => {
                return <button key={idx} >
                    <div className="flex flex-col w-full h-48 bg-blue-900 mb-4">
                        <div className='flex flex-col items-start justify-center px-2'>
                            <span className="text-xs text-slate-400 font-bold ">Descrição:</span>
                            <span className="text-sm text-white font-bold mb-2 ">{item.equDescricao}</span>
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
