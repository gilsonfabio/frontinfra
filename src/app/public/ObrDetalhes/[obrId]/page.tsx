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

export default function ObrDetalhes({params}: any){
    const router = useRouter();
    const [obras, setObras] = useState<Array<obrasProps>>([]);
    const [etapas, setEtapas] = useState<Array<etapasProps>>([]);
    let status = "";

    useEffect(() => {   
        let idObr = params.obrId;    

        api.get(`/searchObra/${idObr}`).then(res => {
            setObras(res.data)           
        }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        }); 
        
        api.get(`/etapas/${idObr}`).then(resp => {
            setEtapas(resp.data)           
        }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });

    }, [])

    function handleSubmit(row: any) {
        const obrId = row.obrEtaIdObra;         
        const obrEtaId = row.obrEtaId;
        router.push(`/DetEtapa/${obrId}/${obrEtaId}`)          
    }

    return(
        <div className="flex flex-col w-full h-screen items-center bg-slate-900">
            <div className="flex flex-row w-full h-20 bg-slate-600 items-center justify-between p-2 md:p-20">
                <span className='text-3xl text-yellow-400 font-bold'>{params.obrId}</span>
                <Link className="flex flex-row items-center justify-center bg-sky-700 hover:bg-sky-600 rounded-lg w-30 h-8 p-2 cursor-pointer" href={`/ObrDiario/${params.obrId}`}>
                    <span className="text-yellow-400 text-xs font-bold ">Acessar Diario da Obra</span>
                </Link>
            </div>
            <div className="flex flex-col w-full h-full items-center bg-slate-900">
                <div className='flex flex-col bg-slate-900 w-full h-full p-2 '>
                    <div className='flex flex-row items-center justify-between bg-slate-900 w-full h-full px-2 '>
                        <div className='text-sky-500 text-xs font-bold mt-3 mb-3'>
                            Detalhes
                        </div>
                        <Link className="flex flex-row items-center justify-center bg-sky-700 hover:bg-sky-600 rounded-lg w-30 h-8 p-2 cursor-pointer" href={`/AltObra/${params.obrId}`}>
                            <span className="text-yellow-400 text-xs font-bold ">Editar</span>
                        </Link>
                    </div>
            {obras?.map((item:any, idx) => {
                return <button key={idx} >
                    <div className="flex flex-col w-full h-full bg-slate-800 mb-4">
                        <div className='flex flex-col items-start justify-center px-2'>
                            <span className="text-xs text-slate-400 font-bold ">Obra: {item.obrId}</span>
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
                                <span className="text-xs text-slate-400 font-bold ">Vlr. Contrato:</span>
                                <span className="text-xs text-white font-bold ">{Intl.NumberFormat('en-US', {style: 'currency', currency: 'BRL'}).format(item.obrVlrContrato)}</span>
                            </div>
                            <div className='flex flex-col items-end justify-center px-2'>
                                <span className="text-xs text-slate-400 font-bold ">Vlr. Pago:</span>
                                <span className="text-xs text-white font-bold ">{Intl.NumberFormat('en-US', {style: 'currency', currency: 'BRL'}).format(item.obrVlrPago)}</span>
                            </div>
                        </div>
                        <div className='flex flex-row items-start px-2'>
                            <span className="text-xs text-slate-400 font-bold mr-3">Status:</span>
                            <span className="text-xs text-white font-bold mb-2 ">{item.obrStatus === 'I' ? status = 'EM EXECUÇÃO' : item.obrStatus === 'A' ? status = 'PREVISTA' : 
                                    item.obrStatus === 'C' ? status = 'CANCELADA': status = 'FINALIZADA'}</span>
                        </div>
                        <div className='flex flex-col items-start justify-center px-2'>
                            <span className="text-xs text-slate-400 font-bold ">Objetivo:</span>
                            <span className="text-sm text-white font-bold mb-2 ">{item.obrDescricao}</span>
                        </div>  
                    </div>
                </button> 
            })} 
            <div className='flex flex-row w-full h-10 items-center justify-between'>
                <div className='text-sky-500 text-xs font-bold mt-3 mb-3'>
                    Etapas:
                </div>
                <Link className="flex items-center justify-center bg-sky-700 hover:bg-sky-600 rounded-lg w-30 h-8 p-2 cursor-pointer" href={`/NewEtapa/${params.obrId}`}>
                    <span className="text-yellow-400 text-xs font-bold ">Nova Etapa</span>
                </Link>
            </div>
                {etapas?.map((row:any, idx) => {
                    return <button key={idx} >
                        <div className="flex flex-col w-full h-auto bg-slate-800 mb-0">
                            <div className='flex flex-row items-start justify-between px-2'>
                                <span className="text-xs text-white font-bold w-[10%] mt-3">{row.obrEtaId}</span>
                                <span className="text-xs text-white font-bold w-[50%] mt-3">{row.obrEtaNome}</span>
                                <span className="text-xs text-white font-bold w-[25%] mt-3">{row.obrEtaStatus === 'I' ? status = 'EM EXECUÇÃO' : row.obrStatus === 'A' ? status = 'PREVISTA' : 
                                    row.obrStatus === 'C' ? status = 'CANCELADA': status = 'FINALIZADA'}</span>
                                <button className="flex items-center justify-center w-[15%] h-6 p-2 mt-2 mb-1 cursor-pointer rounded-xl" onClick={() => handleSubmit(row)}>
                                    <span className="text-yellow-600 hover:text-yellow-400 text-[8px] font-bold ">detalhes</span>
                                </button>
                            </div>                        
                        </div>
                    </button> 
                })} 
            </div>
            </div>
        </div>    
    );
}