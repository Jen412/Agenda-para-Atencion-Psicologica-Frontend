import { useEffect, useState } from "react";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";
import useCitas from "../hooks/useCitas";
import { useParams } from "react-router-dom";


const FormReagendarCita = () => {
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const params = useParams();

    const {modificarCita, alerta, mostrarAlerta, cita, obtenerCitaProxima} = useCitas();

    useEffect(() => {
        if (params.idCita) {
            let fechaCitaState = cita?.fechaCita
            if (fechaCitaState) {
                fechaCitaState= fechaCitaState.split("T")[0];
                setFecha(fechaCitaState);
                setHora(cita?.horaCita);
            }
        }
    }, [params]);


    const handleSubmit = async e=>{
        e.preventDefault();
        await modificarCita({
            fechaCita: fecha, 
            horaCita: hora,
            motivo: cita?.motivo 
        },auth);
    }

    useEffect(() => {
        const fechaActual = new Date((Date.now()));
        const fechaState = new Date(fecha);
        if (fechaState < fechaActual && fecha !=="") {
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
    const {msg} = alerta

    return (
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
                <input 
                    type="time" 
                    id="hora"
                    className="w-full mt-3 p-3 boder rounded-xl bg-gray-50 placeholder:text-slate-700"
                    value={hora}
                    onChange={e=>setHora(e.target.value)}
                />
            </div>
            <input 
                type="submit" 
                value="Guardar Cambios"
                className="bg-indigo-500 w-full mb-3 py-3 mt-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-indigo-900 transition-colors"
            />
        </form>
    )
}

export default FormReagendarCita
