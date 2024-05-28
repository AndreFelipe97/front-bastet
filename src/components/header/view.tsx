"use client"
import Link from "next/link";
import { useEffect, useState } from "react";

interface HeaderViewProps {
  params?: boolean;
}

export default function HeaderView({ params }: HeaderViewProps ) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>();

  useEffect(() => {
    if(!localStorage.getItem("USER_ID")) return;

    if(localStorage.getItem("TOKEN") && localStorage.getItem("USER_ID")) setIsAuthenticated(true);

    setUserId(localStorage.getItem("USER_ID"));

  }, [])

  return (
    <header className="layout-guide h-[16rem] flex flex-col justify-end">
      <h1 className="text-5xl font-bold py-5"><Link href="/" className="text-indigo-800 hover:text-indigo-900">Bastet</Link></h1>
      <p>Uma nova plataforma de cursos</p>
      <menu className="flex flex-row gap-4">
        { isAuthenticated ?
          null:
          <>
            <Link className="text-indigo-600" href="/cadastro">Fazer cadastro</Link>
            <Link className="text-indigo-600" href="/login">Fazer login</Link>
          </>
        }
        {
          params &&
            <Link className="text-indigo-600" href={`/`}>Voltar para home</Link>
        }
        <Link className="text-indigo-600" href={`/usuario/${userId}`}>Meus cursos</Link>
      </menu>
    </header>
  )
}
