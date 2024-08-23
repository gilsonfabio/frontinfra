"use client"
import React, {useState, useEffect} from 'react'
import moment from 'moment'

import api from "@/components/Services/api"
import Link from 'next/link'

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

export default function MosDetObra({params}: any){
    const [obras, setObras] = useState<Array<obrasProps>>([]);
    const [etapas, setEtapas] = useState<Array<etapasProps>>([]);
    let status = "";

    useEffect(() => {   
        const idObr = params.obrId;    

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

    return(
        <div className='flex flex-col bg-slate-300 w-full h-full p-2 '>
            {obras?.map((item:any, idx) => {
                return <button key={idx} >
                    <div className="flex flex-col w-full h-full bg-blue-900 mb-4">
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
                <div className='text-yellow-400 text-xs font-bold mt-3 mb-3'>
                    Etapas:
                </div>
                <Link className="flex items-center justify-center bg-sky-700 hover:bg-sky-600 w-full h-10 p-2 mt-2 cursor-pointer" href={`/NewEtapa/${params.obrId}` }>
                    <span className="text-yellow-400 text-xs font-bold ">Nova Etapa</span>
                </Link>
            </div>
            {etapas?.map((row:any, idx) => {
                return <button key={idx} >
                    <div className="flex flex-col w-full h-full bg-blue-900 mb-4">
                        <div className='flex flex-row items-start px-2'>
                            <span className="text-xs text-white font-bold mb-2 ">{row.obrEtaNome}</span>
                        </div>                        
                    </div>
                </button> 
            })} 
        </div>
    )
}