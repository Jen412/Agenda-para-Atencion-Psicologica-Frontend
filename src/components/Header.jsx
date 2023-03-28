import useAuth from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
    const {setAuth, auth} = useAuth();
    const navigate = useNavigate();
    const cerrarSesion = (e) =>{
        localStorage.removeItem("token");
        setAuth({});
        navigate("/");
    }

    return (
        <header className="p-5 bg-indigo-600">
            <div className="flex justify-between">
                <h1 
                    className="font-extrabold text-5xl uppercase text-white"
                >Sistema de Citas</h1>
                <nav className="flex gap-2 items-center">
                    <>
                        {auth.tipoUsuario !="Usuario" && auth.tipoUsuario != "Administrador" ?
                        <Link
                            to="agendar"
                            className="text-white text-sm uppercase font-bold p-3 rounded-md hover:text-gray-400"
                        >Agendar Cita</Link> : ""}
                        <Link to="citas" className="text-white text-sm uppercase font-bold p-3 rounded-md hover:text-gray-400">Citas</Link>
                        <button
                            type="button"
                            className="text-white text-sm uppercase font-bold p-3 rounded-md hover:text-gray-400"
                            onClick={cerrarSesion}
                        >Cerrar Sesión</button>
                    </> 
                </nav>
            </div>
        </header>
    )
}

export default Header
