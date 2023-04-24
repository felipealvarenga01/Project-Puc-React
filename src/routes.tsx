import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Dashboard from "./pages/Dashboard";

const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/login'  element={<Login />}/>
            <Route path='/'  element={<Login />}/>
            <Route path='/cadastro'  element={<Cadastro />}/>
            <Route path='/dashboard'  element={<Dashboard />}/>
        </Routes>
    </BrowserRouter>
)

export  default AppRoutes;