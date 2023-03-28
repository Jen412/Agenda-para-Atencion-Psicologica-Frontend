import React from 'react'
import useCitas from "../hooks/useCitas";
import useAuth from '../hooks/useAuth';
import Cita from '../components/Cita';

const Citas = () => {
    const {citas} = useCitas();
    const {auth} = useAuth();
    
    return (
        <>
            <div className='container w-full bg-slate-200 flex  flex-col items-center rounded-md shadow-md'>
                <h1 className='font-bold text-4xl uppercase p-2'>Citas</h1>
                <table className='w-5/6 rounded text-sm text-gray-500 dark:text-gray-400 my-5 h-96'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                        <tr>
                            <th scope='col' className='p-x6 py-3'>Paciente</th>
                            <th scope='col' className='p-x6 py-3'>Motivo</th>
                            <th scope='col' className='p-x6 py-3'>Fecha</th>
                            <th scope='col' className='p-x6 py-3'>Hora</th>
                            <th scope='col' className='p-x6 py-3'>Confirmado</th>
                            <th scope='col' className='p-x6 py-3'>Acciónes</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {citas.map(cita =>(auth.idUsuario === cita.idUsuario ? 
                            <Cita cita={cita} key={cita.idCita}/> : ""
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Citas
