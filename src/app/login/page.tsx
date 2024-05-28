"use client"

import { api } from "@/services/api";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useState } from "react";
import HeaderView from "@/components/header";

export default function Page() {
  const [error, setErro] = useState<boolean>(false);

  const router = useRouter();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {

      const email = (event.target as HTMLFormElement).email.value;
      const password = (event.target as HTMLFormElement).password.value;
      const response = await api.post('/auth', { email, password });
      const { sub } = jwtDecode(response.data.token);
  
      localStorage.setItem('TOKEN', response.data.token);
      localStorage.setItem('USER_ID', sub || '');
      
      router.replace('/');
    } catch(e) {
      setErro(true);
    }
  }

  return (
    <>
      <HeaderView />
      <main>      
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-indigo-50 max-w-96 rounded-3xl flex flex-col gap-4"
        >
          <h2 className="page-title">Login</h2>
          {error && <p className="text-red-500">E-mail ou senha inválidos</p>}
          <div className="flex flex-col gap-2">
            <label htmlFor="email">E-mail</label>
            <input type="email" required name="email" id="email" className="border h-10 rounded-xl focus:outline-none focus:border-indigo-300 px-4 py-2" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Senha</label>
            <input type="password" required name="password" id="password" className="border h-10 rounded-xl focus:outline-none focus:border-indigo-300 px-4 py-2" />
          </div>
          <div className="flex flex-row justify-between items-end">
            <Link href="/cadastro" className="my-3">Fazer cadastro</Link>
            <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg">Entrar</button>
          </div>
        </form>
      </main>
    </>
  );
}
