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

type etapasProps = {
    "obrEtaId": number;
    "obrEtaIdObra": number;
    "obrEtaNome": string;
    "obrEtaInicio": string;
    "obrEtaPrevisao": string; 
    "obrEtaTermino": string; 
    "obrEtaDescricao": string;
    "obrEtaIdResp": number;
    "obrEtaEntrega": string;
    "obrEtaDatFisc": string;
    "obrEtaIdFisc": string;
}

export default function DetEtapa({params}: any){
    const router = useRouter();
    const [etapas, setEtapas] = useState<Array<etapasProps>>([]);
    
    const [obrEtaId, setObrEtaId] = useState('');
    const [obrEtaIdObra, setObrEtaIdObra] = useState('');
    const [obrEtaNome, setObrEtaNome] = useState('');
    const [obrEtaInicio, setObrEtaInicio] = useState('');
    const [obrEtaPrevisao, setObrEtaPrevisao] = useState('');
    const [obrEtaTermino , setObrEtaTermino ] = useState('');
    const [obrEtaDescricao, setObrEtaDescricao] = useState('');
    const [obrEtaIdResp, setObrEtaIdResp] = useState('');
    const [obrEtaEntrega, setObrEtaEntrega] = useState('');
    const [obrEtaDatFisc, setObrEtaDatFisc] = useState('');
    const [obrEtaIdFisc, setObrEtaIdFisc] = useState('');

    let status = "";

    useEffect(() => {   
        let obrId = params.obrId;
        let idEta = params.obrEtaId;    
        api.get(`/searchEtapa/${obrId}/${idEta}`).then(resp => {
            setEtapas(resp.data)           
            setObrEtaId(resp.data[0].obrEtaId);
            setObrEtaIdObra(resp.data[0].obrEtaIdObra);
            setObrEtaNome(resp.data[0].obrEtaNome);
            setObrEtaInicio(resp.data[0].obrEtaInicio);
            setObrEtaPrevisao(resp.data[0].obrEtaPrevisao);
            setObrEtaTermino(resp.data[0].obrEtaTermino);
            setObrEtaDescricao(resp.data[0].obrEtaDescricao);
            setObrEtaIdResp(resp.data[0].obrEtaIdResp);
            setObrEtaEntrega(resp.data[0].obrEtaEntrega);
            setObrEtaDatFisc(resp.data[0].obrEtaDatFisc);
            setObrEtaIdFisc(resp.data[0].obrEtaIdFisc);
        }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });

    }, [])

    function handleSubmit(row: any) {
        const obrId = row.obrEtaIdObra;         
        const obrEtaId = row.obrEtaId;
        router.push(`/Diario/${obrId}/${obrEtaId}`)          
    }

    return(
        <div className="flex flex-col w-full h-full items-center bg-slate-900">
            <div className="flex flex-row w-full h-20 bg-slate-600 items-center justify-between p-2 md:p-20">
                <span className='text-3xl text-yellow-400 font-bold'>{params.obrId} - {params.obrEtaId}</span>
            </div>
            <div className="flex flex-col w-full h-full items-center bg-slate-900">
                <div className='flex flex-col bg-slate-900 w-full h-full p-2 '>
                    <div className='flex flex-row items-center justify-between bg-slate-900 w-full h-full p-2 '>
                        <div className='text-sky-500 text-xs font-bold mt-3 mb-3'>
                            Detalhes
                        </div>
                        <Link className="flex flex-row items-center justify-center bg-sky-700 hover:bg-sky-600 rounded-lg w-30 h-8 p-2 cursor-pointer" href={`/AltObra/${params.obrId}`}>
                            <span className="text-yellow-400 text-xs font-bold ">Editar</span>
                        </Link>
                    </div>                        
                    {etapas?.map((row:any, idx) => {
                    return <div key={idx} >
                        <div className="flex flex-col w-full h-auto bg-slate-800 mb-0">
                            <div className='flex flex-row justify-between px-2'>
                                <div className='w-[50%] mb-4'>
                                    <span className='text-slate-400 w-full '>
                                        Etapa: 
                                    </span>
                                    <span className='text-white w-full'>
                                        {obrEtaId}
                                    </span>
                                </div>
                                <div className='w-[50%] mb-4'>    
                                    <span className='text-slate-400 w-full'>
                                        Id Obra: 
                                    </span>
                                    <span className='text-white w-full'>
                                        {obrEtaIdObra}
                                    </span>
                                </div>    
                            </div>
                            <div className='flex flex-row justify-between px-2'>
                                <div className='w-full mb-4'>
                                    <span className='text-slate-400 w-full'>
                                        Nome da Etapa: 
                                    </span>
                                    <span className='text-white w-full'>
                                        {obrEtaNome}
                                    </span>
                                </div>                                    
                            </div>
                            <div className='flex flex-row justify-between px-2'>
                                <div className='w-full mb-4'>
                                    <span className='text-slate-400 w-full'>
                                        Descrição: 
                                    </span>
                                    <span className='text-white w-full'>
                                        {obrEtaDescricao}
                                    </span>
                                </div>                                    
                            </div> 
                            <div className='flex flex-row justify-between px-2'>
                                <div className='w-[50%] mb-4'>
                                    <span className='text-slate-400 w-full '>
                                        Data Inicio: 
                                    </span>
                                    <span className='text-white w-full'>
                                        {obrEtaInicio}
                                    </span>
                                </div>
                                <div className='w-[50%] mb-4'>    
                                    <span className='text-slate-400 w-full'>
                                        Data Prevista: 
                                    </span>
                                    <span className='text-white w-full'>
                                        {obrEtaPrevisao}
                                    </span>
                                </div>
                            </div>    
                            <div className='flex flex-row justify-between px-2'>
                                <div className='w-full mb-4'>
                                    <span className='text-slate-400 w-full'>
                                        Responsável: 
                                    </span>
                                    <span className='text-white w-full'>
                                        {obrEtaIdResp}
                                    </span>
                                </div>                                    
                            </div>
                            <div className='flex flex-row justify-between px-2'>
                                <div className='w-[50%] mb-4'>
                                    <span className='text-slate-400 w-full '>
                                        Data Auditoria: 
                                    </span>
                                    <span className='text-white w-full'>
                                        {obrEtaDatFisc}
                                    </span>
                                </div>
                                <div className='w-[50%] mb-4'>    
                                    <span className='text-slate-400 w-full'>
                                        Data Entrega: 
                                    </span>
                                    <span className='text-white w-full'>
                                        {obrEtaEntrega}
                                    </span>
                                </div>
                            </div>
                            <div className='flex flex-row justify-between px-2'>
                                <div className='w-full mb-4'>
                                    <span className='text-slate-400 w-full'>
                                        Fiscal Auditor: 
                                    </span>
                                    <span className='text-white w-full'>
                                        {obrEtaIdFisc}
                                    </span>
                                </div>                                    
                            </div> 
                        </div>    
                    </div> 
                    })} 
                </div>
            </div>
        </div>    
    );
}