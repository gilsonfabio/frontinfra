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

type etapasProps = {
    "obrEtaIdObra": number;
    "obrEtaId": number; 
    "obrEtaNome": string; 
    "obrEtaDescricao": string; 
    "obrEtaInicio": string; 
    "obrEtaPrevisao": string; 
    "obrEtaTermino": string; 
    "obrEtaIdResp": number; 
    "obrEtaEntrega": string; 
    "obrEtaDatFisc": string; 
    "obrEtaIdFisc": number; 
    "obrEtaStatus": string;
}

export default function MosEtapas({params}: any){
    const [etapas, setEtapas] = useState<Array<etapasProps>>([]);
    let status = "";

    useEffect(() => {   
        let idObr = params.obrId;    
        api.get(`/etapas/${idObr}`).then(res => {
            setEtapas(res.data)           
        }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });    

    }, [])

    const router = useRouter();

    function handleSubmit(item: any) {
        const obrId = item.obrEtaId;         
        //router.push(`/ObrDetEtapa/${obrId}`)          
    }

    return(
        <div className='flex flex-col bg-slate-300 w-full h-full p-2 '>
            {etapas?.map((item:any, idx) => {
                return <button key={idx} >
                    <div className="flex flex-col w-full h-48 bg-blue-900 mb-4">
                        <div className='flex flex-col items-start justify-center px-2'>
                            <span className="text-xs text-slate-400 font-bold ">Obra:</span>
                            <span className="text-sm text-white font-bold mb-2 ">{item.obrEtaNome}</span>
                        </div>                        
                        <div className='flex flex-col items-start justify-center px-2'>
                            <span className="text-xs text-slate-400 font-bold ">Status:</span>
                            <span className="text-sm text-white font-bold mb-2 ">{item.obrEtaStatus}</span>
                        </div>         
                        <button className="flex items-center justify-center bg-sky-700 hover:bg-sky-600 w-full h-10 p-2 mt-2 cursor-pointer" onClick={() => handleSubmit(item)}>
                            <span className="text-white text-xs font-bold ">Ver detalhes Etapa</span>
                        </button>
                    </div>
                </button> 
            })} 
        </div>
    )
}
