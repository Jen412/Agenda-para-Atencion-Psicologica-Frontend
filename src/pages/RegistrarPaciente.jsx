import { useState } from "react"
import { Link } from "react-router-dom";
import FormRegistrarEstudiante from "../components/FormRegistrarEstudiante";
import FormRegistroPersonal from "../components/FormRegistroPersonal";

const RegistrarPaciente = () => {
    const [tipo, setTipo] = useState("Estudiante");
    return (
        <>
            <h1 className="text-indigo-500 font-black text-5xl text-center">Registro de Paciente</h1>  
            <div className="my-10 bg-slate-500 shadow rounded-lg p-10">
                <div> 
                    <label htmlFor="tipo" className="text-gray-800 uppercase block text-xl font-bold">Tipo De Usuario</label>
                    <select 
                        name="tipo" 
                        id="tipo" 
                        value={tipo} 
                        onChange={(e)=>setTipo(e.target.value)}
                        className="w-full mt-3 p-3 boder rounded-xl bg-gray-50 placeholder:text-slate-700"
                    >
                        <option value="Estudiante">Estudiante</option>
                        <option value="Personal">Personal</option>
                    </select>
                </div>
                {tipo==="Estudiante" ? <FormRegistrarEstudiante/> : <FormRegistroPersonal/>}
            </div>
            <nav className="lg:flex lg:justify-between">
                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm hover:text-blue-600"
                    to="/"
                >¿Ya tienes Cuenta? Inicia Sesión </Link>

                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm  hover:text-blue-600"
                    to="olvide-password"
                >Olvide Mi Password</Link>
            </nav>
        </>
    )
}

export default RegistrarPaciente
