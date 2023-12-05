import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./modules/Home/home";
import GestionSocios from './modules/GestionSocios/gestionsocios';
import NuevoSocio from "./modules/GestionSocios/nuevoSocio";
import EditarSocio from "./modules/GestionSocios/editarSocio";
import NuevoDepartamento from "./modules/Departamentos/nuevoDepartamento";
import EditarDepartamento from "./modules/Departamentos/editarDepartamento";
import Departamentos from './modules/Departamentos/departamentos'
import Eventos from "./modules/Eventos/eventos";
import NuevoEvento from './modules/Eventos/nuevoEvento'
import EditarEvento from './modules/Eventos/editarEvento'
import InvitacionEvento from "./modules/Eventos/invitacionEvento";
import GestionEspacios from './modules/GestiosEspacios/gestiosEspacios';
import SolicitudEspacio from "./modules/GestiosEspacios/solicitudEspacio";
import EditarEspacio from './modules/GestiosEspacios/editarEspacio'
import SolicitudSeguimiento from "./modules/GestiosEspacios/solicitudSeguimiento";

export default function Rutas() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path="/socios" element={<GestionSocios />} />
          <Route path="/socios/nuevo" element={<NuevoSocio />} />
          <Route path='/socios/:id/editar' element={<EditarSocio />} />
          <Route path="/departamentos" element={<Departamentos />} />
          <Route path="/departamentos/nuevo" element={<NuevoDepartamento />} />
          <Route path='/departamentos/:id/editar' element={<EditarDepartamento />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path='/eventos/nuevo' element={<NuevoEvento />} />
          <Route path='/eventos/:id/editar' element={<EditarEvento />} />
          <Route path='/eventos/:id/invitacion' element={<InvitacionEvento />} />
          <Route path="/espacios" element={<GestionEspacios />} />
          <Route path='/espacios/:id/editar' element={<EditarEspacio />} />
          <Route path='/espacios/invitacion' element={<SolicitudEspacio />} />
          <Route path='/espacios/seguimiento' element={<SolicitudSeguimiento />} />
          
          {/* <Route path="/departamentos/nuevo" element={<NuevoDepartamento />} />
          <Route path='/departamentos/:id/editar' element={<EditarDepartamento />} /> */}
      </Routes>
    </BrowserRouter>
  );
}