import Alerta from "../components/Alerta";
import useDias from "../hooks/useDias";
import ModalDiaEspecial from "../components/ModalDiaEspecial";
import { Link } from "react-router-dom";
import DiaEspecial from "../components/DiaEspecial";


const DiasEspeciales = () => {
    const {alerta, dias, setModal, modal, dia} = useDias();
    
    const handleClose=()=>{
        setModal(false);
    }
    const {msg}=alerta;
    return (
        <>
            <div className='container w-full bg-slate-200 flex flex-col items-center rounded-md shadow-md'>
                {msg && <Alerta alerta={alerta}/>}
                <h1 className='font-bold text-4xl uppercase p-2'>Dias Especiales</h1>
                <div className='overflow'>
                    <div className="mt-5 flex w-full justify-end mr-16">
                        <Link 
                            to="agregar" 
                            className="bg-indigo-500 w-1/3 mb-3 py-3 px-3 mt-3 text-center text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-indigo-900 transition-colors"
                        >Agregar Dia Especial</Link>
                    </div>
                {dias.length ===0 ? 
                    <h2 className='text-3xl font-semibold pt-20 uppercase h-[45rem]'>No Hay Pacientes Registrados</h2> 
                :(
                    <table className='rounded text-sm text-gray-500 dark:text-gray-400 my-5 table-auto overflow-y-scroll h-[45rem] block w-full'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky z-10 top-0'>
                            <tr className='sticky z-10 top-0'>
                                <th scope='col' className='p-x6 py-3 sticky z-10 top-0'>Fecha</th>
                                <th scope='col' className='p-x6 py-3 sticky z-10 top-0'>Descripcion</th>
                                <th scope='col' className='p-x6 py-3 sticky z-10 top-0'>Acciónes</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {dias.map(dia=>(
                                <DiaEspecial dia={dia} key={dia.idDia}/>
                            ))}        
                        </tbody>
                    </table>)}
                </div>
            </div>
            {modal && <ModalDiaEspecial onClose={handleClose} idDia={dia.idDia}/>}
        </>
    );
}

export default DiasEspeciales
