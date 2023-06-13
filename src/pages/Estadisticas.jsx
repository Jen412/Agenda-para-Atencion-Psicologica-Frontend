import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import useCarreras from '../hooks/useCarreras';
import useGraficas from '../hooks/useGraficas';
import useAuth from '../hooks/useAuth';
import Alerta from '../components/Alerta';


const Estadisticas = () => {
    const [carrera, setCarrera] = useState("");
    const [sexo, setSexo] = useState("");
    const [periodoTiempo, setPeriodoTiempo] = useState("");
    const {setTipoGrafica, setCarreraG, setTiempoPeriodo, alerta, setAlerta, setSexoG} = useGraficas();
    const {auth} = useAuth();
    const {carreras} = useCarreras();
    const navigate = useNavigate();

    const onSubmitCarreras = async(e) => {
        e.preventDefault();
        if ([carrera, periodoTiempo].includes("")) {
            setAlerta({
                msg: "Rellene los campos de las estadisticas por carrera",
                error: true,
            })
            setTimeout(() => {
                setAlerta({});
            }, 2000);
        }
        setCarreraG(carrera);
        setTiempoPeriodo(periodoTiempo);
        setTipoGrafica("Carrera");
        if (auth.tipoUsuario === "Administrador") {
            navigate("/admin/estadisticasGraficas");
        }
        else if (auth.tipoUsuario === "Usuario") {
            navigate("/user/estadisticasGraficas");
        }
    }

    const onSubmitSexo = async(e) => {
        e.preventDefault();
        if ([sexo, periodoTiempo].includes("")) {
            setAlerta({
                msg: "Rellene los campos de las estadisticas por sexo",
                error: true,
            })
            setTimeout(() => {
                setAlerta({});
            }, 2000);
        }
        setSexoG(sexo);
        setTiempoPeriodo(periodoTiempo);
        setTipoGrafica("Sexo");
        if (auth.tipoUsuario === "Administrador") {
            navigate("/admin/estadisticasGraficas");
        }
        else if (auth.tipoUsuario === "Usuario") {
            navigate("/user/estadisticasGraficas");
        }
    }

    const {msg} = alerta;
    return (
        <div className='container bg-white rounded-md p-2 w-full'>
            <h1 className="text-indigo-500 font-black text-5xl text-center">Estadisticas</h1>
            <div className='flex flex-col items-center justify-center'>
                {msg && <Alerta alerta={alerta}/>}
            </div>
            <div className='flex justify-center items-center'>
                <section className='p-7 w-full flex flex-col items-center'>
                    <h2 className='text-black font-black text-xl text-center'>Estadisticas por Carrera</h2>
                    <form onSubmit={onSubmitCarreras} className='bg-slate-400 p-5 rounded-md mt-3 w-10/12'>
                        <div >
                            <div className="my-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="carrera">
                                    Carrera
                                </label>
                                <select 
                                    className="w-full mt-3 p-3 boder rounded-xl bg-gray-50 placeholder:text-slate-700" 
                                    name="carrera" 
                                    id="carrera"
                                    value={carrera}
                                    onChange={(e) => setCarrera(e.target.value)}
                                >
                                    <option value="" disabled>--Seleccione Carrera--</option>
                                    {carreras.map(carrera=>(
                                        <option key={carrera.idCarrera} value={carrera.idCarrera}>{carrera.nombreCarrera}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="my-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tiempo">
                                    Periodo de Tiempo
                                </label>
                                <select 
                                    className="w-full mt-3 p-3 boder rounded-xl bg-gray-50 placeholder:text-slate-700" 
                                    name="tiempo" 
                                    id="tiempo"
                                    value={periodoTiempo}
                                    onChange={(e) => setPeriodoTiempo(e.target.value)}
                                >
                                    <option value="" disabled>--Seleccione Periodo de Tiempo--</option>
                                    <option value="mes">Mes</option>
                                    <option value="semestre">6 Meses</option>
                                    <option value="anual">Años</option>
                                </select>
                            </div>
                            <input 
                                type="submit" 
                                value="Mostar Graficas"
                                className="bg-indigo-500 w-full mb-3 py-3 mt-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-indigo-900 transition-colors"
                            />
                        </div>
                    </form>
                </section>
                <section className='p-7 w-full flex flex-col items-center'>
                    <h2 className='text-black font-black text-xl text-center'>Estadisticas por Sexo</h2>
                    <form onSubmit={onSubmitSexo} className='bg-slate-400 p-5 rounded-md mt-3 w-10/12'>
                        <div >
                            <div className="my-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sexo">
                                    Sexo
                                </label>
                                <select 
                                    className="w-full mt-3 p-3 boder rounded-xl bg-gray-50 placeholder:text-slate-700" 
                                    name="sexo" 
                                    id="sexo"
                                    value={sexo}
                                    onChange={(e) => setSexo(e.target.value)}
                                >
                                    <option value="" disabled>--Seleccione El Sexo--</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                    <option value="noBinario">No Binario</option>
                                </select>
                            </div>
                            <div className="my-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tiempo">
                                    Periodo de Tiempo
                                </label>
                                <select 
                                    className="w-full mt-3 p-3 boder rounded-xl bg-gray-50 placeholder:text-slate-700" 
                                    name="tiempo" 
                                    id="tiempo"
                                    value={periodoTiempo}
                                    onChange={(e) => setPeriodoTiempo(e.target.value)}
                                >
                                    <option value="" disabled>--Seleccione Periodo de Tiempo--</option>
                                    <option value="mes">Mes</option>
                                    <option value="semestre">6 Meses</option>
                                    <option value="anual">Años</option>
                                </select>
                            </div>
                            <input 
                                type="submit" 
                                value="Mostar Graficas"
                                className="bg-indigo-500 w-full mb-3 py-3 mt-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-indigo-900 transition-colors"
                            />
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default Estadisticas
