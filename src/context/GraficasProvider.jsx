import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";

const GraficasContext = createContext();

const GraficasProvider = ({children})=>{
    const [tipoGrafica, setTipoGrafica] = useState("");
    const [carreraG, setCarreraG] = useState(0);
    const [tiempoPeriodo, setTiempoPeriodo] = useState("");
    const [alerta, setAlerta] = useState({});
    const [sexoG, setSexoG] = useState("");
    const [citas, setCitas] = useState([]);
    const [labels, setLabels] = useState([]);
    const [cargando, setCargando] = useState(false);

    const obtenerCitasCarrera= async()=>{
        setCargando(true);
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const {data} = await clienteAxios.post(`/citas/estaditicas/${carreraG}`, {periodoTiempo: tiempoPeriodo}, config);
            setCitas(data.citas);
            setLabels(data.labels);
        } catch (error) {
            console.log("🚀 ~ file: GraficasProvider.jsx:31 ~ obtenerCitasCarrera ~ error:", error)
        }
        finally{
            setCargando(false);
        }
    }

    const obtenerCitasSexo =async()=>{
        setCargando(true);
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const {data} = await clienteAxios.post(`/citas/estaditicas/sexo/${sexoG}`, {periodoTiempo: tiempoPeriodo}, config);
            setCitas(data.citas);
            setLabels(data.labels);
        } catch (error) {
            console.log("🚀 ~ file: GraficasProvider.jsx:31 ~ obtenerCitasCarrera ~ error:", error)
        }
        finally{
            setCargando(false);
        }
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
                obtenerCitasCarrera,
                obtenerCitasSexo,
                setSexoG, 
                sexoG,
                citas,
                labels,
                cargando
            }}

        >{children}</GraficasContext.Provider>
    );
}

export {
    GraficasProvider
}

export default GraficasContext;