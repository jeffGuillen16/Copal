import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Lateral from "../../components/lateral/lateral";
import Header from "../../components/header/header";
import Conteiner2 from '../../components/conteiners/conteiner210';
import Conteiner from '../../components/conteiners/conteiner100';
import GlobalConteiner from '../../components/conteiners/globalConteiner';
import FormularioEventos from "./components/formularioAgregarEvento";
import "./nuevoEvento.css";

const apiUrl = process.env.REACT_APP_API_URL;

function EditarDepartamento() {

  const { id } = useParams();


  const [evento, setEvento] = React.useState();
  const [modalidades, setModalidades] = React.useState([]);
  const [departamentos, setDepartamentos] = React.useState([]);
  const [estados, setEstados] = React.useState([]);

  const ObtenerDatos = () => {
    React.useEffect(() => {
      axios.get(apiUrl + `eventos/${id}`).then((response) => {
        setEvento(response.data);
      });
      axios.get(apiUrl + `departamentos/lista`).then((response) => {
        setDepartamentos(response.data);
      });
      axios.get(apiUrl + `enums/modalidades`).then((response) => {
        setModalidades(response.data);
      });
      axios.get(apiUrl + `enums/estados`).then((response) => {
        setEstados(response.data);
      });
    }, []);
  };
  
  
    ObtenerDatos();

    return (
        <React.StrictMode>
            <GlobalConteiner >
              <Header/>
              <Conteiner2>
                <Lateral/>
                <Conteiner>
                 { /*<Navegacion ruta={"SOCIOS/EDITAR"}/>*/}
                 <div>
                    <span className="departamentos">
                      <a href="/eventos" style={{"textDecoration":"underline"}}>EVENTOS</a>
                    </span>
                    <span className="operador">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-chevron-right"
                      >
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </span>
                    <span className="departamentos" style={{"cursor":"default"}}>EDITAR EVENTO</span>
                  </div>
                  <div className="title">
                    <h2>Editar evento</h2>
                    <div className="title-line"></div>
                    <span className="subtitle">Departamento Técnico</span>
                  </div>

                  <FormularioEventos
                    eventoEstruct={evento}
                    listaDepartamentos={departamentos}
                    listaModalidades={modalidades}
                    listaEstados={estados}
                  />
                </Conteiner> 
              </Conteiner2>
          </GlobalConteiner>
        </React.StrictMode>
    );

}

export default EditarDepartamento;