import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";

import Image from "next/image";
import imgDashboard from '@/app/assets/images/imgDashboard.jpg';

export default async function Menubar() {
    const session = await getServerSession();
    
    if (!session) {
        redirect("/")
    }

    return(
        <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="flex flex-row w-full h-10 bg-slate-800 items-center justify-between p-2 md:p-10">
                <div>Olá, {session?.user?.name}</div>
                <div>Dashboard</div>
                <div><LogoutButton /></div>
            </div>    
            <div className="flex flex-col w-full h-[20%]">
                <Image className="w-full h-full object-cover" width={500} height={800} src={imgDashboard} alt="Imagem da tela de login" />
            </div>
        </div>
    )
}