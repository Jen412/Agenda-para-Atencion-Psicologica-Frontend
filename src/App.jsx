import {Route, Routes, BrowserRouter} from "react-router-dom"
//Layouts
import AuthLayout from "./layouts/AuthLayout"
import RutaProtegida from "./layouts/RutaProtegida";
//Providers
import { AuthProvider } from "./context/AuthProvider";
import { CitasProvider } from "./context/CitasProvider";
import { EstudiantesProvider } from "./context/EstudiantesProvider";
import { CarrerasProvider } from "./context/CarrerasProvider";
import { PersonalProvider } from "./context/PersonalProvider";
import { DiasProvider } from "./context/DiasProvider";
import { GraficasProvider } from "./context/GraficasProvider";
//Pages
import Login from "./pages/Login"
import Admin from "./pages/Admin";
import User from "./pages/User";
import Citas from "./pages/Citas";
import IndexUsuarios from "./pages/IndexUsuarios";
import AgendarCita from "./pages/AgendarCita";
import RegistrarPaciente from "./pages/RegistrarPaciente";
import ModificarCita from "./pages/ModificarCita";
import Carreras from "./pages/Carreras";
import AgregarCarrera from "./pages/AgregarCarrera";
import EditarCarrera from "./pages/EditarCarrera";
import Pacientes from "./pages/Pacientes";
import DiasEspeciales from "./pages/DiasEspeciales";
import AgregarDiaEspecial from "./pages/AgregarDiaEspecial";
import EditarDiaEspecial from "./pages/EditarDiaEspecial";
import ProcesarCita from "./pages/ProcesarCita";
import ObservacionesPaciente from "./pages/ObservacionesPaciente";
import Estadisticas from "./pages/Estadisticas";
import AgendarCitaAdmin from "./pages/AgendarCitaAdmin";
import RegistrarHorario from "./pages/RegistrarHorario";
import HorarioUsuarios from "./pages/HorarioUsuarios";
import EstadisticasGraficas from "./pages/EstadisticasGraficas";

function App() {
    return (
        <BrowserRouter>
            <CarrerasProvider>
                <EstudiantesProvider>
                    <PersonalProvider>
                        <AuthProvider>
                            <DiasProvider>
                                <CitasProvider>
                                    <GraficasProvider>
                                        <Routes>
                                            <Route path="/" element={<AuthLayout/>}>
                                                <Route index  element={<Login/>}/>
                                                <Route path="registrar" element={<RegistrarPaciente/>}/>
                                            </Route>
                                            <Route path="/admin" element={<RutaProtegida/>}>
                                                <Route index element={<Admin/>}/>
                                                <Route path="carreras" element={<Carreras/>}/>
                                                <Route path="carreras/agregar" element={<AgregarCarrera/>}/>
                                                <Route path="carreras/editar/:idCarrera" element={<EditarCarrera/>}/>
                                                <Route path="dias-especiales" element={<DiasEspeciales/>}/>
                                                <Route path="dias-especiales/agregar" element={<AgregarDiaEspecial/>}/>
                                                <Route path="dias-especiales/editar/:idDia" element={<EditarDiaEspecial/>}/>
                                                <Route path="estadisticas" element={<Estadisticas/>}/>
                                                <Route path="estadisticasGraficas" element={<EstadisticasGraficas/>}/>
                                                <Route path="agendar-cita" element={<AgendarCitaAdmin/>}/>
                                                <Route path="horario-usuarios" element={<HorarioUsuarios/>}/>
                                                <Route path="registrar-horario/:idUsuario" element={<RegistrarHorario/>}/>
                                            </Route>
                                            <Route path="/user" element={<RutaProtegida/>}>
                                                <Route index element={<User/>}/>
                                                <Route path="citas" element={<Citas/>}/>
                                                <Route path="reagendar-cita/:idCita" element={<ModificarCita/>}/>
                                                <Route path="procesar-cita/:idCita" element={<ProcesarCita/>}/>
                                                <Route path="pacientes" element={<Pacientes/>}/>
                                                <Route path="observaciones-paciente/:idPaciente" element={<ObservacionesPaciente/>}/>
                                                <Route path="estadisticas" element={<Estadisticas/>}/>
                                                <Route path="estadisticasGraficas" element={<EstadisticasGraficas/>}/>
                                            </Route>
                                            <Route path="/estudiantes" element={<RutaProtegida/>}>
                                                <Route index element={<IndexUsuarios/>}/>
                                                <Route path="agendar" element={<AgendarCita/>}/>
                                            </Route>
                                            <Route path="/personal" element={<RutaProtegida/>}>
                                                <Route index element={<IndexUsuarios/>}/>
                                                <Route path="agendar" element={<AgendarCita/>}/>
                                            </Route>
                                        </Routes>
                                    </GraficasProvider>
                                </CitasProvider>
                            </DiasProvider>
                        </AuthProvider>
                    </PersonalProvider>
                </EstudiantesProvider>
            </CarrerasProvider>
        </BrowserRouter>
    );
}

export default App
