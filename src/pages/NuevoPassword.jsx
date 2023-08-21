import { useState, useEffect } from "react"
import {useParams, Link} from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"

const NuevoPassword = () => {
    const {token} = useParams();
    const [tokenValido, setTokenValido] = useState(false);
    const [alerta, setAlerta] = useState({});
    const [password, setPassword] = useState("");
    const [passwordModificado, setPasswordModificado] = useState(false);
    
    useEffect(() => {
        const comprobarToken = async ()=>{
            try {
                await clienteAxios(`/usuarios/olvide-password/${token}`)
                setTokenValido(true)
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }
        return () => {comprobarToken()};    
    }, []);

    const handleSumit = async(e) =>{
        e.preventDefault();
        if (password.length<6) {
            setAlerta({
                msg: "El password debe de ser minimo de 6 caracteres",
                error: true
            })
            return
        }
        try {
            const url= `/usuarios/olvide-password/${token}`;
            const {data} = await clienteAxios.post(url, {password});
            setAlerta({
                msg: data.msg,
                error: false
            })
            setPassword("")
            setPasswordModificado(true)
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }
    const {msg} = alerta
    return (
        <>
            <h1 className="text-indigo-500 font-black text-6xl capitalize">Reestablece tu password</h1>
            
            {msg && <Alerta alerta={alerta}/>}

            {tokenValido && (
                <form onSubmit={handleSumit} className="my-10 bg-slate-500 shadow rounded-lg p-10">
                <div className="my-5">
                    <label className="text-white uppercase block text-xl font-bold" htmlFor="password">Nuevo Password</label>
                    <input 
                        type="password" 
                        id="password"
                        placeholder="Escribe tu Nuevo Password"
                        className="w-full mt-3 p-3 boder rounded-xl bg-gray-50"
                        value={password}
                        onChange={e=> setPassword(e.target.value)}
                    />
                </div>
                <input 
                    type="submit" 
                    value="Guardar Nuevo Password"
                    className="bg-indigo-500 w-full mb-3 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-indigo-600 transition-colors"
                />
            </form>)}

            {passwordModificado &&(
                    <Link
                        className="block text-center my-5 text-slate-500 uppercase text-sm"
                        to="/"
                    >Inicia Sesión</Link>
            )}
        </>
    )
}

export default NuevoPassword
