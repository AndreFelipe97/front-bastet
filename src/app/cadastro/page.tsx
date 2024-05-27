"use client"

import { api } from "@/services/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [error, setErro] = useState<string>("");

  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {

      const name = (event.target as HTMLFormElement).userName.value;
      const email = (event.target as HTMLFormElement).email.value;
      const password = (event.target as HTMLFormElement).password.value;
      const birthdate = (event.target as HTMLFormElement).birthdate.value;
      
      await api.post('/users', { name, email, password, birthdate });
      router.push('/login');
    } catch(e: any) {
      setErro(e.response.data.message);
    }
  }
  
  return (
    <main>      
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h2 className="page-title">Cadastro</h2>
        <p>Eu já tenho cadastro, quero <Link href="/login">fazer login.</Link></p>
        {error && <p className="text-red-500">{error}</p>}
        <div className="max-w-96 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="userName">Nome</label>
            <input type="text" required name="userName" id="userName" className="border h-10 rounded-xl focus:outline-none focus:border-indigo-300 px-4 py-2" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="birthdate">Data de nascimento</label>
            <input type="date" required name="birthdate" id="birthdate" className="border h-10 rounded-xl focus:outline-none focus:border-indigo-300 px-4 py-2" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">E-mail</label>
            <input type="email" required name="email" id="email" className="border h-10 rounded-xl focus:outline-none focus:border-indigo-300 px-4 py-2" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Senha</label>
            <input type="password" required name="password" id="password" className="border h-10 rounded-xl focus:outline-none focus:border-indigo-300 px-4 py-2" />
          </div>
        </div>
        <div className="flex flex-row justify-between items-end">
          <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg">Cadastrar</button>
        </div>
      </form>
    </main>
  );
}
