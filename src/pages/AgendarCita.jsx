import { useState } from "react";
import useAuth from "../hooks/useAuth";

const AgendarCita = () => {
    const [motivo, setMotivo] = useState("Orientación Psicologica");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("12:00");

    const {auth} = useAuth();

    const handleSubmit = async e=>{
        e.preventDefault();
    }

    return (
        <>
            <h1 className="text-indigo-500 font-black text-5xl text-center">Agenda tu Cita</h1>
            <div className="flex justify-center">
                <form onSubmit={handleSubmit} className="my-10 bg-slate-500 shadow rounded-lg p-10 w-2/3">
                    <div className="my-5">
                        <label htmlFor="fecha" className="text-gray-800 uppercase block text-xl font-bold">Fecha de Cita</label>
                        <input 
                            type="date" 
                            id="fecha"
                            placeholder="" 
                            className="w-full mt-3 p-3 boder rounded-xl bg-gray-50 placeholder:text-slate-700"
                            value={fecha}
                            onChange={e=>setFecha(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label htmlFor="hora" className="text-gray-800 uppercase block text-xl font-bold">Hora de cita</label>
                        <input 
                            type="time" 
                            id="hora"
                            className="w-full mt-3 p-3 boder rounded-xl bg-gray-50 placeholder:text-slate-700"
                            value={hora}
                            onChange={e=>setHora(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label htmlFor="email" className="text-gray-800 uppercase block text-xl font-bold">Motivo de Cita</label>
                        <select
                            id=""
                            value={motivo}
                            onChange={e=>setMotivo(e.target.value)}
                            className="w-full mt-3 p-3 boder rounded-xl bg-gray-50 placeholder:text-slate-700"
                        >   
                            <option value="Orientación Psicologica">Orientación Psicologica</option>
                            {auth.tipoUsuario ==="Estudiante" && 
                                <option value="Cambio de Carrera">Cambio de Carrera</option>
                            }
                        </select>
                    </div>
                    <input 
                        type="submit" 
                        value="Agendar"
                        className="bg-indigo-500 w-full mb-3 py-3 mt-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-indigo-900 transition-colors"
                    />
                </form>
            </div>
        </>
    )
}

export default AgendarCita
