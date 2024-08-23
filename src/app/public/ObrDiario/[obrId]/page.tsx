"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import moment from 'moment';
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

type diariosProps = {
    "diaId": number; 
    "diaObrId": number;
    "diaData": string;
    "diaHora": string;
    "diaIniHorTrab": string; 
    "diaFinHorTrab": string; 
    "diaIniHorInter": string;
    "diaFinHorInter": string; 
    "diaCndTmpManha": string; 
    "diaCndTmpTarde": string; 
    "diaObservacoes": string;
    "diaComentarios": string; 
    "diaIdResDiario": number;
    "diaIdFisDiario": number;
    "diaStatus": string;
}

export default function ObrDiario({params}: any){
    const router = useRouter();
    const [diarios, setDiarios] = useState<Array<diariosProps>>([]);
    let status = "";

    useEffect(() => {   
        let idObr = params.obrId;    
        
        api.get(`/diarios/${idObr}`).then(resp => {
            setDiarios(resp.data)           
        }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });

    }, [])

    function handleSubmit(row: any) {
        const diaId = row.diaId;         
        router.push(`/DetDiario/${diaId}`)          
    }

    return(
        <div className="flex flex-col w-full h-screen items-center bg-slate-900">
            <div className="flex flex-row w-full h-20 bg-slate-600 items-center justify-between p-2 md:p-20">
                <span className='text-3xl text-yellow-400 font-bold'>{params.obrId}</span>                
            </div>            
            <div className='flex flex-row w-full h-10 items-center justify-between'>
                <div className='text-sky-500 text-xs font-bold mt-3 mb-3'>
                    Diarios:
                </div>
                <Link className="flex items-center justify-center bg-sky-700 hover:bg-sky-600 rounded-lg w-30 h-8 p-2 cursor-pointer" href={`/NewDiario/${params.obrId}`}>
                    <span className="text-yellow-400 text-xs font-bold ">Novo Diario</span>
                </Link>
            </div>
            <div className='flex flex-col w-full h-full p-1'>
                {diarios?.map((row:any, idx) => {
                    return <button key={idx} >
                        <div className="flex flex-col w-full h-auto bg-slate-800 mb-0">
                            <div className='flex w-full flex-row items-start justify-between px-2'>
                                <span className="text-xs text-white font-bold w-[10%] mt-1">{row.diaId}</span>
                                <span className="text-xs text-white font-bold w-[50%] mt-1">{row.diaData}</span>
                                <span className="text-xs text-white font-bold w-[20%] mt-1">{row.diaHora}</span>
                                <button className="flex items-center justify-center w-[15%] mt-1 mb-1 cursor-pointer rounded-xl" onClick={() => handleSubmit(row)}>
                                    <span className="text-yellow-600 hover:text-yellow-400 text-[8px] font-bold ">detalhes</span>
                                </button>
                            </div>                        
                        </div>
                    </button> 
                })} 
            </div>
        </div>    
    );
}