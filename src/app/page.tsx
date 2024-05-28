"use client"
import Curso from '@/components/curso'
import HeaderView from '@/components/header';
import type { Curso as CursoType } from '@/lib/mockup'
import { api } from '@/services/api';
import { useEffect, useState } from 'react';

export default function Page() {
  const [courses, setCourses] = useState<any[]>([]);

  async function getValues() {
    if (!localStorage.getItem('USER_ID')) {
      const response = await api.get(`/courses`);
      setCourses(response.data);
      return
    };

    const response = await api.get(`/courses/${localStorage.getItem('USER_ID')}`);

    setCourses(response.data);
  }

  useEffect(() => {
    getValues();
  }, []);

  return (
    <>
      <HeaderView />
      <main>
        <h2 className="page-title">Cursos</h2>
        <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-8'>
          { courses.map( (curso : CursoType) => <Curso data={ curso } key={ curso.id } /> ) }
        </div>
      </main>
    </>
  );
}
