import { useEffect } from "react";
import Spinner from "../components/Spinner";
import useAuth from "../hooks/useAuth";

const User = () => {
    const {auth, obtenerUsuario, usuario, cargando} = useAuth();

    useEffect(() => {
        obtenerUsuario(auth.idUsuario);
    }, []);

    if (cargando) {
        return <Spinner/>
    }
    
    return (
        <div className="bg-white p-5 rounded-md h-[30rem] w-3/4">
            <h1 className="font-bold text-3xl text-center">Hola {usuario.nombre + " "+ usuario.apellidoP}</h1>
            <div className="container">
                
            </div>
        </div>
    )
}

export default User
