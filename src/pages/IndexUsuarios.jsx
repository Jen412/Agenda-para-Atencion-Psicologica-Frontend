import { useEffect, useState } from "react";
import Calendario from "../components/Calendario";
import Spinner from "../components/Spinner";
import useCitas from "../hooks/useCitas";
import ModalCancelarCita from "../components/ModalCancelarCita";

const IndexUsuarios = () => {
    const {citas, cargando, modal, cita, setModal} = useCitas();
    
    const handleClose = ()=>{
        setModal(false);
    }
    
    if (cargando) {
        return <Spinner/>
    }

    return (
        <div className="container w-full">
            <Calendario citas={citas}/>

            {modal && <ModalCancelarCita onClose = {handleClose} idCita={cita.idCita}/>}
        </div>
    )
}

export default IndexUsuarios
