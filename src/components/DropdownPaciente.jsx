import { useState } from "react";
import {AiOutlineCaretUp, AiOutlineCaretDown} from "react-icons/ai"
import { Link } from "react-router-dom";
import useCitas from "../hooks/useCitas";

const DrowdownPaciente = ({idPaciente}) => {
    const [isOpen, setIsOpen] = useState(false);
    const {setModal, obtenerCita} = useCitas();
    const handleClick = async ()=>{
        await obtenerCita(idPaciente);
        setModal(true);
    }

     return (
        <div className="relative flex flex-col items-center justify-start w-[340px] h-48 rounded-lg">
            <button 
                type="button"
                onClick={() => setIsOpen((prev)=> !prev)}
                className="bg-indigo-600 p-4 w-full flex irems-center justify-between font-bold text-lg rounded-lg -tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white"
            >   Acciones 
                {!isOpen ? <AiOutlineCaretDown className="hh-8"/> : <AiOutlineCaretUp className="h-8"/>}
                {isOpen && (
                    <div className="bg-indigo-600 absolute top-12 left-0 flex flex-col items-start rounded-lg p-2 w-full">
                        <div className="flex w-full hover:bg-indigo-800 rounded-r-lg border-l-transparent cursor-pointer hover:border-l-white border-l-4">
                            <Link className="font-semibold p-1 w-full text-left" to={`/user/observaciones-paciente/${idPaciente}`}>Expediente</Link>
                        </div>
                    </div>
                )}
            </button>
        </div>
    )
}

export default DrowdownPaciente
