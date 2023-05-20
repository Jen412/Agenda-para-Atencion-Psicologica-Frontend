import { useEffect } from "react";
import { useParams } from "react-router-dom"
import FormCarrera from "../components/FormCarrera";
import Spinner from "../components/Spinner";
import useCarreras from "../hooks/useCarreras";
const EditarCarrera = () => {
    const {idCarrera} = useParams();
    const {obtenerCarrera, cargando} = useCarreras();

    useEffect(() => {
        obtenerCarrera(idCarrera);
    }, []);

    if (cargando) {
        return <Spinner/>;
    }

    return (
        <div className="container w-1/3">
            <FormCarrera/>
        </div>
    )
}

export default EditarCarrera
