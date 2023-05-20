import {AiOutlineClose} from "react-icons/ai" 
import useCarreras from "../hooks/useCarreras";

const ModalEliminarCarrera = ({onClose, idCarrera}) => {
    const {eliminarCarrera} = useCarreras();
    const handleClick = async()=>{
        await eliminarCarrera(idCarrera);
        setTimeout(() => {
            onClose();
        }, 250);
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white p-8 rounded w-80">
                <div className="flex justify-end">
                    <button 
                        className="rounded-lg bg-red-600 h-7 w-7 text-white font-black flex justify-center items-center border-black shadow-md border-opacity-70 border-2 text-xl hover:bg-red-800 transition-colors" 
                        onClick={onClose}
                    ><AiOutlineClose /></button>
                </div>
                
                <h2 className="font-bold mt-4">¿Desea Eliminar la Carrera?</h2>
                <div className="mt-4 flex gap-5 w-full">
                    <button onClick={onClose} className="bg-red-500 w-full mb-3 py-3 mt-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-red-900 transition-colors">Cancelar</button>
                    <button className="bg-green-500 w-full mb-3 py-3 mt-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-green-900 transition-colors" onClick={handleClick}>Aceptar</button>
                </div>
            </div>
        </div>
    )
}

export default ModalEliminarCarrera
