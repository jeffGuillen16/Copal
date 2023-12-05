import axios from "axios";
import React, {useState} from "react";
import Lateral from "../../components/lateral/lateral";
import Header from "../../components/header/header";
import Footer from '../../components/footer';
import Conteiner2 from '../../components/conteiners/conteiner210';
import Conteiner from '../../components/conteiners/conteiner100';
import Navegacion from '../../components/navhorizontal/navhorizontal';
import GlobalConteiner from '../../components/conteiners/globalConteiner';
import FormularioCrear from "./components/formularioAgregar";
import './nuevoSocio.css';

const apiUrl = process.env.REACT_APP_API_URL;

export default function NuevoSocio() {

    const [areas, setAreas] = React.useState([]);
    const [tiposSocios, setTiposSocios] = React.useState([]);
    const [provincias, setProvincias] = React.useState([]);

    const ObtenerListados = () => {
      React.useEffect(() => {
        const endpoint = `socio/nuevo`;
        axios.get(apiUrl + endpoint).then((response) => {
          setAreas(response.data.areas);
          setTiposSocios(response.data.tipoSocios);
          setProvincias(response.data.provincias);
        });
      }, []);   
       
    }
  
    ObtenerListados();

    return (
        <React.StrictMode>
            <GlobalConteiner >
              <Header/>
              <Conteiner2>
                <Lateral/>
                <Conteiner>
                                     
                  {/* Comentario: Esta es la sección de navegación 
                  <Navegacion>
                    </Navegacion>
                    */}
                  <div>
                    <span className="socio">
                       <a href="/socios">SOCIOS</a> 
                      </span>
                    <span className="operador"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg></span>
                    <span className="socio">NUEVO SOCIOS</span>
                  </div>
                  <FormularioCrear tiposDeSocio={tiposSocios} areasDeSocio={areas} provincias={provincias}/>
               
                </Conteiner> 
              </Conteiner2>
              <Footer/>
          </GlobalConteiner>
        </React.StrictMode>
    );
}