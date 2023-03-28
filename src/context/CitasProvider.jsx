import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';

const CitasContext = createContext()

const CitasProvider = ({children}) =>{
    const [citas, setCitas] = useState([]);
    const [cita, setCita] = useState({});

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

    return (
        <CitasContext.Provider
            value={{
                citas, 
                cita, 
            }}
        >{children}</CitasContext.Provider>
    );
}


export {
    CitasProvider
}

export default CitasContext
