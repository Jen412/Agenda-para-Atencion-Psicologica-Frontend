import { useEffect, useState } from "react";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";
import useCitas from "../hooks/useCitas";
import useDias from "../hooks/useDias";
import dayjs from "dayjs";

const AgendarCita = () => {
    const [motivo, setMotivo] = useState("Orientación Psicologica");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    
    const {auth} = useAuth();
    const {agregarCita, alerta, mostrarAlerta} = useCitas();
    const {comprobarDia} = useDias();

    let horasMatutino = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00"];
    let horasVespertino = ["15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

    const handleSubmit = async e=>{
        e.preventDefault();
        const validarFecha = await comprobarDia(fecha);
        if (!validarFecha.error) {
            await agregarCita({
                fechaCita: fecha, 
                horaCita: hora,
                motivo: motivo 
            },auth);
        }else{
            mostrarAlerta({
                msg: validarFecha.mensaje,
                error: true
            });
        }
    }
    const {msg} = alerta

    useEffect(() => {
        const fechaA = dayjs(new Date(Date.now()));
        const fechaS = dayjs(fecha);
        const fechaState = new Date(fecha);
        if (fechaS.$D <= fechaA.$D && fecha !=="") {
            mostrarAlerta({
                msg: "La fecha debe de ser mayor que la actual",
                error: true
            });
        }
        else if (fechaState.getDay() ===5 || fechaState.getDay() ===6) {
            mostrarAlerta({
                msg: "La cita no puede ser fin de semana",
                error: true
            });
        }


    }, [fecha]);


    return (
        <div className="container w-full">
            <h1 className="text-indigo-500 font-black text-5xl text-center">Agenda tu Cita</h1>
            <div className="flex justify-center">
                <form onSubmit={handleSubmit} className="my-10 bg-slate-500 shadow rounded-lg p-10 w-2/3">
                    {msg && <Alerta alerta={alerta}/>}
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
                        <select 
                            id="hora"
                            className="w-full mt-3 p-3 boder rounded-xl bg-gray-50 placeholder:text-slate-700"
                            value={hora}
                            onChange={e=>setHora(e.target.value)}
                        >
                            <option value="" disabled>--Seleccione Hora--</option>
                            {auth.turno ==="Matutino" && horasMatutino.map((hora, index) =>(
                                <option key={index} value={hora}>{hora}</option>
                            ))}
                            {auth.turno ==="Vespertino" && horasVespertino.map((hora, index)=>(
                                <option key={index} value={hora}>{hora}</option>
                            ))}
                        </select>
                    </div>
                    {/* <div className="my-5">
                        <label htmlFor="hora" className="text-gray-800 uppercase block text-xl font-bold">Hora de cita</label>
                        <input 
                            type="time" 
                            id="hora"
                            className="w-full mt-3 p-3 boder rounded-xl bg-gray-50 placeholder:text-slate-700"
                            value={hora}
                            onChange={e=>setHora(e.target.value)}
                        />
                    </div> */}
                    <div className="my-5">
                        <label htmlFor="motivo" className="text-gray-800 uppercase block text-xl font-bold">Motivo de Cita</label>
                        <select
                            id="motivo"
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
        </div>
    )
}

export default AgendarCita
