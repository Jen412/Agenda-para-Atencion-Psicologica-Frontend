import useEstudiantes from "../hooks/useEstudiantes"
import { formatearFecha } from "../helpers/formatearFecha";

const Cita = ({cita}) => {
    const {estudiantes} = useEstudiantes();
    let nombre;
    if (cita.estudiante) {
        estudiantes.map(estudiante => {
            if (estudiante.numeroControl === cita.idPaciente) {
                nombre= estudiante.nombre + " " + estudiante.apellidoP + " "+ estudiante.apellidoM;
            }
        });
    }else{

    }
    
    return (
        <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
            <td scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{nombre}</td>
            <td scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{cita?.motivo}</td>
            <td scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{formatearFecha(cita.fechaCita)}</td>
            <td scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{cita.horaCita}</td>
            <td scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{cita.fechaConfirmacion!=null ? "Confirmada": "Sin confirmar"}</td>
            <td scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>Acciones</td>
        </tr>
    )
}

export default Cita
