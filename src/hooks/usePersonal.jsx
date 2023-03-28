import  {useContext} from "react";
import PersonalContext from "../context/PersonalProvider";

const usePersonal = ()=>{
    return useContext(PersonalContext);
}

export default usePersonal;