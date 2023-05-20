import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const GraficasContext = createContext();

const GraficasProvider = ({children})=>{
    const [tipoGrafica, setTipoGrafica] = useState("");
    const [carreraG, setCarreraG] = useState(0);
    const [tiempoPeriodo, setTiempoPeriodo] = useState("");
    const [alerta, setAlerta] = useState({});
    const [sexoG, setSexoG] = useState("");

    const calcularCitas = ()=>{

    }

    return (
        <GraficasContext.Provider
            value={{
                tipoGrafica, 
                setTipoGrafica,
                carreraG,
                setCarreraG,
                tiempoPeriodo,
                setTiempoPeriodo,
                alerta,
                setAlerta,
                calcularCitas,
                setSexoG, 
                sexoG
            }}

        >{children}</GraficasContext.Provider>
    );
}

export {
    GraficasProvider
}

export default GraficasContext;