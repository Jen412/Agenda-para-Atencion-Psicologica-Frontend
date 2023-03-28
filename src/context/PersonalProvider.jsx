import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';

const PersonalContext = createContext()

const PersonalProvider = ({children}) =>{
    const [personal, setPersonal] = useState([]);
    const [persona, setPersona] = useState({});
    const [alerta, setAlerta] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerPersonal = async () =>{
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
                const {data} = await clienteAxios("/personal", config);
                setPersonal(data)
            } catch (error) {
                console.log("🚀 ~ file: PersonalProvider.jsx:27 ~ obtenerPersonal ~ error", error)
            }
        }
        return () => {obtenerPersonal()};
    }, []);
    
    const obtenerPersonal = async (id)=>{
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
            const {data} = await clienteAxios(`/personal/${id}`, config);
            setPersona(data);
        } catch (error) {
            console.log("🚀 ~ file: PersonalProvider.jsx:48 ~ obtenerPersonal ~ error", error)
        }
    }

    const mostrarAlerta = alerta =>{
        setAlerta(alerta)
        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    const registrarPersonal = async persona =>{
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const {data} = await clienteAxios.post("/personal", persona, config);
            setPersonal([...personal, data]);
            window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth"
            });
            setAlerta({
                msg: "Paciente Registrado Correctamente", 
                error: false
            })
            setTimeout(() => {
                setAlerta({});
                navigate("/");
            }, 3000);
        } catch (error) {
            console.log("🚀 ~ file: PersonalProvider.jsx:75 ~ registrarPersonal ~ error", error);
        }
    }

    return (
        <PersonalContext.Provider
            value={{
                obtenerPersonal, 
                personal,
                registrarPersonal,
                alerta,
                mostrarAlerta
            }}
        >{children}</PersonalContext.Provider>
    );
}


export {
    PersonalProvider
}

export default PersonalContext
