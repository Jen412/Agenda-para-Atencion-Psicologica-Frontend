import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    const [alerta, setAlerta] = useState({});

    const navigate= useNavigate();

    useEffect(() => {
        const autenticarUsuario = async () =>{
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
                const {data}= await clienteAxios("", config);
                setAuth(data);
                if (data.idUsuario && location.pathname === "/") {
                    navigate("/admin");
                }
            } catch (error) {
                setAuth({});
            }
            finally{
                
            }
        }

        return () => {autenticarUsuario()};
    }, []);

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                alerta, 
                setAlerta
            }}
        >{children}</AuthContext.Provider>
    );
}

export {
    AuthProvider
}

export default AuthContext
