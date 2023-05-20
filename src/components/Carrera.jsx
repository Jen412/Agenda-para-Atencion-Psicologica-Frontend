import React from 'react'
import DropdownCarreras from './DropdownCarreras'

const Carrera = ({carrera}) => {
    return (
        <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
            <td scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{carrera.nombreCarrera}</td>
            <td scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{
                <DropdownCarreras 
                    key={carrera.idCarrera} 
                    idCarrera={carrera.idCarrera}
            />}</td>
        </tr>
    )
}

export default Carrera
