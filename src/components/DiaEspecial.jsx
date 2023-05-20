import DropdownDia from "./DropdownDia"
import { formatearFecha } from "../helpers/formatearFecha"
const DiaEspecial = ({dia}) => {
    return (
        <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
            <td scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{formatearFecha(dia.fechaDia)}</td>
            <td scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{dia.descripcion}</td>
            <td scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{
                <DropdownDia 
                    key={dia.idDia}
                    idDia={dia.idDia}
                />}
            </td>
        </tr>
    )
}

export default DiaEspecial
