import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";

import Image from "next/image";
import imgDashboard from '@/assets/images/imgDashboard.jpg';

export default async function Menubar() {
    const session = await getServerSession();
    
    if (!session) {
        redirect("/")
    }

    return(
        <>
            <div className="flex flex-col w-full h-full ">
                <div className="flex flex-row w-full h-10 bg-slate-900 items-center justify-between p-2 md:p-10">
                    <div className="text-white text-xl font-semibold">Dashboard</div>
                    <div className="text-white text-md font-normal">Olá, {session?.user?.name}</div>                    
                    <div><LogoutButton /></div>
                </div>  
            </div> 
            <div className="flex flex-col w-full h-[10%]">
                <Image className="w-full h-full object-contain" width={500} height={500} src={imgDashboard} alt="Imagem da tela de login" />
            </div>
        </>
    )
}