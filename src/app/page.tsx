import Curso from '@/components/curso'
import HeaderView from '@/components/header';
import type { Curso as CursoType } from '@/lib/mockup'

export default function Page() {
  return (
    <>
      <HeaderView />
      <main>
        <h2 className="page-title">Cursos</h2>
        <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-8'>
          {/* { CursosMockup.map( (curso : CursoType) => <Curso data={ curso } key={ curso.id } /> ) } */}
        </div>
      </main>
    </>
  );
}
