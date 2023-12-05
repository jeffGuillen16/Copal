import axios from "axios";
import React, { useState } from "react";
import Lateral from "../../components/lateral/lateral";
import Header from "../../components/header/header";
import Footer from "../../components/footer";
import Conteiner2 from "../../components/conteiners/conteiner210";
import Conteiner from "../../components/conteiners/conteiner100";
import Navegacion from "../../components/navhorizontal/navhorizontal";
import GlobalConteiner from "../../components/conteiners/globalConteiner";
import FormularioCrear from "./components/formularioAgregarDepartamento";
import "./nuevoDepartamento.css";

const apiUrl = process.env.REACT_APP_API_URL;

function NuevoDepartamento() {
  const [rolesDeUsuario, setRolesDeUsuario] = React.useState([]);
  const [usuarios, setUsuarios] = React.useState([]);

  const ObtenerListas = () => {
    React.useEffect(() => {
      axios.get(apiUrl + `roles`).then((response) => {
        setRolesDeUsuario(response.data);
      });
      axios.get(apiUrl + `usuarios`).then((response) => {
        setUsuarios(response.data);
      });
    }, []);
  };

  ObtenerListas();

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
                <a href="/departamentos">DEPARTAMENTOS</a>
              </span>
              <span className="operador">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-chevron-right"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </span>
              <span className="nuevoDepartamento">NUEVOS DEPARTAMENTOS</span>
            </div>
            <div className="title">
              <h2>Agregar Departamento</h2>
              <div className="title-line"></div>
              <span className="subtitle">Departamento Técnico</span>
            </div>

            <FormularioCrear
              rolesDeUsuario={rolesDeUsuario}
              listaUsuarios={usuarios}
            />
          </Conteiner>
        </Conteiner2>
        <Footer />
      </GlobalConteiner>
    </React.StrictMode>
  );
}

export default NuevoDepartamento;
