import { useState } from "react";
import Alerta from './Alerta';
import usePersonal from "../hooks/usePersonal"

const FormRegistroPersonal = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellidoP, setApellidoP] = useState("");
    const [apellidoM, setApellidoM] = useState("");
    const [telefono, setTelefono] = useState("");
    const [sexo, setSexo] = useState("");
    const { registrarPersonal, alerta, mostrarAlerta} = usePersonal();
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            if ([email, password, telefono].includes("")) {
                mostrarAlerta({
                    mensaje: "Campos Obligatorios Vacios",
                    error: true
                });
                return;
            }
            let tipoUsuario = "Personal";
            await registrarPersonal({email, password, nombre, apellidoM, apellidoP, telefono, sexo, tipoUsuario});
        } catch (error) {
            console.log("🚀 ~ file: FormRegistroPersonal.jsx:27 ~ handleSubmit ~ error", error)
        }
    }
    
    const {msg} = alerta;

    return (
        <form onSubmit={handleSubmit}>
            {msg && <Alerta alerta={alerta}/>}
            <div className="mt-8">
                <label htmlFor="email" className="text-gray-800 uppercase block text-xl font-bold">Email</label>
                <input 
                    name="email" 
                    id="email"
                    type="email"
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)}
                    className="w-full mt-3 p-3 boder rounded-xl bg-gray-50 placeholder:text-slate-700"
                    placeholder="Email"
                />
            </div>
            <div className="mt-3">
                <label htmlFor="password" className="text-gray-800 uppercase block text-xl font-bold">Password</label>
                <input 
                    name="password" 
                    id="password"
                    type="password"
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)}
                    className="w-full mt-3 p-3 boder rounded-xl bg-gray-50 placeholder:text-slate-700"
                    placeholder="Password"
                />
            </div>
            <div className="mt-3">
                <label htmlFor="nombre" className="text-gray-800 uppercase block text-xl font-bold">Nombre</label>
                <input 
                    name="nombre" 
                    id="nombre"
                    type="text"
                    value={nombre} 
                    onChange={(e)=>setNombre(e.target.value)}
                    className="w-full mt-3 p-3 boder rounded-xl bg-gray-50 placeholder:text-slate-700"
                    placeholder="Nombre"
                />
            </div>
            <div className='mt-3'>
                <label htmlFor="apellidoP" className="text-gray-800 uppercase block text-xl font-bold">Apellido Paterno</label>
                <input 
                    name="apellidoP" 
                    id="apellidoP"
                    type="text"
                    value={apellidoP} 
                    onChange={(e)=>setApellidoP(e.target.value)}
                    className="w-full mt-3 p-3 boder rounded-xl bg-gray-50 placeholder:text-slate-700"
                    placeholder="Apellido Paterno"
                />
            </div>
            <div className='mt-3'>
                <label htmlFor="apellidoM" className="text-gray-800 uppercase block text-xl font-bold">Apellido Materno</label>
                <input 
                    name="apellidoM" 
                    id="apellidoM"
                    type="text"
                    value={apellidoM} 
                    onChange={(e)=>setApellidoM(e.target.value)}
                    className="w-full mt-3 p-3 boder rounded-xl bg-gray-50 placeholder:text-slate-700"
                    placeholder="Apellido Materno"
                />
            </div>
            <div className='mt-3'>
                <label htmlFor="telefono" className="text-gray-800 uppercase block text-xl font-bold">Teléfono</label>
                <input 
                    name="telefono" 
                    id="telefono"
                    type="phone"
                    value={telefono} 
                    onChange={(e)=>setTelefono(e.target.value)}
                    className="w-full mt-3 p-3 boder rounded-xl bg-gray-50 placeholder:text-slate-700"
                    placeholder="Teléfono"
                />
            </div>
            <div className='mt-3'> 
                <label htmlFor="sexo" className="text-gray-800 uppercase block text-xl font-bold">Sexo</label>
                <select 
                    name="sexo" 
                    id="sexo" 
                    value={sexo} 
                    onChange={(e)=>setSexo(e.target.value)}
                    className="w-full mt-3 p-3 boder rounded-xl bg-gray-50 placeholder:text-slate-700"
                >
                    <option value="" disabled>--Seleccione Sexo--</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="No Binario">No Binario</option>
                </select>
            </div>
            <input 
                type="submit" 
                value="Registrar"
                className="bg-indigo-500 w-full mb-3 py-3 mt-8 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-indigo-900 transition-colors"
            />
        </form>
    )
}

export default FormRegistroPersonal
