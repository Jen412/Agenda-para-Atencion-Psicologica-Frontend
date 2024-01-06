import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';

const CarrerasContext = createContext()

const CarrerasProvider = ({children}) =>{
    const [carreras, setCarreras] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [carrera, setCarrera] = useState({});
    const [cargando, setCargando] = useState(false);
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerCarreras= async ()=>{
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
                const {data} = await clienteAxios("/carreras", config);
                setCarreras(data);
                console.log("🚀 ~ file: CarrerasProvider.jsx:28 ~ obtenerCarreras ~ data:", data)
            } catch (error) {
                console.log("🚀 ~ file: CarrerasProvider.jsx:27 ~ obtenerCarreras ~ error", error)
            }
        }
        return () => {obtenerCarreras()};
    }, []);

    const agregarCarrera = async (carrera) =>{
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
            const {data} = await clienteAxios.post("/carreras", carrera, config);
            setCarreras([...carreras, data]);
            setAlerta({
                msg: "Carrera Registrada Correctamente", 
                error: false
            });
            setTimeout(() => {
                setAlerta({});
                navigate("/admin/carreras");
            }, 1500);
        } catch (error) {
            console.log("🚀 ~ file: CarrerasProvider.jsx:54 ~ agregarCarrera ~ error:", error)
            setAlerta({
                msg: error,
                error: true
            });
            setTimeout(() => {
                setAlerta({});
            }, 1500);
        }
    }

    const obtenerCarrera = async (idCarrera)=>{
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
            const {data} = await clienteAxios(`/carreras/${idCarrera}`, config);   
            setCarrera(data);
        } catch (error) {
            console.log("🚀 ~ file: CarrerasProvider.jsx:81 ~ obtenerCarrera ~ error:", error)
        }
        finally{
            setCargando(false);
        }
    }

    const editarCarrera = async carrera=>{
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
            const {data} = await clienteAxios.put(`/carreras/${carrera.idCarrera}`, carrera, config);
            const carrerasActualizadas = carreras.map(carreraState => carreraState.idCarrera === data.idCarrera ? data: carreraState);
            setCarreras(carrerasActualizadas);
            setAlerta({
                msg: "Carrera Actualizada Correctamente",
                error: false
            });
            setCarrera({});
            setTimeout(() => {
                setAlerta({});
                navigate("/admin/carreras");
            }, 3000);
        } catch (error) {
            console.log("🚀 ~ file: CarrerasProvider.jsx:110 ~ editarCarrera ~ error:", error)
        }
    }

    const eliminarCarrera = async idCarrera =>{
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
            const {data} = await clienteAxios.delete(`/carreras/${idCarrera}`, config);
            setCarrera({});
            const carrerasActualizadas = carreras.filter(carrera => carrera.idCarrera !== idCarrera);
            setCarreras(carrerasActualizadas);
            setAlerta({
                msg: data.msg, 
                error:true
            });
            setTimeout(() => {
                setAlerta({});
                navigate("/admin/carreras");
            }, 3000);
            
        } catch (error) {
            console.log("🚀 ~ file: CarrerasProvider.jsx:146 ~ eliminarCarrera ~ error:", error)
        }
    }

    return (
        <CarrerasContext.Provider
            value={{
                carreras, 
                agregarCarrera,
                alerta, 
                setAlerta,
                obtenerCarrera,
                carrera,
                editarCarrera, 
                cargando,
                setModal,
                modal,
                eliminarCarrera
            }}
        >{children}</CarrerasContext.Provider>
    );
}


export {
    CarrerasProvider
}

export default CarrerasContext
