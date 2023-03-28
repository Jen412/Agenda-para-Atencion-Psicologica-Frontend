import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';

const EstudiantesContext = createContext()

const EstudiantesProvider = ({children}) =>{
    const [estudiantes, setEstudiantes] = useState([]);
    const [estudiante, setEstudiante] = useState({});
    const [alerta, setAlerta] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerEstudiantes = async () =>{
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
                const {data} = await clienteAxios("/estudiantes", config);
                setEstudiantes(data)
            } catch (error) {
                console.log("🚀 ~ file: EstudiantesProvider.jsx:27 ~ obtenerEstudiantes ~ error", error)
            }
        }
        return () => {obtenerEstudiantes()};
    }, []);
    
    const mostrarAlerta = alerta =>{
        setAlerta(alerta)
        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    const obtenerEstudiante = async (nc)=>{
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
            const {data} = await clienteAxios(`/estudiantes/${nc}`, config);
            setEstudiante(data);
        } catch (error) {
            console.log("🚀 ~ file: EstudiantesProvider.jsx:48 ~ obtenerEstudiante ~ error", error)
        }
    }

    const registrarEstudiante = async estudiante =>{
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const {data} = await clienteAxios.post("/estudiantes", estudiante, config);
            setEstudiantes([...estudiantes, data]);
            window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth"
            });
            setAlerta({
                msg: "Usuario Registrado Correctamente", 
                error: false
            })
            setTimeout(() => {
                setAlerta({});
                navigate("/");
            }, 3000);
        } catch (error) {
            console.log("🚀 ~ file: EstudiantesProvider.jsx:75 ~ registrarEstudiante ~ error", error)
        }
    }

    return (
        <EstudiantesContext.Provider
            value={{
                obtenerEstudiante, 
                estudiantes, 
                alerta, 
                registrarEstudiante,
                mostrarAlerta
            }}
        >{children}</EstudiantesContext.Provider>
    );
}


export {
    EstudiantesProvider
}

export default EstudiantesContext
