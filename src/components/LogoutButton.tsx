"use client"
import { signOut } from "next-auth/react";

export default function LogoutButton(){
    return(
        <button className="flex items-center justify-center bg-red-700 rounded-md hover:bg-red-600 w-20 h-10" onClick={() => signOut()}>
            <span className="text-white text-md font-bold ">Sair</span>
        </button>
    )
}