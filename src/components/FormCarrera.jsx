import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCarreras from "../hooks/useCarreras";
import Alerta from "./Alerta";

const FormCarrera = () => {
    const [id, setId] = useState(null);
    const [nombreCarrera, setNombreCarrera] = useState("");
    const params = useParams();
    const {alerta, setAlerta, agregarCarrera,editarCarrera, carrera} = useCarreras();

    useEffect(() => {
        if (params.idCarrera) {
            setId(params.idCarrera);
            setNombreCarrera(carrera?.nombreCarrera);
        }
    }, [params]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            if (nombreCarrera==="") {
                setAlerta({
                    msg: "Nombre de Carrera Obligatorio", 
                    error: true
                });
                return;
            }else if(msg != ""){
                setAlerta({});
            }
            await editarCarrera({
                idCarrera: id,
                nombreCarrera: nombreCarrera
            });
        }
        else{
            if (nombreCarrera==="") {
                setAlerta({
                    msg: "Nombre de Carrera Obligatorio", 
                    error: true
                });
                return;
            }
            else if(msg != ""){
                setAlerta({});
            }
            await agregarCarrera({nombreCarrera: nombreCarrera});
        }
        setId(null);
        setNombreCarrera("");
    }
    const {msg} = alerta;
    return (
        <form onSubmit={handleSubmit} className="my-10 bg-slate-500 shadow rounded-lg p-10">
        {msg && <Alerta alerta={alerta}/>}
            <div className="my-5">
                <label htmlFor="nombreCarrera" className="text-gray-800 uppercase block text-xl font-bold">Nombre Carrera</label>
                <input 
                    type="text" 
                    id="nombreCarrera"
                    placeholder="Nombre de la Carrera" 
                    className="w-full mt-3 p-3 boder rounded-xl bg-gray-50 placeholder:text-slate-700"
                    value={nombreCarrera}
                    onChange={e=>setNombreCarrera(e.target.value)}
                />
            </div>
            <input 
                type="submit" 
                value={id ? "Guardar Cambios": "Agregar"}
                className="bg-indigo-500 w-full mb-3 py-3 mt-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-indigo-900 transition-colors"
            />
        </form>
    )
}

export default FormCarrera
