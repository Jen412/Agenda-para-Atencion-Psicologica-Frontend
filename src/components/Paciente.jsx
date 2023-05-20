import useEstudiantes from "../hooks/useEstudiantes";
import usePersonal from "../hooks/usePersonal";
import useCitas from "../hooks/useCitas";
import { useEffect, useState } from "react";
import DrowdownPaciente from "./DropdownPaciente";

const Paciente = ({paciente}) => {
    const {estudiantes} = useEstudiantes();
    const {personal} = usePersonal();
    const {numCitas} = useCitas();
    const [nCitas, setNCitas] = useState(0);
    const idPaciente= paciente.numeroControl ? paciente.numeroControl : paciente.idPersonal;

    useEffect(() => {
        let numero=0;
        const obtenerCitas=async ()=>{
            if (paciente.tipoUsuario ==="Estudiante") {
                numero = await numCitas(paciente.numeroControl);
            }
            else if(paciente.tipoUsuario==="Personal"){
                numero = await  numCitas(paciente.idPersonal);
            }
            setNCitas(numero);
        }
        return () => {obtenerCitas()};
    }, []);

    return (
        <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
            <td scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{paciente.nombre}</td>
            <td scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{paciente.apellidoP + " " +paciente.apellidoM}</td>
            <td scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{nCitas}</td>
            <td scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{paciente.sexo}</td>
            <td scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{paciente.tipoUsuario}</td>
            <td scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{
                <DrowdownPaciente 
                    key={idPaciente}
                    idPaciente={idPaciente}
                />}
            </td>
        </tr>
    )
}

export default Paciente
