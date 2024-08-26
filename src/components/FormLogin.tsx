"use client"

import { signIn} from 'next-auth/react';

export default function FormLogin(){
    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const data = {
            email: formData.get("email"),
            password: formData.get("password"),
        };

        signIn("credentials", {
            ...data,
            callbackUrl: "/dashboard",
        });
    }

    return(
        <form onSubmit={handleLogin} className="flex flex-col justify-center items-center bg-white p-12 rounded-lg w-full md:w-1/2 h-full max-w-full gap-2 ">
            <h2 className="text-blue-700 text-2xl font-bold mb-6 ">Faça seu Login</h2>
            <input className="w-full border-2 border-black p-3 mb-3 focus:border-blue-700"
                name="email"
                placeholder="Email"
                type="email"
            />
            <input className="w-full border-2 border-black p-3 mb-3 focus:border-blue-700"
                name="password"
                placeholder="Senha"
                type="password"
            />        
            <button type="submit" className="flex items-center justify-center bg-blue-700 rounded-md hover:bg-blue-600 w-full h-10 mt-6">
                <span className="text-white text-md font-bold hover:text-yellow-500">Entrar</span>
            </button>
        </form>
    )
}