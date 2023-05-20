import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useCitas from "../hooks/useCitas";
import useDias from "../hooks/useDias";
import useEstudiantes from "../hooks/useEstudiantes";
import usePersonal from "../hooks/usePersonal";
import dayjs from "dayjs";
import Alerta from "../components/Alerta";

const AgendarCitaAdmin = () => {
    const [motivo, setMotivo] = useState("Orientación Psicologica");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [paciente, setPaciente] = useState(0);
    const [tipoUsuario, setTipoUsuario] = useState("");
    const [pacienteText, setPacienteText] = useState("");
    const [turno, setTurno] = useState("");
    const [isValid, setIsValid] = useState(false);

    const {agendarCitaAdmin, alerta, mostrarAlerta} = useCitas();
    const {estudiantes} = useEstudiantes();
    const {personal} = usePersonal();
    const {comprobarDia} = useDias();

    let horasMatutino = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00"];
    let horasVespertino = ["15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

    const handleSubmit = async e=>{
        e.preventDefault();
        const validarFecha = await comprobarDia(fecha);
        if ([hora, fecha, motivo, paciente].includes("")) {
            mostrarAlerta({
                msg: "Llene todos los campos",
                error: true
            });
            setIsValid(true);
        }
        if (!validarFecha.error) {
            await agendarCitaAdmin({
                fechaCita: fecha, 
                horaCita: hora,
                motivo: motivo,
                estudiante: tipoUsuario =="Estudiante" ? true : false,
                idPaciente: paciente,
                turno: turno,
            });
        }else{
            mostrarAlerta({
                msg: validarFecha.mensaje,
                error: true
            });
            setIsValid(true);
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
            setIsValid(true);
        }
        else if (fechaState.getDay() ===5 || fechaState.getDay() ===6) {
            mostrarAlerta({
                msg: "La cita no puede ser fin de semana",
                error: true
            });
            setIsValid(true);
        }
        else{
            setIsValid(false)
        }

    }, [fecha]);

    useEffect(() => {
        if (pacienteText!="") {
            const array = pacienteText.split("/");
            let idPaciente = array[0];
            let tipoUsuario = array[1];
            let turno = array[2];
            setIsValid(false);
            setTurno(turno);
            setTipoUsuario(tipoUsuario);
            setPaciente(parseInt(idPaciente));
        }
    }, [pacienteText]);


    return (
        <div className="container w-full">
            <h1 className="text-indigo-500 font-black text-5xl text-center">Agendar Cita</h1>
            <div className="flex justify-center">
                <form onSubmit={handleSubmit} className="my-10 bg-slate-500 shadow rounded-lg p-10 w-2/3">
                    {msg && <Alerta alerta={alerta}/>}

                    <div className="my-5">
                        <label htmlFor="paciente" className="text-gray-800 uppercase block text-xl font-bold">Paciente</label>
                        <select 
                            id="paciente"
                            className="w-full mt-3 p-3 boder rounded-xl bg-gray-50 placeholder:text-slate-700"
                            value={pacienteText}
                            onChange={e=>setPacienteText(e.target.value)}
                        >
                            <option value="" disabled>--Seleccione Paciente--</option>
                            {estudiantes.map(estudiante => (
                                <option value={estudiante.numeroControl+ "/"+ estudiante.tipoUsuario + "/"+ estudiante.turno}>{estudiante.nombre +" "+ estudiante.apellidoP + " "+ estudiante.apellidoM}</option>
                            ))}
                            {personal.map(persona => (
                                <option value={persona.idPersonal+"/"+persona.tipoUsuario + "/"+ persona.turno}>{persona.nombre +" "+ persona.apellidoP + " "+ persona.apellidoM}</option>
                            ))}
                        </select>
                    </div>
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
                            {turno ==="Matutino" && horasMatutino.map((hora, index) =>(
                                <option key={index} value={hora}>{hora}</option>
                            ))}
                            {turno ==="Vespertino" && horasVespertino.map((hora, index)=>(
                                <option key={index} value={hora}>{hora}</option>
                            ))}
                        </select>
                    </div>
                    <div className="my-5">
                        <label htmlFor="motivo" className="text-gray-800 uppercase block text-xl font-bold">Motivo de Cita</label>
                        <select
                            id="motivo"
                            value={motivo}
                            onChange={e=>setMotivo(e.target.value)}
                            className="w-full mt-3 p-3 boder rounded-xl bg-gray-50 placeholder:text-slate-700"
                        >   
                            <option value="" disabled>--Seleccione Motivo--</option>
                            <option value="Orientación Psicologica">Orientación Psicologica</option>
                            {tipoUsuario ==="Estudiante" && 
                                <option value="Cambio de Carrera">Cambio de Carrera</option>
                            }
                        </select>
                    </div>
                    <input 
                        type="submit" 
                        value="Agendar"
                        className="bg-indigo-500 w-full mb-3 py-3 mt-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-indigo-900 transition-colors"
                        disabled={isValid}
                    />
                </form>
            </div>
        </div>
    )
}

export default AgendarCitaAdmin
