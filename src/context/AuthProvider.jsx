import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);
    const [alerta, setAlerta] = useState({});

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
                setCargando(false)
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
                setAlerta, 
                cargando
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
