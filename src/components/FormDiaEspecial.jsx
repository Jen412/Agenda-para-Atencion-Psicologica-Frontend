import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useDias from "../hooks/useDias";
import Alerta from "./Alerta";

const FormDiaEspecial = () => {
    const [id, setId] = useState(null);
    const [fechaDia, setFechaDia] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const {alerta, dia ,agregarDia, modificarDia, setAlerta} = useDias();
    const params = useParams();

    useEffect(() => {
        let fechaAc ="";
        if (params.idDia) {
            if (dia.fechaDia) {
                fechaAc=dia?.fechaDia.split("T")[0]
                setId(params.idDia);
                setFechaDia(fechaAc);
                setDescripcion(dia?.descripcion);
            }
        }
    }, [params]);

    const handleSubmit = async e =>{
        e.preventDefault();
        if (id) {
            if ([fechaDia, descripcion].includes("")) {
                setAlerta({
                    msg: "Rellene Todos Los Campos", 
                    error: true
                });
                return;
            } else if(msg != ""){
                setAlerta({});
            }
            await modificarDia({idDia:id,fechaDia:fechaDia, descripcion});
        }else{
            if ([fechaDia, descripcion].includes("")) {
                setAlerta({
                    msg: "Rellene Todos Los Campos", 
                    error: true
                });
                return;
            } else if(msg != ""){
                setAlerta({});
            }
            await agregarDia({fechaDia:fechaDia, descripcion});
        }
        setId(null);
        setFechaDia("");
        setDescripcion("");
    }

    const {msg} = alerta;
    return (
        <form onSubmit={handleSubmit} className="my-10 bg-slate-500 shadow rounded-lg p-10">
            {msg && <Alerta alerta={alerta}/>}
            <div className="my-5">
                <label htmlFor="fechaDia" className="text-gray-800 uppercase block text-xl font-bold">Fecha</label>
                <input 
                    type="date" 
                    id="fechaDia"
                    className="w-full mt-3 p-3 boder rounded-xl bg-gray-50 placeholder:text-slate-700"
                    value={fechaDia}
                    onChange={e=>setFechaDia(e.target.value)}
                />
            </div>
            <div className="my-5">
                <label htmlFor="fechaDia" className="text-gray-800 uppercase block text-xl font-bold">Fecha</label>
                <input 
                    type="text" 
                    id="descripcion"
                    placeholder="Descripcion del dia" 
                    className="w-full mt-3 p-3 boder rounded-xl bg-gray-50 placeholder:text-slate-700"
                    value={descripcion}
                    onChange={e=>setDescripcion(e.target.value)}
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

export default FormDiaEspecial
