import {useContext} from "react";
import DiasContext from "../context/DiasProvider";

const useDias = () => {
    return useContext(DiasContext)
}

export default useDias;