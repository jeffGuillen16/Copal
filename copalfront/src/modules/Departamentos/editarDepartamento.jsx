import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Lateral from "../../components/lateral/lateral";
import Header from "../../components/header/header";
import Conteiner2 from '../../components/conteiners/conteiner210';
import Conteiner from '../../components/conteiners/conteiner100';
import GlobalConteiner from '../../components/conteiners/globalConteiner';
import FormularioDepartamentos from "./components/formularioAgregarDepartamento";
import "./nuevoDepartamento.css";

const apiUrl = process.env.REACT_APP_API_URL;

function EditarDepartamento() {
  const departamentoEstruct = {
    nombre: "",
    descripcion: "",
    logo:{
        id:""
    },
    autoridades: [
      {
        usuario:"",
        rol:""
      }
    ],
    departamentoCoordinador: "CDT"
  };

  const { id } = useParams();


  const [departamento, setDepartamento] = React.useState(departamentoEstruct);
  const [rolesDeUsuario, setRolesDeUsuario] = React.useState([]);
  const [usuarios, setUsuarios] = React.useState([]);

  const ObtenerDatos = () => {
    React.useEffect(() => {
      axios.get(apiUrl + `departamentos/${id}`).then((response) => {
        departamentoEstruct.autoridades = response.data.autoridades.map( autoridad  => ({rol:autoridad.rol.nombre, usuario:autoridad.usuario.nombre}) );
        console.log(departamentoEstruct);
        setDepartamento(
          {
            id: response.data.id,
            nombre: response.data.nombre,
            descripcion: response.data.descripcion,
            logo:{
                id:response.data.logo.id,
                url: response.data.logo.url
            },
            autoridades: departamentoEstruct.autoridades,
            departamentoCoordinador: "CDT"
          }
          );
      });
      axios.get(apiUrl + `roles`).then((response) => {
        setRolesDeUsuario(response.data);
      });
      axios.get(apiUrl + `usuarios`).then((response) => {
        setUsuarios(response.data);
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-chevron-right"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </span>
              <span className="socio">EDITAR EDITAR DEPARTAMENTOS</span>
            </div>
                 
                 
                  <div className="title">
                    <h2>Editar Departamento</h2>
                    <div className="title-line"></div>
                    <span className="subtitle">Departamento Técnico</span>
                  </div>
                  <FormularioDepartamentos departamentoEstruct={departamento} rolesDeUsuario={rolesDeUsuario} listaUsuarios={usuarios}/>
                </Conteiner> 
              </Conteiner2>
          </GlobalConteiner>
        </React.StrictMode>
    );

}

export default EditarDepartamento;