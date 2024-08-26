"use client"
import React, {useState, useEffect} from 'react'

import LogoutButton from "@/components/LogoutButton";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { useRouter } from 'next/navigation';

import api from "@/components/Services/api";

type equipamentosProps = {
    "equId": number;
    "equDescricao": number;
}

export default function AltEquipamento({params}: any){
    const router = useRouter();

    const [equId, setEquId] = useState('');
    const [equDescricao, setEquDescricao] = useState('');
    
    useEffect(() => {   
        const idEqu = params.equId;    

        api.get(`/searchEquipamento/${idEqu}`).then(resp => {
            setEquId(resp.data[0].equId);
            setEquDescricao(resp.data[0].equDescricao);
        }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        }); 
        
    }, [])

    async function handleCadastra(e:any){      
        e.preventDefault();

        api({
          method: 'post',    
          url: `updequipamento`,
          data: {
            equDescricao,
          },
        }).then(function(response) {
            alert(`Equipamento alterado com sucesso! ${response.data}` )
            let crgId = response.data.crgId;
            router.push(`/Equipamento`)   
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
                    <h2 className="text-white text-2xl font-bold mb-6 ">Altere dados Equipamento</h2>
                    <div className="flex flex-row justify-between items-center w-full h-auto gap-2">
                        <input className="w-full border-2 border-black p-3 mb-3 focus:border-blue-700" 
                            name="descAtiv" placeholder="Informe Equipamento" type="text" value={equDescricao} onChange={(e) => {setEquDescricao(e.target.value)}} />
                    </div>                    
                    <button onClick={handleCadastra} type="submit" className="flex items-center justify-center bg-blue-700 rounded-md hover:bg-blue-600 w-full h-10 mt-6">
                        <span className="text-white text-md font-bold hover:text-yellow-500">Alterar</span>
                    </button>
                </form>
            </div>
        </div>    
    );
}