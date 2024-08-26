"use client"
import React, {useState, useEffect} from 'react'

import LogoutButton from "@/components/LogoutButton";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { useRouter } from 'next/navigation';

import api from "@/components/Services/api";

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

export default function NewEtapa({params}: any){
    const router = useRouter();

    const [obrNome, setObrNome] = useState('');
    const [obrContrato, setObrContrato] = useState('');
    const [obrDescricao, setObrDescricao] = useState('');
    const [obrLogradouro, setObrLogradouro] = useState('');
    const [obrNumero, setObrNumero] = useState('');
    const [obrComplemento, setObrComplemento] = useState('');
    const [obrBairro, setObrBairro] = useState('');
    const [obrCidade, setObrCidade] = useState('');
    const [obrUf, setObrUf] = useState('');
    const [obrCep, setObrCep] = useState('');
    const [obrSecretaria, setObrSecretaria] = useState('');
    const [obrInicio, setObrInicio] = useState('');
    const [obrPreTermino, setObrPreTermino] = useState('');
    const [obrStatus, setObrStatus] = useState('');
    const [obrVlrContrato, setObrVlrContrato] = useState('');
    const [obrVlrAditivo, setObrVlrAditivo] = useState('');
    
    async function handleCadastra(e:any){      
        e.preventDefault();

        api({
          method: 'post',    
          url: `newobra`,
          data: {
            obrNome,
            obrContrato,
            obrDescricao, 
            obrLogradouro, 
            obrNumero, 
            obrComplemento, 
            obrBairro, 
            obrCidade, 
            obrUf, 
            obrCep, 
            obrSecretaria, 
            obrInicio, 
            obrPreTermino, 
            obrStatus, 
            obrVlrContrato, 
            obrVlrAditivo
         },
        }).then(function(response) {
            alert(`Obra cadastrada com sucesso! ${response.data}` )
            let obrId = response.data.obrId;
            router.push(`/NewEtapa/${obrId}`)   
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
                    <h2 className="text-blue-700 text-2xl font-bold mb-6 ">Informe dados da Nova Obra</h2>
                    <div className="flex flex-row justify-between items-center w-full h-auto gap-2">
                        <input className="w-[70%] border-2 border-black p-3 mb-3 focus:border-blue-700" name="nomObra" placeholder="Nome da Obra" type="text" value={obrNome} onChange={(e) => {setObrNome(e.target.value)}} />
                        <input className="w-[30%] border-2 border-black p-3 mb-3 focus:border-blue-700" name="contrato" placeholder="Nº do Contrato" type="text" value={obrContrato} onChange={(e) => {setObrContrato(e.target.value)}}/>
                    </div>
                    <div className="flex flex-row justify-between items-center w-full h-auto gap-2">
                        <input className="w-[100%] border-2 border-black p-3 mb-3 focus:border-blue-700" name="descricao" placeholder="Descrição da obra" type="text" value={obrDescricao} onChange={(e) => {setObrDescricao(e.target.value)}}/>
                    </div>
                    <div className="flex flex-row justify-between items-center w-full h-auto gap-2">
                        <input className="w-[70%] border-2 border-black p-3 mb-3 focus:border-blue-700" name="logradouro" placeholder="Logradouro" type="text" value={obrLogradouro} onChange={(e) => {setObrLogradouro(e.target.value)}}/>
                        <input className="w-[30%] border-2 border-black p-3 mb-3 focus:border-blue-700" name="numero" placeholder="Numero" type="text" value={obrNumero} onChange={(e) => {setObrNumero(e.target.value)}}/>
                    </div>
                    <div className="flex flex-row justify-between items-center w-full h-auto gap-2">
                        <input className="w-[50%] border-2 border-black p-3 mb-3 focus:border-blue-700" name="complemento" placeholder="Complemento" type="text" value={obrComplemento} onChange={(e) => {setObrComplemento(e.target.value)}}/>
                        <input className="w-[50%] border-2 border-black p-3 mb-3 focus:border-blue-700" name="bairro" placeholder="Bairro" type="text" value={obrBairro} onChange={(e) => {setObrBairro(e.target.value)}}/>
                    </div>        
                    <div className="flex flex-row justify-between items-center w-full h-auto gap-2">
                        <input className="w-[50%] border-2 border-black p-3 mb-3 focus:border-blue-700" name="Cidade" placeholder="Cidade" type="text" value={obrCidade} onChange={(e) => {setObrCidade(e.target.value)}}/>
                        <input className="w-[20%] border-2 border-black p-3 mb-3 focus:border-blue-700" name="Estado" placeholder="Estado" type="text" value={obrUf} onChange={(e) => {setObrUf(e.target.value)}}/>
                        <input className="w-[30%] border-2 border-black p-3 mb-3 focus:border-blue-700" name="Cep" placeholder="Cep" type="text" value={obrCep} onChange={(e) => {setObrCep(e.target.value)}}/>
                    </div>
                    <div className="flex flex-row justify-between items-center w-full h-auto gap-2">
                        <input className="w-[50%] border-2 border-black p-3 mb-3 focus:border-blue-700" name="Inicio" placeholder="Inicio" type="text" value={obrInicio} onChange={(e) => {setObrInicio(e.target.value)}}/>
                        <input className="w-[50%] border-2 border-black p-3 mb-3 focus:border-blue-700" name="preTermino" placeholder="Previsão Termino" type="text" value={obrPreTermino} onChange={(e) => {setObrPreTermino(e.target.value)}}/>
                    </div> 
                    <div className="flex flex-row justify-between items-center w-full h-auto gap-2">
                        <input className="w-[50%] border-2 border-black p-3 mb-3 focus:border-blue-700" name="vlrContrato" placeholder="Valor do Contrato" type="text" value={obrVlrContrato} onChange={(e) => {setObrVlrContrato(e.target.value)}}/>
                        <input className="w-[50%] border-2 border-black p-3 mb-3 focus:border-blue-700" name="vlrAditivo" placeholder="Valor do Aditivo" type="text" value={obrVlrAditivo} onChange={(e) => {setObrVlrAditivo(e.target.value)}}/>
                    </div> 
                    <div className="flex flex-row justify-between items-center w-full h-auto gap-2">
                        <input className="w-[50%] border-2 border-black p-3 mb-3 focus:border-blue-700" name="secretaria" placeholder="Secretaria" type="text" value={obrSecretaria} onChange={(e) => {setObrSecretaria(e.target.value)}}/>
                        <input className="w-[50%] border-2 border-black p-3 mb-3 focus:border-blue-700" name="status" placeholder="Status" type="text" value={obrStatus} onChange={(e) => {setObrStatus(e.target.value)}}/>
                    </div> 
                    <button onClick={handleCadastra} type="submit" className="flex items-center justify-center bg-blue-700 rounded-md hover:bg-blue-600 w-full h-10 mt-6">
                        <span className="text-white text-md font-bold hover:text-yellow-500">Entrar</span>
                    </button>
                </form>
            </div>
        </div>    
    );
}