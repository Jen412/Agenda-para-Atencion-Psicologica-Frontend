import {Route, Routes, BrowserRouter} from "react-router-dom"
//Layouts
import AuthLayout from "./layouts/AuthLayout"
import RutaProtegida from "./layouts/RutaProtegida";
//Pages
import Login from "./pages/Login"
import Admin from "./pages/Admin";
//Providers
import { AuthProvider } from "./context/AuthProvider";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<AuthLayout/>}>
                        <Route index element={<Login/>}/>
                    </Route>
                    <Route path="/admin" element={<RutaProtegida/>}>
                        <Route index element={<Admin/>}/>
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App
