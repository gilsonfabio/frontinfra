"use client"
import React, {useState, useEffect} from 'react'

import LogoutButton from "@/components/LogoutButton";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { useRouter } from 'next/navigation';

import api from "@/components/Services/api";

type etapasProps = {
    "atvId": number;
    "atvDescricao": number;
}

export default function AltAtividade({params}: any){
    const router = useRouter();

    const [atvId, setAtvId] = useState('');
    const [atvDescricao, setAtvDescricao] = useState('');
    
    useEffect(() => {   
        const idAtv = params.atvId;    

        api.get(`/searchAtividade/${idAtv}`).then(resp => {
            setAtvId(resp.data[0].atvId);
            setAtvDescricao(resp.data[0].atvDescricao);
        }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        }); 
        
    }, [])

    async function handleCadastra(e:any){      
        e.preventDefault();

        api({
          method: 'post',    
          url: `updatividade`,
          data: {
            atvDescricao,
          },
        }).then(function(response) {
            alert(`Atividade alterada com sucesso! ${response.data}` )
            let atvId = response.data.atvId;
            router.push(`/Atividade`)   
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
                    <h2 className="text-blue-700 text-2xl font-bold mb-6 ">Altere dados da Atividade</h2>
                    <div className="flex flex-row justify-between items-center w-full h-auto gap-2">
                        <input className="w-full border-2 border-black p-3 mb-3 focus:border-blue-700" 
                            name="descAtiv" placeholder="Informe Atividade" type="text" value={atvDescricao} onChange={(e) => {setAtvDescricao(e.target.value)}} />
                    </div>                    
                    <button onClick={handleCadastra} type="submit" className="flex items-center justify-center bg-blue-700 rounded-md hover:bg-blue-600 w-full h-10 mt-6">
                        <span className="text-white text-md font-bold hover:text-yellow-500">Alterar</span>
                    </button>
                </form>
            </div>
        </div>    
    );
}