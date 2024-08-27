"use client"
import React, {useState, useEffect} from 'react'
import LogoutButton from "@/components/LogoutButton";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { useRouter } from 'next/navigation';

import api from "@/components/Services/api";

type equipamentosProps = {
    "equId": number;
    "equDescricao": string; 
}

export default function DiaNewAtiv({params}: any){
    const router = useRouter();
    const [atividades, setAtividades] = useState([]);
    const [dtvAtvId, setDtvAtvId] = useState('');
    const [dtvAtvStatus, setDtvAtvStatus] = useState('');
    
    const status = [
        {staId: 'I', staDescricao: 'Iniciada'},
        {staId: 'A', staDescricao: 'Andamento'},
        {staId: 'F', staDescricao: 'Finalizada'},
    ]


    useEffect(() => {   
        api.get(`/atividades`).then(res => {
            setAtividades(res.data)           
        }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });    

    }, [])

    async function handleCadastra(e:any){      
        e.preventDefault();
        
        let idDia = params.diaId;

        api({
          method: 'post',    
          url: `diaAtiInsert`,
          data: {
            dtvDiaId: idDia, 
            dtvAtvId, 
            dtvAtvStatus
        },
        }).then(function(response) {
            alert(`Atividade cadastrada com sucesso no diario! ${response.data}` )
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
                    <h2 className="text-white text-2xl font-bold mb-6 ">Informe Atividade</h2>
                    <div className="flex flex-row justify-between items-center w-full h-auto gap-2">
                        <select className="form-select appearance-none block w-full p-3 mb-3 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" 
                            value={dtvAtvId}
                            onChange={(e) => {setDtvAtvId(e.target.value)}} 
                        >
                            <option selected>Selecione Atividade</option>
                            {atividades.map((row:any) => (
                                <option key={row.atvId} value={row.atvId}>{row.atvDescricao}</option>
                            ))}                          
                        </select> 
                    </div>                      
                    <div className="flex flex-row justify-between items-center w-full h-auto gap-2">
                        <select className="form-select appearance-none block w-full p-3 mb-3 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" 
                            value={dtvAtvStatus}
                            onChange={(e) => {setDtvAtvStatus(e.target.value)}} 
                        >
                            <option selected>Selecione Status</option>
                            {status.map((row:any) => (
                                <option key={row.staId} value={row.staId}>{row.staDescricao}</option>
                            ))}                          
                        </select> 
                    </div>                                      
                    <button onClick={handleCadastra} type="submit" className="flex items-center justify-center bg-blue-700 rounded-md hover:bg-blue-600 w-full h-10 mt-6">
                        <span className="text-white text-md font-bold hover:text-yellow-500">Entrar</span>
                    </button>
                </form>
            </div>
        </div>    
    );
}