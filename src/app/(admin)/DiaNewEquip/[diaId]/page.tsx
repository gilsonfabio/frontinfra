"use client"
import React, {useState, useEffect} from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import LogoutButton from "@/components/LogoutButton";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { useRouter } from 'next/navigation';

import api from "@/components/Services/api";

type equipamentosProps = {
    "equId": number;
    "equDescricao": string; 
}

export default function DiaNewEquip({params}: any){
    const router = useRouter();
    const [equipamentos, setEquipamentos] = useState([]);
    const [deqEquId, setDeqEquId] = useState('');
    const [deqEquQtd, setDeqEquQtd] = useState('');
    
    useEffect(() => {   
        api.get(`/equipamentos`).then(res => {
            setEquipamentos(res.data)           
        }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });    

    }, [])


    async function handleCadastra(e:any){      
        e.preventDefault();
        
        let idDia = params.diaId;

        api({
          method: 'post',    
          url: `diaEquInsert`,
          data: {
            deqDiaId: idDia,
            deqEquId, 
            deqEquQtd,
         },
        }).then(function(response) {
            alert(`Equipamento cadastrado com sucesso no diario! ${response.data}` )
        }).catch(function(error) {
          alert('Erro no cadastro!')
        })
        
    }

    return(
        <div className="flex flex-col w-full h-screen items-center bg-slate-900">
            <div className="flex flex-row w-full h-20 bg-slate-700 items-center justify-between p-2 md:p-20">
            </div>
            <div className="flex flex-col w-full h-auto  items-center p-2 md:p-20">
                <form className="flex flex-col justify-center items-center bg-slate-700 p-12 rounded-lg w-full md:w-4/5 h-full max-w-full gap-2 ">
                    <h2 className="text-white text-2xl font-bold mb-6 ">Informe o Equipamento</h2>
                    <div className="flex flex-row justify-between items-center w-full h-auto gap-2">
                        <select className="form-select appearance-none block w-full p-3 mb-3 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" 
                            value={deqEquId}
                            onChange={(e) => {setDeqEquId(e.target.value)}} 
                        >
                            <option selected>Selecione Equipamento desejado</option>
                            {equipamentos.map((row:any) => (
                                <option key={row.equId} value={row.equId}>{row.equDescricao}</option>
                            ))}                          
                        </select> 
                    </div>
                    <div className="flex flex-row justify-between items-center w-full h-auto gap-2">
                        <input className="w-full border-2 border-black p-3 mb-3 focus:border-blue-700" 
                            name="equipQtd" placeholder="Informe Quantidade" type="number" value={deqEquQtd} onChange={(e) => {setDeqEquQtd(e.target.value)}} />
                    </div> 
                    <button onClick={handleCadastra} type="submit" className="flex items-center justify-center bg-blue-700 rounded-md hover:bg-blue-600 w-full h-10 mt-6">
                        <span className="text-white text-md font-bold hover:text-yellow-500">Entrar</span>
                    </button>
                </form>
            </div>
        </div>    
    );
}