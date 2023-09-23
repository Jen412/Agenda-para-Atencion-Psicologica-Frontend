import {useState} from 'react'
import Alerta from './Alerta';
import useEstudiantes from "../hooks/useEstudiantes";
import useCarreras from '../hooks/useCarreras';

const FormRegistrarEstudiante = () => {
    const [numeroControl, setNumeroControl] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellidoP, setApellidoP] = useState("");
    const [apellidoM, setApellidoM] = useState("");
    const [telefono, setTelefono] = useState("");
    const [turno, setTurno] = useState("");
    const [sexo, setSexo] = useState("");
    const [carrera, setCarrera] = useState("");

    const {alerta, registrarEstudiante, mostrarAlerta} = useEstudiantes();
    const {carreras} = useCarreras();
    
    const validateEmail = email =>{
        let emailRegez = /^[a-zA-Z0-9._%+-]+@cdguzman\.tecnm\.mx$/;
        return emailRegez.test(email);
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            if ([numeroControl, email, password, telefono, turno, carrera].includes("")) {
                mostrarAlerta({
                    mensaje: "Campos Obligatorios Vacios",
                    error: true
                });
                return;
            }
            if (!validateEmail(email)) {
                mostrarAlerta({
                    mensaje: "Email con formato invalido utilice su correo institucional",
                    error: true
                });
                return;
            }
            let tipoUsuario = "Estudiante";
            let cell = parseInt(telefono);
            await registrarEstudiante({numeroControl, email, password, nombre, apellidoP, apellidoM, telefono: cell, sexo, turno, tipoUsuario ,carrera});
        } catch (error) {
            console.log("🚀 ~ file: FormRegistrarEstudiante.jsx:34 ~ handleSubmit ~ error", error)
        }
    }
    const {msg} = alerta;

    return (
        <>
        
            <form onSubmit={handleSubmit}>
                {msg && <Alerta alerta={alerta}/>}
                <div className='mt-8'>
                    <label htmlFor="nc" className="text-gray-800 uppercase block text-xl font-bold">Numero de Control</label>
                    <input 
                        name="nc" 
                        id="nc"
                        type="text"
                        value={numeroControl} 
                        onChange={(e)=>setNumeroControl(e.target.value)}
                        className="w-full mt-3 p-3 boder rounded-xl bg-gray-50 placeholder:text-slate-700"
                        placeholder="Numero de Control"
                    />
                </div>
                <div className='mt-3'>
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
                <div className='mt-3'>
                    <label htmlFor="password" className="text-gray-800 uppercase block text-xl font-bold">password</label>
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
                <div className='mt-3'>
                    <label htmlFor="nombre" className="text-gray-800 uppercase block text-xl font-bold">Nombre</label>
                    <input 
                        name="nombre" 
                        id="nombre"
                        type="text"
                        value={nombre} 
                        onChange={(e)=>setNombre(e.target.value)}
                        className="w-full mt-3 p-3 boder rounded-xl bg-gray-50 placeholder:text-slate-700"
                        placeholder="Nombre del Estudiante"
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
                    <label htmlFor="carrera" className="text-gray-800 uppercase block text-xl font-bold">Carrera</label>
                    <select 
                        name="carrera" 
                        id="carrera" 
                        value={carrera} 
                        onChange={(e)=>setCarrera(e.target.value)}
                        className="w-full mt-3 p-3 boder rounded-xl bg-gray-50 placeholder:text-slate-700"
                    >
                        <option value="" disabled>--Seleccione Carrera--</option>
                        {carreras.map(carreraBD => {return <option value={carreraBD.idCarrera} key={carreraBD.idCarrera}>{carreraBD.nombreCarrera}</option>})}
                    </select>
                </div>
                <div className='mt-3'> 
                    <label htmlFor="turno" className="text-gray-800 uppercase block text-xl font-bold">Turno</label>
                    <select 
                        name="turno" 
                        id="turno" 
                        value={turno} 
                        onChange={(e)=>setTurno(e.target.value)}
                        className="w-full mt-3 p-3 boder rounded-xl bg-gray-50 placeholder:text-slate-700"
                    >
                        <option value="" disabled>--Seleccione Turno--</option>
                        <option value="Matutino">Matutino</option>
                        <option value="Vespertino">Vespertino</option>
                    </select>
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
        </>
    )
}

export default FormRegistrarEstudiante
