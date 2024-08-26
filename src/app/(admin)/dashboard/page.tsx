import { Chart } from "@/components/Chart";
import LogoutButton from "@/components/LogoutButton";
import MosObras from "@/components/MosObras";
import MosTotObras from "@/components/MosTotObras";

import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard(){
    const session = await getServerSession();

    if (!session) {
        redirect("/") 
    }

    return(
        <div>            
            <div className="flex flex-row w-full h-full bg-slate-900 px-10 py-2 gap-3">
                <MosTotObras />
            </div>
            <div className="w-full h-full bg-slate-900 px-10 py-2">
                <MosObras />
            </div> 
            <div className="flex flex-row justify-center w-full h-full bg-slate-900 px-10 py-2">
                <div className="w-[50%] h-full md:w-full bg-slate-900 p-2">
                    <Chart />
                </div>
                <div className="flex flex-col justify-center w-[50%] h-full p-2">  
                    <div className="w-full h-full bg-slate-900 p-2">
                        <Link className="flex items-center justify-center bg-sky-700 hover:bg-sky-600 rounded-lg w-30 h-8 p-2 cursor-pointer" href={`../Atividades`}>
                            <span className="text-yellow-400 text-xs font-bold ">Atividades</span>
                        </Link>
                    </div>     
                    <div className="w-full h-full bg-slate-900 p-2">
                        <Link className="flex items-center justify-center bg-sky-700 hover:bg-sky-600 rounded-lg w-30 h-8 p-2 cursor-pointer" href={`../Cargos`}>
                            <span className="text-yellow-400 text-xs font-bold ">Cargos</span>
                        </Link>
                    </div> 
                    <div className="w-full h-full bg-slate-900 p-2">
                        <Link className="flex items-center justify-center bg-sky-700 hover:bg-sky-600 rounded-lg w-30 h-8 p-2 cursor-pointer" href={`../Equipamentos`}>
                            <span className="text-yellow-400 text-xs font-bold ">Equipamentos</span>
                        </Link>
                    </div>
                </div>    
            </div>             
        </div>    
    );
}

/* 

    <div className="flex flex-row w-full h-10 bg-slate-800 items-center justify-between p-2 md:p-10">
        <div>Olá, {session?.user?.name}</div>
        <div>Dashboard</div>
        <div><LogoutButton /></div>
    </div>

*/