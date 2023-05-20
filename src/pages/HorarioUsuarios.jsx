import { Link } from "react-router-dom";
import Horario from "../components/Horario";
import useAuth from "../hooks/useAuth"

const HorarioUsuarios = () => {
    const {usuarioM, usuarioV} = useAuth();

    return (
        <div className="container w-full">
        <h1 className="text-indigo-500 font-black text-5xl text-center">Horarios Usuarios</h1>
            <div className="flex gap-20 justify-center bg-white rounded-md p-3 mt-7">
                <div className='w-1/2'>
                    <h2 className='text-center font-bold text-2xl '>{usuarioM.nombre + " " + usuarioM.apellidoP}</h2>
                    <div className="mt-5 flex justify-end">
                        <Link
                            to={`/admin/registrar-horario/${usuarioM.idUsuario}`} 
                            className="bg-indigo-500 w-1/3 mb-4 py-3 px-3 text-center text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-indigo-900 transition-colors"
                        >Registrar Horario</Link>
                    </div>
                    <section className="ml-5">
                        <Horario idUsuario={usuarioM.idUsuario}/>
                    </section>
                </div>
                <div className='w-1/2'>
                    <h2 className='text-center font-bold text-2xl '>{usuarioV.nombre + " " + usuarioV.apellidoP}</h2>
                    <div className="flex mt-5 justify-end">
                        <Link
                            to={`/admin/registrar-horario/${usuarioV.idUsuario}`} 
                            className="bg-indigo-500 w-1/3 mb-4 py-3 px-3 text-center text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-indigo-900 transition-colors"              
                        >Registrar Horario</Link>
                    </div>
                    <section className="mr-5">
                        <Horario idUsuario={usuarioV.idUsuario}/>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default HorarioUsuarios
