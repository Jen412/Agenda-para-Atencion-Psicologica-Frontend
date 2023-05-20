import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';

const CitasContext = createContext()

const CitasProvider = ({children}) =>{
    const [citas, setCitas] = useState([]);
    const [cita, setCita] = useState({});
    const [alerta, setAlerta] = useState({});
    const [modal, setModal] = useState(false);
    const [cargando, setCargando] = useState(false);
    const [numCitasPaciente, setNumCitasPaciente] = useState(0);
    const navigate = useNavigate();


    useEffect(() => {
        const obtenerCitas= async ()=>{
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
                const {data} = await clienteAxios("/citas", config);
                setCitas(data);
            } catch (error) {
                console.log("🚀 ~ file: CitasProvider.jsx:27 ~ obtenerCitas ~ error", error)
            }
        }
        return () => {obtenerCitas()};
    }, []);



    const agregarCita = async (cita, auth) =>{
        const token = localStorage.getItem("token");
        const idPaciente = auth.numeroControl ? auth.numeroControl : auth.idPersonal;
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
            const datos = await clienteAxios.post("/citas/primeraCita", {idPaciente: idPaciente}, config);
            const dat = await clienteAxios.post("/usuarios/turno", {turno: auth.turno}, config);
            let newCita= {
                horaCita: cita.horaCita,
                fechaCita: cita.fechaCita,
                motivo: cita.motivo,
                primeraCita: datos.data.primeraCita,
                estudiante: auth.tipoUsuario =="Estudiante" ? true : false,
                idPaciente: auth.numeroControl ? auth.numeroControl : auth.idPersonal, 
                idUsuario: dat.data.idUsuario
            };
            const {data} = await clienteAxios.post("/citas", newCita, config);
            setCitas([...citas, data]);
            setAlerta({
                msg: "Cita Registrada Correctamente",
                error: false
            });
            setTimeout(() => {
                setAlerta({});
                if (auth.tipoUsuario==="Estudiante") {
                    navigate("/estudiantes");
                }
                else if(auth.tipoUsuario==="Personal"){
                    navigate("/personal");
                }
            }, 3000);
        } catch (error) {
            console.log("🚀 ~ file: CitasProvider.jsx:64 ~ agregarCita ~ error:", error)
        }
    }

    const obtenerCita = async (idCita) =>{
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
            const {data} = await clienteAxios(`/citas/${idCita}`, config);
            setCita(data);
        } catch (error) {
            console.log("🚀 ~ file: CitasProvider.jsx:99 ~ obtenerCita ~ error:", error)
        }
        finally{
            setCargando(false);
        }
    }

    const obtenerCitasXPaciente = async (user)=>{
        const token = localStorage.getItem("token");
        const idPaciente = user.numeroControl ? user.numeroControl : user.idPersonal;
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
            const {data} = await clienteAxios.get(`/citas/paciente/${idPaciente}`, config);
            setCitas(data);
        } catch (error) {
            console.log("🚀 ~ file: CitasProvider.jsx:100 ~ obtenerCitasXPaciente ~ error:", error)
        }
    }

    const cancelarCita = async (idCita)=>{
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
            const {data} = await clienteAxios.post(`/citas/cancelar/${idCita}`, config);
            console.log("🚀 ~ file: CitasProvider.jsx:137 ~ cancelarCita ~ data:", data)
            const citasAc = citas.map(citaState=> citaState.idCita ===data.idCita ? data: citaState);
            setCitas(citasAc);
            setCita({})
            setAlerta({
                msg: "Cita cancelada correctamente",
                error: false
            });
            setTimeout(() => {
                setAlerta({});
            }, 3000);
        } catch (error) {
            console.log("🚀 ~ file: CitasProvider.jsx:153 ~ cancelarCita ~ error:", error)
        }
    }


    const mostrarAlerta = alerta =>{
        setAlerta(alerta)
        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }
    
    const modificarCita= async ()=>{

    }

    const numCitas = async (idPaciente)=>{
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
            const {data} = await clienteAxios(`/citas/numeroCitas/${idPaciente}`, config);
            return data.numCitas;
        } catch (error) {
            console.log("🚀 ~ file: CitasProvider.jsx:185 ~ numCitas ~ error:", error)
        }
    }

    const comprobarNumCitasCanceladas =() =>{
        let numCitas = 0;
        citas.forEach(cita => {
            if (cita.fechaCancelacion == null && !cita.procesada) {
                numCitas++;
            }
        });
        return numCitas;
    }
    
    const procesarCita = async (idCita, observaciones) =>{
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
            const {data} = await clienteAxios.put(`/citas/procesar/${idCita}`,{observaciones}, config);
            const citasAc = citas.map(citaState=> citaState.idCita ===data.idCita ? data: citaState);
            setCitas(citasAc); 
            setAlerta({
                msg: "Cita Procesada correctamente",
                error: false
            });
            setTimeout(() => {
                setAlerta({});
                navigate("/user/citas");
            }, 3000);
        } catch (error) {
            console.log("🚀 ~ file: CitasProvider.jsx:221 ~ procesarCita ~ error:", error)
        }
    }

    const agendarCitaAdmin = async(cita)=>{
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
            const datos = await clienteAxios.post("/citas/primeraCita", {idPaciente: cita.idPaciente}, config);
            const dat = await clienteAxios.post("/usuarios/turno", {turno: cita.turno}, config);
            let newCita = {
                horaCita: cita.horaCita,
                fechaCita: cita.fechaCita,
                motivo: cita.motivo,
                primeraCita: datos.data.primeraCita,
                estudiante: cita.estudiante,
                idPaciente: cita.idPaciente, 
                idUsuario: dat.data.idUsuario
            }
            const {data} = await clienteAxios.post("/citas", newCita, config);
            setCitas([...citas, data]);
            setAlerta({
                msg: "Cita Registrada Correctamente",
                error: false
            });
            setTimeout(() => {
                setAlerta({});
                navigate("/admin");
            }, 3000);
        } catch (error) {
            console.log("🚀 ~ file: CitasProvider.jsx:261 ~ agendarCitaAdmin ~ error:", error)
        }
    }

    return (
        <CitasContext.Provider
            value={{
                citas, 
                cita,
                obtenerCita, 
                alerta,
                agregarCita,
                obtenerCitasXPaciente,
                modal, 
                setModal, 
                cancelarCita, 
                mostrarAlerta,
                cargando,
                setCargando,
                modificarCita,
                numCitas,
                numCitasPaciente,
                comprobarNumCitasCanceladas,
                procesarCita,
                agendarCitaAdmin
            }}
        >{children}</CitasContext.Provider>
    );
}


export {
    CitasProvider
}

export default CitasContext
