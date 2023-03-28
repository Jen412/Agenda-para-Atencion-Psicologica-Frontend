import {Route, Routes, BrowserRouter} from "react-router-dom"
//Layouts
import AuthLayout from "./layouts/AuthLayout"
import RutaProtegida from "./layouts/RutaProtegida";
//Pages
import Login from "./pages/Login"
import Admin from "./pages/Admin";
import User from "./pages/User";
import Citas from "./pages/Citas";
import IndexEstudiantes from "./pages/IndexEstudiantes";
import IndexPersonal from "./pages/IndexPersonal";
import AgendarCita from "./pages/AgendarCita";
import RegistrarPaciente from "./pages/RegistrarPaciente";
//Providers
import { AuthProvider } from "./context/AuthProvider";
import { CitasProvider } from "./context/CitasProvider";
import { EstudiantesProvider } from "./context/EstudiantesProvider";
import { CarrerasProvider } from "./context/CarrerasProvider";
import { PersonalProvider } from "./context/PersonalProvider";



function App() {
    return (
        <BrowserRouter>
            <CarrerasProvider>
                <EstudiantesProvider>
                    <PersonalProvider>
                        <AuthProvider>
                            <CitasProvider>
                                    <Routes>
                                        <Route path="/" element={<AuthLayout/>}>
                                            <Route index  element={<Login/>}/>
                                            <Route path="registrar" element={<RegistrarPaciente/>}/>
                                        </Route>
                                        <Route path="/admin" element={<RutaProtegida/>}>
                                            <Route index element={<Admin/>}/>
                                        </Route>
                                        <Route path="/user" element={<RutaProtegida/>}>
                                            <Route index element={<User/>}/>
                                            <Route path="citas" element={<Citas/>}/>
                                        </Route>
                                        <Route path="/estudiantes" element={<RutaProtegida/>}>
                                            <Route index element={<IndexEstudiantes/>}/>
                                            <Route path="agendar" element={<AgendarCita/>}/>
                                        </Route>
                                        <Route path="/personal" element={<RutaProtegida/>}>
                                            <Route index element={<IndexPersonal/>}/>
                                            <Route path="agendar" element={<AgendarCita/>}/>
                                        </Route>
                                    </Routes>
                            </CitasProvider>
                        </AuthProvider>
                    </PersonalProvider>
                </EstudiantesProvider>
            </CarrerasProvider>
        </BrowserRouter>
    );
}

export default App
