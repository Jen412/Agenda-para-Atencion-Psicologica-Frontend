import { Link } from "react-router-dom";
import Carrera from "../components/Carrera";
import ModalEliminarCarrera from "../components/ModalEliminarCarrera";
import useCarreras from "../hooks/useCarreras"
import Alerta from "../components/Alerta";

const Carreras = () => {
    const {carreras, modal,setModal, alerta, carrera} = useCarreras();

    const handleClose = ()=>{
        setModal(false);
    }
    const {msg} = alerta;
    return (
        <>
            <div className="container w-full bg-slate-200 flex flex-col items-center rounded-md shadow-md">
                {msg && <Alerta alerta={alerta}/>}
                <h1 className='font-bold text-4xl uppercase p-2 mt-3'>Carreras</h1>
                <Link 
                    className="text-center bg-indigo-500 w-1/6 mb-3 py-3 px-3 mt-3 mr-6 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-indigo-900 transition-colors place-self-end"
                    to="agregar"
                >Agregar Carrera</Link>
                {carreras.length ===0 ? 
                    <h2 className="text-3xl font-semibold pt-20 uppercase h-[45rem]">No Hay Carreras Registradas</h2>
                : (
                <table className='w-1/3 rounded text-sm text-gray-500 dark:text-gray-400 my-5 h-96'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                        <tr>
                            <th scope='col' className='p-x6 py-3'>Carrera</th>
                            <th scope='col' className='p-x6 py-3'>Acciónes</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {carreras.map(carrera =>(
                            <Carrera carrera={carrera} key={carrera.idCarrera}/> 
                        ))}
                    </tbody>
                </table>)}
                
            </div>

            {modal && <ModalEliminarCarrera onClose = {handleClose} idCarrera={carrera.idCarrera}/>}
        </>
    )
}

export default Carreras
