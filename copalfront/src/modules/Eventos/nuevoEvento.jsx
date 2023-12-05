import axios from "axios";
import React, { useState, useEffect } from "react";
import Lateral from "../../components/lateral/lateral";
import Header from "../../components/header/header";
import Footer from "../../components/footer";
import Conteiner2 from "../../components/conteiners/conteiner210";
import Conteiner from "../../components/conteiners/conteiner100";
import GlobalConteiner from "../../components/conteiners/globalConteiner";
import FormularioEventos from "./components/formularioAgregarEvento";
import "./nuevoEvento.css";

const apiUrl = process.env.REACT_APP_API_URL;

function NuevoEvento() {
  const [departamentos, setDepartamentos] = useState([]);
  const [modalidades, setModalidades] = useState([]);

  const ObtenerListas = () => {
      axios.get(apiUrl + `departamentos/lista`).then((response) => {
        setDepartamentos(response.data);
      });

      axios.get(apiUrl + `enums/modalidades`).then((response) => {
        setModalidades(response.data);
      });
  };

  useEffect(() => {
    ObtenerListas();
  },[])


  return (
    <React.StrictMode>
      <GlobalConteiner>
        <Header />
        <Conteiner2>
          <Lateral />
          <Conteiner>
            {/* <Navegacion/>*/}
            <div>
              <span className="departamentos">
                <a href="/eventos" >EVENTOS</a>
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
              <span className="departamentos" style={{"cursor":"default"}}>AGREGAR EVENTO</span>
            </div>
            <div className="title">
              <h2>Agregar evento</h2>
              <div className="title-line"></div>
              <span className="subtitle">Departamento Técnico</span>
            </div>

            <FormularioEventos
              listaDepartamentos={departamentos}
              listaModalidades={modalidades}
            />
          </Conteiner>
        </Conteiner2>
        <Footer />
      </GlobalConteiner>
    </React.StrictMode>
  );
}

export default NuevoEvento;
