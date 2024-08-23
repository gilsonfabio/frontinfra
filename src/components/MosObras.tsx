"use client"
import React, {useState, useEffect} from 'react'
import moment from 'moment'
import { useRouter } from 'next/navigation';

import api from "@/components/Services/api"

type obrasProps = {
    "obrId": number;
    "obrNome": string; 
    "obrDescricao": string; 
    "obrLogradouro": string; 
    "obrNumero": string; 
    "obrComplemento": string; 
    "obrBairro": string; 
    "obrCidade": string; 
    "obrUf": string; 
    "obrCep": string; 
    "obrSecretaria": number; 
    "obrContrato": string;
    "obrUrlContrato": string; 
    "obrInicio": string; 
    "obrPreTermino": string;
    "obrEntrega": string; 
    "obrStatus": string; 
    "obrVlrContrato": number; 
    "obrVlrAditivo": number; 
    "obrVlrTotal": number; 
    "obrVlrPago": number; 
    "obrMotCancela": string; 
    "obrResCancela": string; 
    "obrDatReinicio": string;
    "obrTotEtapas": number;
}

export default function MosObras(){
    const [obras, setObras] = useState<Array<obrasProps>>([]);
    let status = "";

    useEffect(() => {   
            
        api.get("/obras").then(res => {
            setObras(res.data)           
        }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });    

    }, [])

    const router = useRouter();

    function handleSubmit(item: any) {
        const obrId = item.obrId;         
        router.push(`/ObrDetalhes/${obrId}`)          
    }

    return(
        <div className="grid grid-cols-2 gap-1 md:grid-cols-5 md:gap-2 w-full h-full">
            {obras?.map((item:any, idx) => {
                return <div key={idx} >
                    <div className="flex flex-col items-center justify-center w-full h-full bg-slate-700 border-2 border-yellow-500 rounded-2xl ">
                        <div className='flex flex-col h-20 items-start justify-center px-2'>
                            <span className="text-xs text-slate-400 font-bold ">Obra:</span>
                            <span className="text-sm text-white font-bold mb-2 ">{item.obrNome}</span>
                        </div>                        
                        <div className='flex flex-row justify-between w-full mb-2'>
                            <div className='flex flex-col items-start justify-center px-2'>
                                <span className="text-xs text-slate-400 font-bold ">Dt.Início:</span>
                                <span className="text-xs text-white font-bold ">{moment(item.obrInicio).utc().locale('pt-br').format('L')}</span>
                            </div>
                            <div className='flex flex-col items-end justify-center px-2'>
                                <span className="text-xs text-slate-400 font-bold ">Prev. Término:</span>
                                <span className="text-xs text-white font-bold ">{moment(item.obrPreTermino).utc().locale('pt-br').format('L')}</span>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between w-full mb-2'>
                            <div className='flex flex-col items-start justify-center px-2'>
                                <span className="text-xs text-slate-400 font-bold ">Custo Estimado:</span>
                                <span className="text-xs text-white font-bold ">{Intl.NumberFormat('en-US', {style: 'currency', currency: 'BRL'}).format(item.obrVlrContrato)}</span>
                            </div>
                            <div className='flex flex-col items-end justify-center px-2'>
                                <span className="text-xs text-slate-400 font-bold ">Custo Realizado:</span>
                                <span className="text-xs text-white font-bold ">{Intl.NumberFormat('en-US', {style: 'currency', currency: 'BRL'}).format(item.obrVlrPago)}</span>
                            </div>
                        </div>
                        <div className='flex flex-row items-start px-2'>
                            <span className="text-xs text-slate-400 font-bold mr-3">Status:</span>
                            <span className="text-xs text-white font-bold mb-2 ">{item.obrStatus === 'I' ? status = 'EM EXECUÇÃO' : item.obrStatus === 'A' ? status = 'PREVISTA' : 
                                item.obrStatus === 'C' ? status = 'CANCELADA': status = 'FINALIZADA'}
                            </span>
                        </div>
                        <button className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 w-[90%] h-10 p-2 mt-2 mb-1 cursor-pointer rounded-xl" onClick={() => handleSubmit(item)}>
                            <span className="text-black text-xs font-bold ">Ver detalhes da obra</span>
                        </button>
                    </div>                    
                </div> 
            })} 
        </div>
    )
}
