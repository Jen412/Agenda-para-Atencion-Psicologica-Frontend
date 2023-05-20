import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Alerta from "../components/Alerta"
import useAuth from "../hooks/useAuth"

const RegistrarHorario = () => {
    const [dia, setDia] = useState("");
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFin, setHoraFin] = useState("");
    const [isValid, setIsValid] = useState(false);
    const {idUsuario} = useParams();
    const {alerta,setAlerta, usuarioM, usuarioV, agregarHorario} = useAuth();
    
    useEffect(() => {
        let horaI = horaInicio.split(":");
        horaI = parseInt(horaI[0]);
        let horaF = horaFin.split(":");
        horaF = parseInt(horaF[0]);
        if (horaF < horaI && horaF != NaN) {
            setAlerta({
                msg: "La Hora Final no puede ser menor a la hora inicial",
                error: true
            });
            setIsValid(true); 
        }
        else if (horaInicio === horaFin && horaInicio !="") {
            setAlerta({
                msg: "La Hora inicial no puede ser la misma que la hora final",
                error: true
            });
            setIsValid(true);
        }
        else{
            setAlerta({});
            setIsValid(false);
        }
    }, [horaFin]);

    useEffect(() => {
        if (horaInicio === horaFin && horaInicio !="") {
            setAlerta({
                msg: "La Hora de Final no puede ser la misma que la hora Inicial",
                error: true
            });
            setIsValid(true);
        }
        else{
            setAlerta({});
            setIsValid(false);
        }
    }, [horaInicio]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        await agregarHorario({
            diaSemana: dia,
            horaEntrada: horaInicio,
            horaSalida: horaFin,
            idUsuario: parseInt(idUsuario)
        });
    }
    
    const horasMatutinas= ["8:00","9:00","10:00","11:00","12:00","13:00","14:00"];
    const horasVespertinas= ["15:00","16:00","17:00","18:00","19:00","20:00","21:00"];
    
    const {msg} = alerta;
    return (
        <div className="container w-1/3">
        <h1 className="text-indigo-500 font-black text-5xl text-center">Registrar Horario</h1>
            <form onSubmit={handleSubmit} className="my-10 bg-slate-500 shadow rounded-lg p-10">
            {msg && <Alerta alerta={alerta}/>}
                <div className="my-5">
                    <label htmlFor="dia" className="text-gray-800 uppercase block text-xl font-bold">Dia</label>
                    <select 
                        id="dia"
                        className="w-full mt-3 p-3 boder rounded-xl bg-gray-50 placeholder:text-slate-700"
                        value={dia}
                        onChange={e=>setDia(e.target.value)}
                    >
                        <option disabled value="">--Selecione dia--</option>
                        <option value="lunes">Lunes</option>
                        <option value="martes">Martes</option>
                        <option value="miercoles">Miercoles</option>
                        <option value="jueves">Jueves</option>
                        <option value="viernes">Viernes</option>
                    </select>
                </div>
                <div className="my-5">
                    <label htmlFor="horaI" className="text-gray-800 uppercase block text-xl font-bold">Hora Inicio</label>
                    <select 
                        id="horaI"
                        className="w-full mt-3 p-3 boder rounded-xl bg-gray-50 placeholder:text-slate-700"
                        value={horaInicio}
                        onChange={e=>setHoraInicio(e.target.value)}
                    >
                        <option value="">--Seleccione Hora Inicio--</option>
                        {idUsuario == usuarioM.idUsuario && (
                            horasMatutinas.map((hora)=>(
                                <option key={hora} value={hora}>{hora}</option>
                            ))
                        )}
                        {idUsuario == usuarioV.idUsuario && (
                            horasVespertinas.map(hora=>(
                                <option key={hora} value={hora}>{hora}</option>
                            ))
                        )}
                    </select>
                </div>           
                            
                <div className="my-5">
                    <label htmlFor="horaI" className="text-gray-800 uppercase block text-xl font-bold">Hora Inicio</label>
                    <select 
                        id="horaI"
                        className="w-full mt-3 p-3 boder rounded-xl bg-gray-50 placeholder:text-slate-700"
                        value={horaFin}
                        onChange={e=>setHoraFin(e.target.value)}
                    >
                        <option value="">--Seleccione Hora Fin--</option>
                        {idUsuario == usuarioM.idUsuario && (
                            horasMatutinas.map(hora=>(
                                <option key={hora} value={hora}>{hora}</option>
                            ))
                        )}
                        {idUsuario == usuarioV.idUsuario && (
                            horasVespertinas.map(hora=>(
                                <option key={hora} value={hora}>{hora}</option>
                            ))
                        )}

                    </select>
                </div>
                <input 
                    type="submit" 
                    value="Registrar Horario"
                    className="bg-indigo-500 w-full mb-3 py-3 mt-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-indigo-900 transition-colors"
                    disabled={isValid}
                />
            </form>
        </div>
    )
}

export default RegistrarHorario
