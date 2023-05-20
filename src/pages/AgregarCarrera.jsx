import useCarreras from "../hooks/useCarreras";
import FormCarrera from "../components/FormCarrera";

const AgregarCarrera = () => {
    return (
        <div className="container w-1/3">
            <h1 className="text-indigo-500 font-black text-5xl text-center">Agregar Carrera</h1>
            <FormCarrera/>
        </div>
    )
}

export default AgregarCarrera
