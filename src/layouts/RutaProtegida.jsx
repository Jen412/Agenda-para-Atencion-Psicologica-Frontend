import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"


const RutaProtegida = () => {
    const {auth} = useAuth();

    return (
        <>
            {auth.idUsuario ? (
                <div className="bg-100">
                    <main className="p-10 flex-1">
                        <Outlet/>
                    </main>
                </div>
            ) : <Navigate to="/"/> }
        </>
    )
}

export default RutaProtegida
