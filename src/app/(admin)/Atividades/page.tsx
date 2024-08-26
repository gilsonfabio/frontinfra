"use client"
import React, {useState, useEffect} from 'react'
import moment from 'moment'
import { useRouter } from 'next/navigation';

import api from "@/components/Services/api"

type atividadesProps = {
    "atvId": number;
    "atvDescricao": string; 
}

export default function Atividades(){
    const [atividades, setAtividades] = useState<Array<atividadesProps>>([]);
    let status = "";

    useEffect(() => {   
        api.get(`/atividades`).then(res => {
            setAtividades(res.data)           
        }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });    

    }, [])

    const router = useRouter();

    function handleSubmit(item: any) {
        const atvId = item.atvId;         
        router.push(`/AltAtividade/${atvId}`)          
    }

    function handleNewAtividade() {         
        router.push(`/NewAtividade`)          
    }

    return(
        <div className='flex flex-col bg-slate-900 w-full h-screen p-2 '>
            <div className="flex flex-col w-full h-8 mb-4">
                <div className='flex flex-row items-center justify-between px-2'>
                    <div className=''>
                        <span className="text-white text-xs font-bold ">Atividades</span>
                    </div>
                    <button className="flex items-center justify-center bg-sky-700 hover:bg-sky-600 w-[30%] h-6 p-2 mt-2 cursor-pointer rounded-2xl" onClick={handleNewAtividade} >
                        <span className="text-white text-xs font-semibold ">Nova Atividade</span>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-5 gap-0 md:grid-cols-5 md:gap-2 w-full h-auto">
                <div className='col-span-1'>,
                    <span className="text-sm text-slate-400 font-bold w-full ml-10">ID</span>     
                </div>
                <div className='col-span-3 '>
                    <span className="text-sm text-slate-400 font-bold ml-32">Descrição</span>   
                </div>
                <div className='col-span-1 '>
                    <span className="text-sm text-slate-400 font-bold ml-8">Ação</span>
                </div>                           
            </div>
            {atividades?.map((item:any, idx) => {
                return <button key={idx} >                    
                    <div className="grid grid-cols-5 gap-0 md:grid-cols-5 md:gap-2 w-full h-full">
                        <div className='col-span-1 bg-slate-800'>
                            <span className="text-sm text-white font-bold mb-2 ">{item.atvId}</span>
                        </div>
                        <div className='col-span-3 bg-slate-800'>
                            <span className="text-sm text-white font-bold mb-2 ">{item.atvDescricao}</span>
                        </div>
                        <div className='col-span-1 bg-slate-800'>    
                            <button className="flex flex-col items-center justify-center w-full cursor-pointer mt-1" onClick={() => handleSubmit(item)}>
                                <span className="text-white hover:text-yellow-500 text-sm font-bold mb-2 ">Editar</span>
                            </button>                            
                        </div>
                    </div>    
                </button> 
            })} 
        </div>
    )
}
