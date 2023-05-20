import useCitas from "../hooks/useCitas";
import useAuth from '../hooks/useAuth';
import Cita from '../components/Cita';
import ModalCancelarCita from '../components/ModalCancelarCita';
import Alerta from '../components/Alerta';

const Citas = () => {
    const {citas, modal, setModal, alerta, cita, comprobarNumCitasCanceladas} = useCitas();
    const {auth} = useAuth();
    const validCitas = comprobarNumCitasCanceladas();
    
    const handleClose = ()=>{
        setModal(false);
    }

    const {msg} = alerta
    return (
        <>
            <div className='container w-full bg-slate-200 flex flex-col items-center rounded-md shadow-md'>
                {msg && <Alerta alerta={alerta}/>}
                <h1 className='font-bold text-4xl uppercase p-2'>Citas</h1>
                <div className='overflow'>
                    {citas.length ===0  || validCitas ===0? 
                    (<h2 className="text-3xl font-semibold pt-20 uppercase h-[45rem]">No Hay Citas Registradas</h2>)
                    :(
                    <table className='rounded text-sm text-gray-500 dark:text-gray-400 my-5 table-auto overflow-y-scroll h-[45rem] block w-full'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky z-10 top-0'>
                            <tr className='sticky z-10 top-0'>
                                <th scope='col' className='p-x6 py-3 sticky z-10 top-0'>Motivo</th>
                                <th scope='col' className='p-x6 py-3 sticky z-10 top-0'>Fecha</th>
                                <th scope='col' className='p-x6 py-3 sticky z-10 top-0'>Paciente</th>
                                <th scope='col' className='p-x6 py-3 sticky z-10 top-0'>Hora</th>
                                <th scope='col' className='p-x6 py-3 sticky z-10 top-0'>Confirmado</th>
                                <th scope='col' className='p-x6 py-3 sticky z-10 top-0'>Acciónes</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {citas.map(cita =>(auth.idUsuario === cita.idUsuario &&cita.fechaCancelacion ==null  && !cita.procesada ? 
                                <Cita cita={cita} key={cita.idCita}/> : ""
                            ))}
                        </tbody>
                    </table>)}
                </div>
            </div>

            {modal && <ModalCancelarCita onClose = {handleClose} idCita={cita.idCita}/>}
        </>
    )
}

export default Citas
