import { Outlet, Navigate } from "react-router-dom"
import Footer from "../components/Footer";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth"


const RutaProtegida = () => {
    const {auth} = useAuth();

    return (
        <>
            {auth.idUsuario  || auth.numeroControl || auth.idPersonal? (
                <div>
                    <Header/>
                    <main className="p-10 flex flex-1 justify-center">
                        <Outlet/>
                    </main>
                    <Footer/>
                </div>
            ) : <Navigate to="/"/> }
        </>
    )
}

export default RutaProtegida
