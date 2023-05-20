import { useEffect, useState } from "react";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";
import useCitas from "../hooks/useCitas";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import FormReagendarCita from "../components/FormReagendarCita";

const ModificarCita = () => {
    const params = useParams();

    const {obtenerCita, cargando} = useCitas();

    useEffect(() => {
        obtenerCita(params.idCita);
    }, []);


    if (cargando) {
        return <Spinner/>
    }
    return (
        <div className="container w-full">
            <h1 className="text-indigo-500 font-black text-5xl text-center">Reagendar Cita</h1>
            <div className="flex justify-center">
                <FormReagendarCita/>
            </div>
        </div>
    )
}

export default ModificarCita
