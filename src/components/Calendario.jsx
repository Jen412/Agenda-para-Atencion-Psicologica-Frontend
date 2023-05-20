import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { generateDate, months } from "../helpers/calendar";
import {GrFormNext, GrFormPrevious} from "react-icons/gr"
import dayjs from "dayjs";
import cn from "../helpers/cn";
import useAuth from "../hooks/useAuth";
import useCitas from "../hooks/useCitas";
import Alerta from "./Alerta";

const Calendario = ({citas}) => {
    const days= ["D", "L", "M", "M", "J","V", "S"];
    const currentDate = dayjs();
    const [today, setToday] = useState(currentDate);
    const [selectDate, setSelectDate] = useState(currentDate);
    const {auth} = useAuth();
    const [citaText, setCitaText] = useState("No Hay Citas");
    const [motivo, setMotivo] = useState("");
    const [cancelada, setCancelada] = useState("");
    const [boton, setBoton] = useState(false);
    const [id, setId] = useState(0);

    const { obtenerCita, setModal, alerta} = useCitas();

    const comprobarCita = (date) =>{
        let resultado= false;
        citas.map(cita => {
            if (cita.idPaciente === auth.numeroControl || cita.idPaciente === auth.idPersonal) {
                let fechaState = dayjs(cita.fechaCita);
                if (fechaState.date()+1 == date.date() && fechaState.month() == date.month()) {
                    resultado = true;
                }
            }
        });
        return resultado;
    }

    const comprobarCitaCancelada  = (date) =>{
        let resultado  = false;
        citas.map(cita => {
            if (cita.idPaciente === auth.numeroControl || cita.idPaciente === auth.idPersonal) {
                let fechaState = dayjs(cita.fechaCita);
                if (fechaState.date()+1 == date.date() && fechaState.month() == date.month()) {
                    if (cita.fechaCancelacion != null) {
                        resultado = true;
                    }
                }
            }
        });
        return resultado;
    }
    const comprobarCitaProcesada  = date =>{
        let resultado = false;
            citas.map(cita => {
            if (cita.idPaciente === auth.numeroControl || cita.idPaciente === auth.idPersonal) {
                let fechaState = dayjs(cita.fechaCita);
                if (fechaState.date()+1 == date.date() && fechaState.month() == date.month()) {
                    if (cita.procesada) {
                        resultado = true;
                    }
                }
            }
        });
        return resultado;
    }

    const handleClick = async (e) =>{
        e.preventDefault();
        await obtenerCita(id);
        setModal(true);
    }

    const {msg}= alerta;
    return (
        <>
            {msg && <Alerta alerta={alerta}/>}     
            <div className="flex w-2/3 pb-5 xl:pb-60 mx-auto gap-10  justify-center">
                <div className="bg-white rounded-xl p-10 w-1/3">
                    <h2 className="font-bold text-lg mb-5">Simbologia</h2>
                    <ol>
                        <li className="flex gap-2 mb-3">
                            <div className="p-3 bg-red-600 w-1 rounded-md"></div>
                            <p className="font-semibold text-lg">Cita Cancelada</p>
                        </li>
                        <li className="flex gap-2 mb-3">
                            <div className="p-3 bg-green-600 w-1 rounded-md"></div>
                            <p className="font-semibold text-lg">Fecha Actual</p>
                        </li>
                        <li className="flex gap-2 mb-3">
                            <div className="p-3 bg-black w-1 rounded-md"></div>
                            <p className="font-semibold text-lg">Fecha Seleccionada</p>
                        </li>
                        <li className="flex gap-2 mb-3">
                            <div className="p-3 bg-blue-600 w-1 rounded-md"></div>
                            <p className="font-semibold text-lg">Cita Proxima</p>
                        </li>
                        <li className="flex gap-2 mb-3">
                            <div className="p-3 bg-orange-600 w-1 rounded-md"></div>
                            <p className="font-semibold text-lg">Citas Anteriores</p>
                        </li>
                    </ol>
                </div>
                <div className="w-96 bg-white rounded-md px-3 pt-3">
                    <div className="flex justify-between">
                        <h1 className="font-bold">{months[today.month()]}, {today.year()}</h1>
                        <div className="flex items-center gap-5">
                            <GrFormPrevious className="w-5 h-5 cursor-pointer" onClick={()=>{
                                setToday(today.month(today.month()-1));
                            }}/>
                            <h1 className="cursor-pointer" onClick={()=>{
                                setToday(currentDate);
                            }}>Hoy</h1>
                            <GrFormNext className="w-5 h-5 cursor-pointer" onClick={()=>{
                                setToday(today.month(today.month()+1));
                            }}/>
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-7 text-gray-500">
                        {days.map((day, index)=>{
                            return (
                                <h1 key={index} className="h-14 grid place-content-center text-sm">{day}</h1>
                            );
                        })}
                    </div>
                    <div className="w-full grid grid-cols-7">
                        {generateDate(today.month(), today.year()).map(({date, currentMonth, today}, index)=>{
                            return(
                            <div key={index} className="h-14 border-t grid place-content-center text-sm">
                                <h1 className={cn(
                                    currentMonth? "" : "text-gray-400",
                                    today ? "bg-green-600 text-white rounded-full": "",
                                    comprobarCita(date) ? "bg-blue-800 text-white" : "",
                                    comprobarCitaCancelada(date) ? "bg-red-600 text-white" : "",
                                    comprobarCitaProcesada(date) ? "bg-orange-600 text-white": "",
                                    "h-10 w-10 grid place-content-center hover:bg-black hover:text-white rounded-full transition-all cursor-pointer",
                                    selectDate.toDate().toDateString() === date.toDate().toDateString()? "bg-black text-white": ""    
                                )} 
                                onClick={async ()=>{
                                    setSelectDate(date);
                                    let selected =false;
                                    citas.map(cita => {
                                        if (cita.idPaciente === auth.numeroControl || cita.idPaciente === auth.idPersonal) {
                                            let fechaState = dayjs(cita.fechaCita);
                                            if (fechaState.date()+1 == date.date() && fechaState.month() == date.month()) {
                                                setCitaText(`Cita: ${cita.horaCita}`);
                                                selected = true;
                                                if(cita.procesada){
                                                    setBoton(false);
                                                    setMotivo(`Motivo: ${cita.motivo}`);
                                                    setCancelada("");
                                                }
                                                else if (cita.fechaCancelacion== null) {
                                                    setMotivo(`Motivo: ${cita.motivo}`);
                                                    setBoton(true);
                                                    setId(cita.idCita);
                                                }
                                                else if(cita.fechaCancelacion !=null){
                                                    setCancelada("Cita Cancelada");
                                                    setMotivo("");
                                                    setBoton(false);
                                                }
                                            }
                                            if (!selected){
                                                setCitaText("No Hay Citas");
                                                setCancelada("");
                                                setMotivo("");
                                                setBoton(false);
                                                setId(0);
                                            }
                                        }
                                    })
                                }}>{date.date()}</h1>
                            </div>);
                        })}
                    </div>
                </div>
                <div className="h-96 w-80 px-5">
                    <div className="mb-10">
                        <h1 className="font-semibold">Citas para {selectDate.toDate().toDateString()}</h1>
                        <p>{citaText}</p>
                        <p>{motivo}</p>
                        <p>{cancelada}</p>
                    </div>
                    <Link 
                        className="bg-indigo-500 w-full mb-3 py-3 px-3 mt-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-indigo-900 transition-colors"
                        to="agendar"
                    >Agregar Cita</Link>
                    {boton &&
                        <button 
                            type="button"
                            className="bg-red-500 w-full mb-3 py-3 px-3 mt-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-red-900 transition-colors"
                            onClick={handleClick}
                        >Cancelar Cita</button>}
                </div>
                <div>
                    
                </div>
            </div>
        </>
        
    )
}

export default Calendario
