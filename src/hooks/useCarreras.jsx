import  {useContext} from "react";
import CarrerasContext from "../context/CarrerasProvider";

const useCarreras = ()=>{
    return useContext(CarrerasContext);
}

export default useCarreras;