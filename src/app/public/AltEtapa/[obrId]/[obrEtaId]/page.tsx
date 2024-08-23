"use client"
import React, {useState, useEffect} from 'react'

import LogoutButton from "@/components/LogoutButton";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { useRouter } from 'next/navigation';

import api from "@/components/Services/api";

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

export default function AltEtapa({params}: any){
    const router = useRouter();

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
    
    useEffect(() => {   
        const idObr = params.obrId;    

        api.get(`/searchEtapa/${idObr}`).then(resp => {
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

    async function handleCadastra(e:any){      
        e.preventDefault();

        api({
          method: 'post',    
          url: `updobra`,
          data: {
            obrEtaId,
            obrEtaIdObra,
            obrEtaNome,
            obrEtaInicio,
            obrEtaPrevisao,
            obrEtaTermino,
            obrEtaDescricao,
            obrEtaIdResp,
            obrEtaEntrega,
            obrEtaDatFisc,
            obrEtaIdFisc,
         },
        }).then(function(response) {
            alert(`Obra alterada com sucesso! ${response.data}` )
            let obrId = response.data.obrId;
            router.push(`/ObrDetalhes/${obrId}`)   
        }).catch(function(error) {
          alert('Erro no cadastro!')
        })
    }

    return(
        <div className="flex flex-col w-full h-auto items-center bg-slate-600">
            <div className="flex flex-row w-full h-20 bg-blue-700 items-center justify-between p-2 md:p-20">
            </div>
            <div className="flex flex-col w-full h-auto  items-center p-2 md:p-20">
                <form className="flex flex-col justify-center items-center bg-white p-12 rounded-lg w-full md:w-4/5 h-full max-w-full gap-2 ">
                    <h2 className="text-blue-700 text-2xl font-bold mb-6 ">Altere dados da Etapa da Obra</h2>
                    <div className="flex flex-row justify-between items-center w-full h-auto gap-2">
                        <input className="w-[70%] border-2 border-black p-3 mb-3 focus:border-blue-700" name="nomObra" placeholder="Nome da Obra" type="text" value={obrEtaNome} onChange={(e) => {setObrEtaNome(e.target.value)}} />
                    </div>
                    <div className="flex flex-row justify-between items-center w-full h-auto gap-2">
                        <input className="w-[70%] border-2 border-black p-3 mb-3 focus:border-blue-700" name="nomObra" placeholder="Nome da Obra" type="text" value={obrEtaInicio} onChange={(e) => {setObrEtaInicio(e.target.value)}} />
                    </div>
                    <div className="flex flex-row justify-between items-center w-full h-auto gap-2">
                        <input className="w-[70%] border-2 border-black p-3 mb-3 focus:border-blue-700" name="nomObra" placeholder="Nome da Obra" type="text" value={obrEtaPrevisao} onChange={(e) => {setObrEtaPrevisao(e.target.value)}} />
                    </div>
                    <div className="flex flex-row justify-between items-center w-full h-auto gap-2">
                        <input className="w-[70%] border-2 border-black p-3 mb-3 focus:border-blue-700" name="nomObra" placeholder="Nome da Obra" type="text" value={obrEtaTermino} onChange={(e) => {setObrEtaTermino(e.target.value)}} />
                    </div>
                    <div className="flex flex-row justify-between items-center w-full h-auto gap-2">
                        <input className="w-[70%] border-2 border-black p-3 mb-3 focus:border-blue-700" name="nomObra" placeholder="Nome da Obra" type="text" value={obrEtaDescricao} onChange={(e) => {setObrEtaDescricao(e.target.value)}} />
                    </div>
                    <div className="flex flex-row justify-between items-center w-full h-auto gap-2">
                        <input className="w-[70%] border-2 border-black p-3 mb-3 focus:border-blue-700" name="nomObra" placeholder="Nome da Obra" type="text" value={obrEtaIdResp} onChange={(e) => {setObrEtaIdResp(e.target.value)}} />
                    </div>
                    <div className="flex flex-row justify-between items-center w-full h-auto gap-2">
                        <input className="w-[70%] border-2 border-black p-3 mb-3 focus:border-blue-700" name="nomObra" placeholder="Nome da Obra" type="text" value={obrEtaEntrega} onChange={(e) => {setObrEtaEntrega(e.target.value)}} />
                    </div>
                    <div className="flex flex-row justify-between items-center w-full h-auto gap-2">
                        <input className="w-[70%] border-2 border-black p-3 mb-3 focus:border-blue-700" name="nomObra" placeholder="Nome da Obra" type="text" value={obrEtaDatFisc} onChange={(e) => {setObrEtaDatFisc(e.target.value)}} />
                    </div>
                    <div className="flex flex-row justify-between items-center w-full h-auto gap-2">
                        <input className="w-[70%] border-2 border-black p-3 mb-3 focus:border-blue-700" name="nomObra" placeholder="Nome da Obra" type="text" value={obrEtaIdFisc} onChange={(e) => {setObrEtaIdFisc(e.target.value)}} />
                    </div>
                    <button onClick={handleCadastra} type="submit" className="flex items-center justify-center bg-blue-700 rounded-md hover:bg-blue-600 w-full h-10 mt-6">
                        <span className="text-white text-md font-bold hover:text-yellow-500">Alterar</span>
                    </button>
                </form>
            </div>
        </div>    
    );
}