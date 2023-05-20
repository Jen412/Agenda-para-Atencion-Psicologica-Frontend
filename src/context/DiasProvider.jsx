import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';

const DiasContext= createContext();

const DiasProvider = ({children})=>{
    const [dias, setDias] = useState([]);
    const [dia, setDia] = useState({});
    const [alerta, setAlerta] = useState({});
    const [cargando, setCargando] = useState(false);
    const [modal, setModal] = useState(false);

    const navigate= useNavigate();

    useEffect(() => {
        const obtenerDias = async () =>{
            try {
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
                const {data} = await clienteAxios("/dias-especiales", config);
                setDias(data);
            } catch (error) {
                console.log("🚀 ~ file: DiasProvider.jsx:32 ~ obtenerDias ~ error:", error)
            }
        }
        return ()=> {obtenerDias()};    
    }, []);

    const agregarDia = async (dia) =>{
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
            const {data} = await clienteAxios.post("/dias-especiales",dia, config);
            setDias([...dias, data]);
            setAlerta({
                msg: "Dia Especial Registrado Correctamente",
                error: false
            });
            setTimeout(() => {
                setAlerta({});
                navigate("/admin/dias-especiales");
                setDia({});
            }, 3000);
        } catch (error) {
            console.log("🚀 ~ file: DiasProvider.jsx:62 ~ agregarDia ~ error:", error)
        }
    }

    const modificarDia = async (dia) =>{
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
            const {data} = await clienteAxios.put(`/dias-especiales/${dia.idDia}`, dia ,config);
            const diasActualizados = dias.map(diaState=> data.idDia === diaState.idDia ? data : diaState);
            setDias(diasActualizados);
            setAlerta({
                msg: "Dia Especial Modificado Correctamente",
                error: false
            });
            setTimeout(() => {
                setAlerta({});
                navigate("/admin/dias-especiales");
                setDia({});
            }, 3000);
        } catch (error) {
            console.log("🚀 ~ file: DiasProvider.jsx:91 ~ modificarDia ~ error:", error)
        }
    }

    const eliminarDia = async idDia =>{
        const token = localStorage.getItem("token");
        if (!token) {
            setCargando(false);
            return;
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const {data} = await clienteAxios.delete(`/dias-especiales/${idDia}`, config);
            const diasActualizados = dias.filter(dia => dia.idDia !== idDia);
            setDias(diasActualizados);
            setAlerta({
                msg: data.mensaje, 
                error:true
            });
            setTimeout(() => {
                setAlerta({});
                navigate("/admin/dias-especiales");
            }, 3000);
        } catch (error) {
            console.log("🚀 ~ file: DiasProvider.jsx:120 ~ eliminarDia ~ error:", error)
        }
    }

    const obtenerDia = async idDia =>{
        setCargando(true);
        const token = localStorage.getItem("token");
        if (!token) {
            setCargando(false);
            return;
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const {data} = await clienteAxios(`/dias-especiales/${idDia}`, config);
            setDia(data);
        } catch (error) {
            console.log("🚀 ~ file: DiasProvider.jsx:141 ~ obtenerDia ~ error:", error)
        }
        finally{
            setCargando(false);
        }
    }

    const comprobarDia = async fecha =>{
        const token = localStorage.getItem("token");
        if (!token) {
            setCargando(false);
            return;
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const {data} =await clienteAxios.post("/dias-especiales/comprobar", {fecha:fecha}, config)
            return data;
        } catch (error) {
            console.log("🚀 ~ file: DiasProvider.jsx:164 ~ comprobarDia ~ error:", error)
        }
    }
    

    return (
        <DiasContext.Provider
            value={{
                agregarDia, 
                modificarDia,
                eliminarDia,
                obtenerDia,
                dias, 
                dia,
                alerta, 
                setAlerta,
                cargando,
                modal,
                setModal,
                comprobarDia
            }}
        >{children}</DiasContext.Provider>
    );
}



export {
    DiasProvider
}

export default DiasContext