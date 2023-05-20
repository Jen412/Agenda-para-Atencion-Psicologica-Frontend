import {useState} from 'react'
import { useParams } from 'react-router-dom';
import Alerta from '../components/Alerta'
import useCitas from '../hooks/useCitas';

const ProcesarCita = () => {
    const [observaciones, setObservaciones] = useState("");
    const {idCita} = useParams();
    const {alerta,procesarCita} = useCitas();
    
    const handleSubmit = async e=>{
        e.preventDefault();
        await procesarCita(idCita, observaciones);
    }
    
    const {msg} = alerta;
    return (
        <div className="container w-full">
            <h1 className="text-indigo-500 font-black text-5xl text-center">Procesar Cita</h1>
            <div className="flex justify-center">
                <form onSubmit={handleSubmit} className="my-10 bg-slate-500 shadow rounded-lg p-10 w-2/3">
                    {msg && <Alerta alerta={alerta}/>}
                    <div className="my-5">
                        <label htmlFor="observaciones" className="text-gray-800 uppercase block text-xl font-bold">Observaciones de Cita</label>
                        <textarea
                            type="date" 
                            id="observaciones"
                            placeholder="Observaciones de la cita" 
                            className="w-full h-32 mt-3 p-3 boder rounded-xl bg-gray-50 placeholder:text-slate-700 resize-none"
                            value={observaciones}
                            onChange={e=>setObservaciones(e.target.value)}
                        ></textarea>
                    </div>
                    <input 
                        type="submit" 
                        value="Procesar"
                        className="bg-indigo-500 w-full mb-3 py-3 mt-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-indigo-900 transition-colors"
                    />
                </form>
            </div>
        </div>
    )
}

export default ProcesarCita
