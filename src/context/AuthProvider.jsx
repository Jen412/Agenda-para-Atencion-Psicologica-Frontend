import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);
    const [alerta, setAlerta] = useState({});
    const [usuario, setUsuario] = useState({});
    const [usuarioM, setUsuarioM] = useState({});
    const [usuarioV, setUsuarioV] = useState({});
    const [horarioUsuarioM, setHorarioUsuarioM] = useState([]);
    const [horarioUsuarioV, setHorarioUsuarioV] = useState([]);

    const navigate= useNavigate();

    useEffect(() => {
        const autenticarUsuario = async () =>{
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
                const {data}= await clienteAxios("usuarios/perfil", config);
                setAuth(data);
                if (data.numeroControl && location.pathname ==="/") {
                    if (data.tipoUsuario =="Estudiante") {
                        navigate("/estudiantes");
                    }
                }
                if (data.idPersonal && location.pathname ==="/") {
                    if (data.tipoUsuario =="Personal") {
                        navigate("/personal");
                    }
                }
                if (data.idUsuario && location.pathname ==="/") {
                    if (data.tipoUsuario=="Administrador") {
                        navigate("/admin");
                    }else if(data.tipoUsuario=="Usuario"){
                        navigate("/user");
                    }
                }
            } catch (error) {
                setAuth({});
            }
            finally{
                setCargando(false);
            }
        }

        const obenterUsuarioM = async ()=> {
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
                const {data} = await clienteAxios.get("usuarios/1", config);
                setUsuarioM(data);
                const response = await clienteAxios.get(`usuarios/${data.idUsuario}/horario`, config);
                setHorarioUsuarioM(response.data);
            } catch (error) {
                setUsuarioM({});
            }finally{
                setCargando(false);
            }
        }
        const obenterUsuarioV = async ()=> {
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
                const {data} = await clienteAxios.get("usuarios/2", config);
                // const {data} = await clienteAxios.post("usuarios/turno", {turno: "Vespertino"}, config);
                setUsuarioV(data);
                const response = await clienteAxios.get(`usuarios/${data.idUsuario}/horario`, config);
                setHorarioUsuarioV(response.data);
            } catch (error) {
                setUsuarioV({});
            }finally{
                setCargando(false);
            }
        }

        return () => {
            obenterUsuarioM();
            obenterUsuarioV();
            autenticarUsuario();
        };
    }, []);

    const obtenerUsuario = async (idUsuario) => {
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
            const {data} = await clienteAxios.get(`usuarios/${idUsuario}`, config);
            setUsuario(data);
        } catch (error) {
            console.log("🚀 ~ file: AuthProvider.jsx:126 ~ obtenerUsuario ~ error:", error)
        }
        finally{
            setCargando(false);
        }
    }

    const agregarHorario= async (horario)=>{
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
            const {data} = await  clienteAxios.post(`usuarios/${horario.idUsuario}/horario`, horario, config);
            if (horario.idUsuario ===usuarioM.idUsuario) {
                setHorarioUsuarioM([...horarioUsuarioM, data]);
            }
            if (horario.idUsuario ===usuarioV.idUsuario) {
                setHorarioUsuarioV([...horarioUsuarioV, data]);
            }
            setAlerta({
                msg: "Horario Registrado Correctamente", 
                error:false
            });
            setTimeout(() => {
                setAlerta({});
                //navigate("/admin/horario-usuarios");
                window.location.reload();
            }, 1500);
        } catch (error) {
            console.log("🚀 ~ file: AuthProvider.jsx:126 ~ agregarHorario ~ error:", error)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                alerta, 
                setAlerta, 
                cargando,
                usuarioM,
                usuarioV,
                usuario,
                obtenerUsuario,
                agregarHorario,
                horarioUsuarioM,
                horarioUsuarioV
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export {
    AuthProvider
}

export default AuthContext
