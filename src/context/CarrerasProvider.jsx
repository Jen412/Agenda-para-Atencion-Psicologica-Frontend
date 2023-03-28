import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';

const CarrerasContext = createContext()

const CarrerasProvider = ({children}) =>{
    const [carreras, setCarreras] = useState([]);

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
            } catch (error) {
                console.log("🚀 ~ file: CarrerasProvider.jsx:27 ~ obtenerCarreras ~ error", error)
            }
        }
        return () => {obtenerCarreras()};
    }, []);

    return (
        <CarrerasContext.Provider
            value={{
                carreras, 
            }}
        >{children}</CarrerasContext.Provider>
    );
}


export {
    CarrerasProvider
}

export default CarrerasContext
