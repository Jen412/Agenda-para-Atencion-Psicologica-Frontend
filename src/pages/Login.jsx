import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {alerta, setAlerta, setAuth} = useAuth();
    const navigate= useNavigate();

    const handleSubmit = async e =>{
        e.preventDefault();

        if ([email, password].includes("")) {
            setAlerta({
                msg: "Todos los Campos son obligatorios", 
                error: true
            });
            return;
        }

        try {
            const {data} = await clienteAxios.post("/usuarios/login", {email, password});
            localStorage.setItem("token", data.token);
            setAlerta({});
            setAuth(data); 
            if (data.tipoUsuario ==="Administrador") {
                navigate("/admin");
            }else if (data.tipoUsuario==="Usuario") {
                navigate("/user");
            }else if (data.tipoUsuario ==="Estudiante") {
                // window.location.href = window.location.href;
                setTimeout(() => {
                    navigate("/estudiantes")
                }, 100);
            }else if (data.tipoUsuario ==="Personal") {
                // window.location.href = window.location.href;
                setTimeout(() => {
                    navigate("/personal")
                }, 100);
            }
        } catch (error) {
            console.log(error)
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }
    }
    const {msg} = alerta;

    return (
        <>
            <h1 className="text-indigo-500 font-black text-5xl text-center">Inicia Sesión y Agenda Citas</h1>

            {msg && <Alerta alerta={alerta}/>}

            <form onSubmit={handleSubmit} className="my-10 bg-slate-500 shadow rounded-lg p-10">
                <div className="my-5">
                    <label htmlFor="email" className="text-gray-800 uppercase block text-xl font-bold">Email</label>
                    <input 
                        type="email" 
                        id="email"
                        placeholder="Email" 
                        className="w-full mt-3 p-3 boder rounded-xl bg-gray-50 placeholder:text-slate-700"
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                    />
                </div>
                <div className="my-5">
                    <label htmlFor="password" className="text-gray-800 uppercase block text-xl font-bold">Password</label>
                    <input 
                        type="password" 
                        id="password"
                        placeholder="Password" 
                        className="w-full mt-3 p-3 boder rounded-xl bg-gray-50 placeholder:text-slate-700"
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                    />
                </div>
                <input 
                    type="submit" 
                    value="Iniciar Sesión"
                    className="bg-indigo-500 w-full mb-3 py-3 mt-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-indigo-900 transition-colors"
                />
            </form>
            <nav className="lg:flex lg:justify-between">
                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm hover:text-indigo-600"
                    to="registrar"
                >¿No Tienes una Cuenta? Registrate como Paciente </Link>

                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm  hover:text-indigo-600"
                    to="olvide-password"
                >Olvide Mi Password</Link>
            </nav>
        </>
    )
}

export default Login
