import Paciente from '../components/Paciente';
import Alerta from '../components/Alerta';
import useEstudiantes from "../hooks/useEstudiantes";
import usePersonal from "../hooks/usePersonal";
import { useEffect } from 'react';

const Pacientes = () => {
    const {alerta, estudiantes}= useEstudiantes();
    const {personal}= usePersonal();


    const {msg} = alerta;
    return (
        <>
            <div className='container w-full bg-slate-200 flex flex-col items-center rounded-md shadow-md'>
                {msg && <Alerta alerta={alerta}/>}
                <h1 className='font-bold text-4xl uppercase p-2'>Pacientes</h1>
                <div className='overflow'>
                    {estudiantes.length === 0 && personal.length ===0 ? 
                    (<h2 className='text-3xl font-semibold pt-20 uppercase h-[45rem]'>No Hay Pacientes Registrados</h2>)
                    :(
                        <table className='rounded text-sm text-gray-500 dark:text-gray-400 my-5 table-auto overflow-y-scroll h-[45rem] block w-full'>
                            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky z-10 top-0'>
                                <tr className='sticky z-10 top-0'>
                                    <th scope='col' className='p-x6 py-3 sticky z-10 top-0'>Nombre</th>
                                    <th scope='col' className='p-x6 py-3 sticky z-10 top-0'>Apellidos</th>
                                    <th scope='col' className='p-x6 py-3 sticky z-10 top-0'>Cantidad de Citas</th>
                                    <th scope='col' className='p-x6 py-3 sticky z-10 top-0'>Sexo</th>
                                    <th scope='col' className='p-x6 py-3 sticky z-10 top-0'>Tipo de Usuario</th>
                                    <th scope='col' className='p-x6 py-3 sticky z-10 top-0'>Acciónes</th>
                                </tr>
                            </thead>

                            <tbody className='text-center'>
                                {estudiantes.map(estudiante =>(
                                    <Paciente paciente={estudiante} key={estudiante.numeroControl}/> 
                                ))}
                                {personal.map(persona => {
                                    <Paciente paciente={persona}  key={persona.idPersonal}/>
                                })}
                            </tbody>
                        </table>
                    )}
                    
                </div>
            </div>
        </>
    )
}

export default Pacientes
