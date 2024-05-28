"use client"
import Curso from '@/components/curso'
import HeaderView from '@/components/header'
import type { Curso as CursoType } from '@/lib/mockup'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'

export default function Page({ params }: any) {
  const [courses, setCourses] = useState<any[]>([]);
  async function getValues() {
    const response = await api.get(`/users-courses/${params.idUsuario}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('TOKEN')}`
      }
    });
    setCourses(response.data);
  }
  useEffect(() => {
    getValues();
  }, []);

  return (
    <>
      <HeaderView params={true} />
      <main>
        <h2 className="page-title">Meus cursos</h2>
        <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-8'>
          { courses.map( (curso : CursoType) => <Curso data={ curso } key={ curso.id } /> ) }
        </div>
      </main>
    </>
  );
}
