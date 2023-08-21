import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const OlvidePassword = () => {
    const [email, setEmail] = useState("");
    const [alerta, setAlerta] = useState({});
    
    const handleSubmit = async(e)=> {
        e.preventDefault();
        if (email == ""|| email.length <6 ) {
            setAlerta({
                msg: "El email es Obligatorio", 
                error: true
            })
            return
        }

        try {
            const {data} = await clienteAxios.post(`/usuarios/olvide-password/`,{email})
            setAlerta({
                msg: data.msg, 
                error: false
            })
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
            <h1 className="text-indigo-500 font-black text-5xl">Recuperar contraseña</h1>
            
            {msg && <Alerta alerta={alerta}/>}

            <form  onSubmit={handleSubmit}  className="my-10 bg-slate-500 shadow rounded-lg p-10">
                <div className="my-5">
                    <label className="text-gray-600 uppercase block text-xl font-bold" htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email"
                        placeholder="Email de Registro"
                        className="w-full mt-3 p-3 boder rounded-xl bg-gray-50"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <input 
                    type="submit" 
                    value="Enviar Instrucciones"
                    className="bg-indigo-500 w-full mb-3 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-indigo-800 transition-colors"
                />
            </form>
        </>
    )
}

export default OlvidePassword
