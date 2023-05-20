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
    let ruta ="";
    if (auth.tipoUsuario ==="Administrador") {
        ruta = "/admin";
    }else if(auth.tipoUsuario ==="Usuario"){
        ruta= "/user";
    }else if(auth.tipoUsuario ==="Estudiante"){
        ruta = "/estudiantes";
    }else if(auth.tipoUsuario ==="Personal"){
        ruta = "/personal";
    }

    return (
        <header className="p-5 bg-indigo-600">
            <div className="flex justify-between">
                <h1 
                    className="font-extrabold text-5xl uppercase text-white"
                >Sistema de Citas</h1>
                <nav className="flex gap-2 items-center">
                    <>
                        <Link
                            to={`${ruta}`}
                            className="text-white text-sm uppercase font-bold p-3 rounded-md hover:text-gray-400"
                        >Inicio</Link>
                        {auth.tipoUsuario ==="Administrador" && 
                        (<div>
                            <Link 
                                to="dias-especiales"
                                className="text-white text-sm uppercase font-bold p-3 rounded-md hover:text-gray-400"
                            >Dias Especiales</Link>
                            <Link 
                                to="horario-usuarios"
                                className="text-white text-sm uppercase font-bold p-3 rounded-md hover:text-gray-400"
                            >Horarios Usuarios</Link>
                            <Link 
                                to="carreras"
                                className="text-white text-sm uppercase font-bold p-3 rounded-md hover:text-gray-400"
                            >Carreras</Link>
                            <Link 
                                to="estadisticas" 
                                className="text-white text-sm uppercase font-bold p-3 rounded-md hover:text-gray-400"
                            >Estadisticas</Link>   
                            <Link 
                                to="agendar-cita" 
                                className="text-white text-sm uppercase font-bold p-3 rounded-md hover:text-gray-400"
                            >Agendar Cita</Link>   
                        </div>)}
                        {auth.tipoUsuario !="Usuario" && auth.tipoUsuario != "Administrador" ?
                        <Link
                            to="agendar"
                            className="text-white text-sm uppercase font-bold p-3 rounded-md hover:text-gray-400"
                        >Agendar Cita</Link> : ""}
                        {auth.tipoUsuario ==="Usuario" && 
                        <div>
                            <Link 
                                to="citas" 
                                className="text-white text-sm uppercase font-bold p-3 rounded-md hover:text-gray-400"
                            >Citas</Link>    
                            <Link 
                                to="pacientes" 
                                className="text-white text-sm uppercase font-bold p-3 rounded-md hover:text-gray-400"
                            >Pacientes</Link>    
                            <Link 
                                to="estadisticas" 
                                className="text-white text-sm uppercase font-bold p-3 rounded-md hover:text-gray-400"
                            >Estadisticas</Link>   
                        </div>}
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
