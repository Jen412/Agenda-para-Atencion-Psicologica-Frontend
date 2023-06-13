import { useEffect } from 'react'
import useGraficas from '../hooks/useGraficas';
import Grafica from "../components/Grafica";
import useCarreras from '../hooks/useCarreras';
import Spinner from "../components/Spinner";
const EstadisticasGraficas = () => {
    const {tipoGrafica, carreraG, sexoG,obtenerCitasCarrera, obtenerCitasSexo, labels, citas, cargando} = useGraficas();
    const {obtenerCarrera, carrera} = useCarreras();
    let carreraE ="";
    let datos = {};

    useEffect(() => {
        if (tipoGrafica =="Carrera") {
            obtenerCarrera(carreraG);
            obtenerCitasCarrera();
        }
        else if(tipoGrafica =="Sexo"){
            obtenerCitasSexo();
        }
    }, []);

    if (cargando) {
        return <Spinner/>
    }

    if (tipoGrafica == "Carrera") {
        carreraE = carrera.nombreCarrera;
        datos = {
            labels: labels,
            datasets:[
                {
                    label: carreraE,
                    data: citas,
                    tension: 0.5,
                    fill:true,
                    borderColor : "rgb(255,99,132)",
                    backgroundColor : "rgba(255,255,255,0.5)",
                    pointBackgroundColor : "rgba(255,255,255,0.5)",
                    pointRadius: 5,
                    pointBorderColor : "rgba(255,99,132)",
                }
            ]
        }
    }
    else if (tipoGrafica =="Sexo"){
        datos = {
            labels: labels,
            datasets:[
                {
                    label: sexoG,
                    data: citas,
                    tension: 0.5,
                    fill:true,
                    borderColor : "rgb(255,99,132)",
                    backgroundColor : "rgba(255,255,255,0.5)",
                    pointBackgroundColor : "rgba(255,255,255,0.5)",
                    pointRadius: 5,
                    pointBorderColor : "rgba(255,99,132)",
                }
            ]
        }
    }

    const opciones ={};
    return (
        <div className='bg-white p-3 rounded w-3/4'>
            <h1 className="text-indigo-500 font-black text-5xl text-center">Grafica Carreras</h1>
            <Grafica datos={datos} options={opciones}/>
        </div>
    )
}

export default EstadisticasGraficas
