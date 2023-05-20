import { formatearFecha } from "../helpers/formatearFecha";

const CitaExpediente = ({cita}) => {
    return (
        <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
            <td scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{cita?.motivo}</td>
            <td scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{formatearFecha(cita.fechaCita)}</td>
            <td scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{cita?.horaCita}</td>
            <td scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white h-32'>{cita?.observaciones}</td>
            <td scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white h-32'>{cita?.fechaCancelacion != null && "Cancelada"}</td>
        </tr>
    )
}

export default CitaExpediente
