import FormLogin from "@/components/FormLogin";

import Image from "next/image";

import imgLogin from '@/assets/images/imgLogin.jpg';

export default function Home() {
  return (
    <main>
      <div className="flex flex-col md:flex-row items-center justify-center bg-slate-600 h-screen w-screen">
        <div className="flex flex-col w-full md:w-[50%] h-full bg-slate-700">
          <Image className="w-full h-full object-cover" width={500} height={800} src={imgLogin} alt="Imagem da tela de login" />
        </div>
        <div className="flex items-center justify-center flex-col w-full md:w-[50%] h-full bg-white">
          <FormLogin />
        </div>        
      </div>
    </main>
  );
}
