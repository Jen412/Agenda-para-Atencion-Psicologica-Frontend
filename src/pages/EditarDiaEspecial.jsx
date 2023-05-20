import { useEffect } from "react";
import { useParams } from "react-router-dom";
import FormDiaEspecial from "../components/FormDiaEspecial";
import Spinner from "../components/Spinner";
import useDias from "../hooks/useDias";

const EditarDiaEspecial = () => {
    const {idDia} =useParams();
    const {obtenerDia, cargando} = useDias();
    
    useEffect(() => {
        obtenerDia(idDia);
    }, []);

    if (cargando) {
        return <Spinner/>;
    } 

    return (
        <div className="container w-1/3">
            <h1 className="text-indigo-500 font-black text-5xl text-center">Editar Dia Especial</h1>
            <FormDiaEspecial/>
        </div>
    )
}

export default EditarDiaEspecial
