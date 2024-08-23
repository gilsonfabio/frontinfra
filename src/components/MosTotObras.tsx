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

export default function MosTotObras(){
    const [totObras, setTotObras] = useState(0);
    const [totExec, setTotExec] = useState(0);
    const [totFinal, setTotFinal] = useState(0);
    const [totPrev, setTotPrev] = useState(0);
    const [totCanc, setTotCanc] = useState(0);

    let status = '';

    const [txtTotal, setTxtTotal] = useState('');
    const [txtExec, setTxtExec] = useState('');
    const [txtFinal, setTxtFinal] = useState('');
    const [txtPrev, setTxtPrev] = useState('');
    const [txtCanc, setTxtCanc] = useState('');
    const [vlrTotal, setVlrTotal] = useState(0);
    const [vlrTotExec, setVlrTotExec] = useState(0);
    const [vlrTotPrev, setVlrTotPrev] = useState(0);
    const [vlrTotCanc, setVlrTotCanc] = useState(0);
    const [vlrTotFina, setVlrTotFina] = useState(0);

    useEffect(() => {   
    
        status = 'T';
        setTxtTotal('Total de Obras:')
        api.get(`/totObras/${status}`).then(res => {
            setTotObras(res.data.countObras)
            setVlrTotal(res.data.totObras)           
        }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });  
        
        status = 'I';
        setTxtExec('Obras Execução:')
        api.get(`/totObras/${status}`).then(res => {
            setTotExec(res.data.countObras)    
            setVlrTotExec(res.data.totObras)        
        }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });  

        status = 'F';
        setTxtFinal('Obras Finalizadas:')
        api.get(`/totObras/${status}`).then(res => {
            setTotFinal(res.data.countObras)          
            setVlrTotFina(res.data.totObras)  
        }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });  

        status = 'C';
        setTxtCanc('Obras Paralizadas:')
        api.get(`/totObras/${status}`).then(res => {
            setTotCanc(res.data.countObras)           
            setVlrTotCanc(res.data.totObras) 
        }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });  

        status = 'A';
        setTxtPrev('Obras Previstas:')
        api.get(`/totObras/${status}`).then(res => {
            setTotPrev(res.data.countObras)           
            setVlrTotPrev(res.data.totObras) 
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
        <div className="w-full grid grid-cols-1 gap-1 md:grid-cols-5 md:gap-2 ">
            <div className="flex flex-col items-center justify-center w-full h-full border-2 border-yellow-500 rounded-2xl">
                <span className="text-2xl text-slate-400 font-bold">{txtTotal}</span>
                <span className="text-3xl text-white font-bold mt-5 ">{totObras}</span>
                <span className="text-3xl text-white font-bold mt-5 ">{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(vlrTotal)}</span>
            </div>                
            <div className="flex flex-col items-center justify-center w-full h-full border-2 border-yellow-500 rounded-2xl">
                <span className="text-2xl text-slate-400 font-bold ">{txtExec}</span>
                <span className="text-3xl text-white font-bold mb-2 ">{totExec}</span>
                <span className="text-3xl text-white font-bold mt-5 ">{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(vlrTotExec)}</span>
            </div> 
            <div className="flex flex-col items-center justify-center w-full h-full border-2 border-yellow-500 rounded-2xl">
                <span className="text-2xl text-slate-400 font-bold ">{txtFinal}</span>
                <span className="text-3xl text-white font-bold mb-2 ">{totFinal}</span>
                <span className="text-3xl text-white font-bold mt-5 ">{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(vlrTotFina)}</span>
            </div> 
            <div className="flex flex-col items-center justify-center w-full h-full border-2 border-yellow-500 rounded-2xl">
                <span className="text-2xl text-slate-400 font-bold ">{txtPrev}</span>
                <span className="text-3xl text-white font-bold mb-2 ">{totPrev}</span>
                <span className="text-3xl text-white font-bold mt-5 ">{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(vlrTotPrev)}</span>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full border-2 border-yellow-500 rounded-2xl">
                <span className="text-2xl text-slate-400 font-bold ">{txtCanc}</span>
                <span className="text-3xl text-white font-bold mb-2 ">{totCanc}</span>
                <span className="text-3xl text-white font-bold mt-5 ">{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(vlrTotCanc)}</span>
            </div>  
        </div>        
    )
}


/*

        <div className='flex flex-col bg-slate-300 w-full h-auto p-2 '>
            <div className="flex flex-row justify-center w-full h-24 bg-blue-900 mb-1">
                <div className='flex flex-col w-28 border-2 border-sky-400 rounded-lg items-end justify-center px-2 mr-3'>
                    <span className="text-xs text-slate-400 font-bold ">{txtTotal}</span>
                    <span className="text-3xl text-white font-bold mb-2 ">{totObras}</span>
                </div>
                <div className='flex flex-col w-28 border-2 border-sky-400 rounded-lg items-end justify-center px-2 mr-3'>
                    <span className="text-xs text-slate-400 font-bold ">{txtExec}</span>
                    <span className="text-3xl text-white font-bold mb-2 ">{totExec}</span>
                </div>
                <div className='flex flex-col w-28 border-2 border-sky-400 rounded-lg items-end justify-center px-2 mr-3'>
                    <span className="text-xs text-slate-400 font-bold ">{txtFinal}</span>
                    <span className="text-3xl text-white font-bold mb-2 ">{totFinal}</span>
                </div>
                <div className='flex flex-col w-28 border-2 border-sky-400 rounded-lg items-end justify-center px-2 mr-3'>
                    <span className="text-xs text-slate-400 font-bold ">{txtCanc}</span>
                    <span className="text-3xl text-white font-bold mb-2 ">{totCanc}</span>
                </div>
            </div>                        
        </div>


*/