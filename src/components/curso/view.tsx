import type { Curso as CursoType } from "@/lib/mockup"
import { api } from "@/services/api";
import Image from "next/image"

export default function CursoView({ data } : { data : CursoType }){
    const date = new Date(data.started);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}`: date.getMonth() + 1}/${date.getFullYear()}`;

    async function handleRegistration(){
        await api.post('/users-courses', { 
            courseId: data.id, 
            userId: Number(localStorage.getItem('USER_ID')), 
            registrationCanceled: false 
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('TOKEN')}`
            }
        });

        if (typeof window !== 'undefined') {
            window.location.reload();
        }
    }

    async function handleCancelRegistration(){
        await api.put(`/users-courses/${data.usercourseid}`, { 
            courseId: data.id, 
            userId: Number(localStorage.getItem('USER_ID')), 
            registrationCanceled: true 
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('TOKEN')}`
            }
        });

        if (typeof window !== 'undefined') {
            window.location.reload();
        }
    }

    return <div className="border flex-1 flex flex-col">
        <figure className="relative aspect-video">
            <Image src={ data.cover } alt={ data.name } fill />
            { data.registered && <figcaption className="text-sm p-4 bg-slate-200 absolute m-4 shadow-xl border-slate-400 border rounded-xl">Você já se inscreveu nesse curso</figcaption> }
        </figure>
        <div className="p-6 flex flex-col gap-2 flex-1">
            <h3 className="text-2xl">{ data.name }</h3>
            <p>{ data.description }</p>
            <div className="flex flex-row flex-wrap gap-1">
                <span className="text-xs py-1 px-2 leading-tight bg-slate-200 rounded-2xl">{ data.registrations } {data.registrations > 1 ? "inscritos" : "inscrito"}</span>
                <span className="text-xs py-1 px-2 leading-tight bg-slate-200 rounded-2xl">Inicia em { formattedDate }</span>
            </div>
        </div>
        {  
            data.registered ? data.registrationCanceled ? 
                <p className="bg-red-500 p-4 text-center">Inscrição cancelada</p> : 
                <button
                    className="text-center p-4 bg-slate-300 hover:bg-slate-400"
                    onClick={handleCancelRegistration}
                >
                    Cancelar inscrição
                </button> : 
                <button
                    className="text-center p-4 bg-indigo-500 hover:bg-indigo-600 text-white"
                    onClick={handleRegistration}
                >
                    Fazer inscrição
                </button>
        }
    </div>
}
