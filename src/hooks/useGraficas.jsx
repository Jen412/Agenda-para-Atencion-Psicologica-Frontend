import { useContext } from "react";
import GraficasContext from "../context/GraficasProvider";

const useGraficas = ()=>{
    return useContext(GraficasContext);
}

export default useGraficas;