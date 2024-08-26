"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import moment from 'moment';
import { useRouter } from 'next/navigation';

import api from "@/components/Services/api"

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

type atvdiaProps = {
    "dtvId": number; 
    "dtvDiaId": number; 
    "dtvAtvId": number; 
    "dtvAtvStatus": string;
    "atvDescricao": string;
}

type pessoalProps = {
    "dcbId" : number;
    "dcbDiaId": number; 
    "dcbColId": number;
    "dcbColQtd": number; 
    "dcbStatus": string;
    "crgDescricao": string;
}

type equipaProps = {
    "deqId": number; 
    "deqDiaId": number; 
    "deqEquId" : number;
    "deqEquQtd": number; 
    "deqStatus": string;
    "equDescricao": string;
}

export default function DetDiario({params}: any){
    const router = useRouter();
    const [diario, setDiario] = useState<Array<diariosProps>>([]);
    
    const [diaId, setDiaId] = useState('');
    const [diaObrId, setDiaObrId] = useState('');
    const [diaData, setDiaData] = useState('');
    const [diaHora, setDiaHora] = useState('');
    const [diaIniHorTrab, setDiaIniHorTrab] = useState('');
    const [diaFinHorTrab , setDiaFinHorTrab] = useState('');
    const [diaIniHorInter, setDiaIniHorInter] = useState('');
    const [diaFinHorInter, setDiaFinHorInter] = useState('');
    const [diaCndTmpManha, setDiaCndTmpManha] = useState('');
    const [diaCndTmpTarde, setDiaCndTmpTarde] = useState('');
    const [diaObservacoes, setDiaObservacoes] = useState('');
    const [diaComentarios, setDiaComentarios] = useState('');
    const [diaIdResDiario, setDiaIdResDiario] = useState('');
    const [diaIdFisDiario, setDiaIdFisDiario] = useState('');
    const [diaStatus, setDiaStatus] = useState('');

    const [atvdiario, setAtvDiario] = useState<Array<atvdiaProps>>([]);
    const [equdiario, setEquDiario] = useState<Array<equipaProps>>([]);
    const [pesdiario, setPesDiario] = useState<Array<pessoalProps>>([]);

    let status = "";

    useEffect(() => {   
        let idDia = params.diaId;
        api.get(`/busDiario/${idDia}`).then(resp => {
            setDiaObrId(resp.data[0].diaObrId)
            setDiaData(resp.data[0].diaData)
            setDiaHora(resp.data[0].diaHora)
            setDiaIniHorTrab(resp.data[0].diaIniHorTrab)
            setDiaFinHorTrab(resp.data[0].diaFinHorTrab)
            setDiaIniHorInter(resp.data[0].diaIniHorInter)
            setDiaFinHorInter(resp.data[0].diaFinHorInter)
            setDiaCndTmpManha(resp.data[0].diaCndTmpManha)
            setDiaCndTmpTarde(resp.data[0].diaCndTmpTarde)
            setDiaObservacoes(resp.data[0].diaObservacoes)
            setDiaComentarios(resp.data[0].diaComentarios)
            setDiaIdResDiario(resp.data[0].diaIdResDiario)
            setDiaIdFisDiario(resp.data[0].diaIdFisDiario)
        }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });

        api.get(`/pesdiario/${idDia}`).then(res => {
            setPesDiario(res.data)            
        }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });

        api.get(`/atvdiario/${idDia}`).then(res => {
            setAtvDiario(res.data)            
        }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });

        api.get(`/equdiario/${idDia}`).then(res => {
            setEquDiario(res.data)            
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
                <span className='text-3xl text-yellow-400 font-bold'>{params.diaId}</span>
            </div>
            <div className="flex flex-col w-full h-full items-center bg-slate-900">
                <div className='flex flex-col bg-slate-900 w-full h-full p-2 '>
                    <div className='flex flex-row items-center justify-center bg-slate-900 w-full h-full p-2 '>
                        <div className='text-sky-500 text-xs font-bold mt-3 mb-3'>
                            Detalhes
                        </div>
                    </div>
                    <div className='flex flex-row items-center justify-center bg-slate-900 w-full h-full px-1 '>
                        <div className="grid grid-cols-4 gap-1 md:grid-cols-4 md:gap-2 w-full h-full">
                            <div className='col-span-1'>
                                <Link className="flex flex-row items-center justify-center bg-sky-700 hover:bg-sky-600 rounded-md w-30 h-8 p-2 cursor-pointer" href={`/AltObra/${params.obrId}`}>
                                    <span className="text-yellow-400 text-[10px] font-semibold ">Editar Diario</span>
                                </Link> 
                            </div>
                            <div className='col-span-1 '>
                                <Link className="flex flex-row items-center justify-center bg-sky-700 hover:bg-sky-600 rounded-md w-30 h-8 p-2 cursor-pointer" href={`/MãoObra/${params.diaId}`}>
                                    <span className="text-yellow-400 text-[10px] font-semibold ">Atividades da Obra</span>
                                </Link> 
                            </div>
                            <div className='col-span-1 '>
                                <Link className="flex flex-row items-center justify-center bg-sky-700 hover:bg-sky-600 rounded-md w-30 h-8 p-2 cursor-pointer" href={`/MãoObra/${params.diaId}`}>
                                    <span className="text-yellow-400 text-[10px] font-semibold ">Pessoal Mão de Obra</span>
                                </Link>
                            </div>
                            <div className='col-span-1 '>
                                <Link className="flex flex-row items-center justify-center bg-sky-700 hover:bg-sky-600 rounded-md w-30 h-8 p-2 cursor-pointer" href={`/EquObra/${params.diaId}`}>
                                    <span className="text-yellow-400 text-[10px] font-semibold ">Equipamentos Obra</span>
                                </Link> 
                            </div>                           
                        </div>
                    </div>                        
                    <div>
                        <div className="flex flex-col w-full h-auto bg-slate-800 mt-2 mb-0 rounded-lg">
                            <div className='flex flex-row justify-between px-2'>
                                <div className='flex flex-col w-[50%] mb-4'>
                                    <span className='text-slate-400 w-full '>
                                        Id Obra: 
                                    </span>
                                    <span className='text-white w-full'>
                                        {diaObrId}
                                    </span>
                                </div>
                                <div className='flex flex-col w-[50%] mb-4'>    
                                    <span className='text-slate-400 w-full'>
                                        Data: 
                                    </span>
                                    <span className='text-white w-full'>
                                        {Intl.DateTimeFormat('pt-BR', {timeZone: 'UTC'}).format(new Date(diaData))}
                                    </span>
                                </div>    
                            </div>
                            <div className='flex flex-row justify-between px-2'>
                                <div className='flex flex-col w-[50%] mb-4'>
                                    <span className='text-slate-400 w-full'>
                                        Inicio Trabalho: 
                                    </span>
                                    <span className='text-white w-full'>
                                        {diaIniHorTrab}
                                    </span>
                                </div>                                    
                                <div className='flex flex-col w-[50%] mb-4'>
                                    <span className='text-slate-400 w-full'>
                                        Final Trabalho: 
                                    </span>
                                    <span className='text-white w-full'>
                                        {diaFinHorTrab}
                                    </span>
                                </div>                                    
                            </div> 
                            <div className='flex flex-row justify-between px-2'>
                                <div className='flex flex-col w-[50%] mb-4'>
                                    <span className='text-slate-400 w-full '>
                                        Inicio Intervalo: 
                                    </span>
                                    <span className='text-white w-full'>
                                        {diaIniHorInter}
                                    </span>
                                </div>
                                <div className='flex flex-col w-[50%] mb-4'>    
                                    <span className='text-slate-400 w-full'>
                                        Final Intervalo: 
                                    </span>
                                    <span className='text-white w-full'>
                                        {diaFinHorInter}
                                    </span>
                                </div>
                            </div>
                            <div className='flex flex-row justify-between px-2'>
                                <div className='flex flex-col w-[50%] mb-4'>
                                    <span className='text-slate-400 w-full '>
                                        Cond. Tempo Manhã: 
                                    </span>
                                    <span className='text-white w-full'>
                                        {diaCndTmpManha}
                                    </span>
                                </div>
                                <div className='flex flex-col w-[50%] mb-4'>    
                                    <span className='text-slate-400 w-full'>
                                        Cond Tempo Tarde: 
                                    </span>
                                    <span className='text-white w-full'>
                                        {diaCndTmpTarde}
                                    </span>
                                </div>
                            </div>    
                            <div className='flex flex-row justify-between px-2'>
                                <div className='flex flex-col w-full mb-4'>
                                    <span className='text-slate-400 w-full'>
                                        Observações: 
                                    </span>
                                    <span className='text-white w-full'>
                                        {diaObservacoes}
                                    </span>
                                </div>                                    
                            </div>
                            <div className='flex flex-row justify-between px-2'>
                                <div className='flex flex-col w-full mb-4'>
                                    <span className='text-slate-400 w-full '>
                                        Comentários: 
                                    </span>
                                    <span className='text-white w-full'>
                                        {diaComentarios}
                                    </span>
                                </div>
                            </div>    
                            <div className='flex flex-row justify-between px-2'>
                                <div className='flex flex-col w-[50%] mb-4'>    
                                    <span className='text-slate-400 w-full'>
                                        Responsável: 
                                    </span>
                                    <span className='text-white w-full'>
                                        {diaIdResDiario}
                                    </span>
                                </div>
                                <div className='flex flex-col w-full mb-4'>
                                    <span className='text-slate-400 w-full'>
                                        Fiscal Auditor: 
                                    </span>
                                    <span className='text-white w-full'>
                                        {diaIdFisDiario}
                                    </span>
                                </div>                                    
                            </div> 
                        </div>    
                    </div>
                </div>  
                <div className='flex flex-col items-center justify-center bg-slate-900 w-full h-full p-2'>
                    <div className='flex flex-row items-center justify-center bg-slate-900 w-full h-full p-2 '>
                        <div className='text-sky-500 text-xs font-bold mt-1 mb-1'>
                            Mão de Obra
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-1 md:grid-cols-4 md:gap-2 w-full h-full">
                        {pesdiario?.map((item:any, idx) => {
                            return <button key={idx} >
                                <div className='col-span-1 bg-slate-700 flex-col items-center justify-center rounded-lg'>
                                    <div>
                                        <span className="text-yellow-400 text-[10px] font-semibold ">{item.crgDescricao}</span>
                                    </div>
                                    <div>
                                        <span className="text-yellow-400 text-[10px] font-semibold ">{item.dcbColQtd}</span>
                                    </div>                                   
                                </div>
                            </button> 
                    })}
                    </div>                       
                </div>               
                <div className='flex flex-col items-center justify-center bg-slate-900 w-full h-full p-2'>
                    <div className='flex flex-row items-center justify-center bg-slate-900 w-full h-full p-2 '>
                        <div className='text-sky-500 text-xs font-bold mt-1 mb-1'>
                            Equipamentos
                        </div> 
                    </div>
                    <div className="grid grid-cols-4 gap-1 md:grid-cols-4 md:gap-2 w-full h-full">
                        {equdiario?.map((item:any, idx) => {
                            return <button key={idx} >
                                <div className='col-span-1 bg-slate-700 flex-col items-center justify-center rounded-lg'>
                                    <div>
                                        <span className="text-yellow-400 text-[10px] font-semibold ">{item.equDescricao}</span>
                                    </div>
                                    <div>
                                        <span className="text-yellow-400 text-[10px] font-semibold ">{item.deqEquQtd}</span>
                                    </div>                                   
                                </div>
                            </button> 
                        })}
                    </div>                       
                </div>
                <div className='flex flex-col items-center justify-center bg-slate-900 w-full h-full p-2'>
                    <div className='flex flex-row items-center justify-center bg-slate-900 w-full h-full p-2 '>
                        <div className='text-sky-500 text-xs font-bold mt-1 mb-1'>
                            Atividades
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-1 md:grid-cols-4 md:gap-2 w-full h-full">
                        {atvdiario?.map((item:any, idx) => {
                            return <button key={idx} >
                                <div className='col-span-1 bg-slate-700 flex-col items-center justify-center rounded-lg'>
                                    <div>
                                        <span className="text-yellow-400 text-[10px] font-semibold ">{item.atvDescricao}</span>
                                    </div>
                                    <div>
                                        <span className="text-yellow-400 text-[10px] font-semibold ">{item.dtvAtvStatus}</span>
                                    </div>                                   
                                </div>
                            </button> 
                        })}
                    </div>                       
                </div>                  
            </div>
            <div className='flex flex-row items-center justify-center bg-slate-500 w-full h-12 p-2 '>
                <div className='text-sky-500 text-xs font-bold mt-3 mb-3'>
                
                </div>
            </div>
        </div>    
    );
}
