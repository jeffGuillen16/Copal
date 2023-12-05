import axios from "axios";
import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';

import Lateral from "../../components/lateral/lateral";
import Header from "../../components/header/header";
import Conteiner2 from '../../components/conteiners/conteiner210';
import Conteiner from '../../components/conteiners/conteiner100';
import Navegacion from '../../components/navhorizontal/navhorizontal';
import GlobalConteiner from '../../components/conteiners/globalConteiner';
import TarjetaDepartamento from './components/tarjetaDepartamento';
import VerDepartamentoModal from './modal/modalVer';
import EliminarDepartamentoModal from './modal/modalEliminar';
/* import Paginacion from '../../components/paginacion'; */
import './gestionDepartamento.css'


const apiUrl = process.env.REACT_APP_API_URL;

const departamentoDefault = {
  "id" : 0,
  "nombre": "",
  "descripcion": "",
  "logo":{
    id:""
  },
  "autoridades": [
    {
      usuario:"",
      rol:""
    }
  ],
  "departamentoCoordinador": "CDT"
};


function Departamentos() {
  const navigate = useNavigate();
  /*ZONA DE PAGINACION */
  const [paginaActual, setPaginaActual] = useState(0);
  const [paginas, setPaginas] = React.useState(0);

  const handleChangePagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
    // Aquí puedes realizar alguna acción cuando se cambia de página
    //console.log('Se actualizo a pagina: ', nuevaPagina);
  };

  /*API LLAMADAS */
  //var estado
  const [departamentosAPI, setDepartamentosAPI] = React.useState(null);

  
  useEffect(() => {
    const endpoint = `departamentos`; //?page=${paginaActual}
    axios.get(apiUrl + endpoint).then((response) => {
      setDepartamentosAPI(response.data);
    });
  }, []); 
 

  /* FIN API LLAMADAS */
 
   /*Mostrar Ver socio logica*/
   const [verDepartamento, setVerDepartamento] = useState(false);
   const abrirModalVer= ()=>{setVerDepartamento(true);};
   const cerrarModalVer = ()=>{setVerDepartamento(false);};
   /*fin Ver socio seleccionado */
 
 
   /*Eliminar socio modal logica*/
   const [eliminarDepartamento, setEliminarDepartamento] = useState(false);
   const abrirModalEliminar=()=>{setEliminarDepartamento(true);};
   const cerrarModalEliminar=()=>{setEliminarDepartamento(false);};
   /*fin eliminar socio modal */
 
   /*Logica seleccion del socio*/
   const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState(departamentoDefault);
 
   const verDepartamentoSeleccionado = (index)=>{
     index = parseInt(index);
     setDepartamentoSeleccionado(departamentosAPI[index]);
     console.log(`Se asigno para ver el index: ${index}`)
     abrirModalVer();
   };
 
   const editarDepartamentoSeleccionado = (index)=>{
    /*    index = parseInt(index);
       setDepartamentoSeleccionado(sociosApi[index]);
       console.log(`Se asigno para editar el index: ${index}`)
       abrirModalEditar(); */
       navigate(`/departamentos/${departamentosAPI[index].id}/editar`);
     };
   
   const eliminarDepartamentoSeleccionado = (index)=>{
     index = parseInt(index);
     setDepartamentoSeleccionado(departamentosAPI[index]);
     console.log(`Se asigno para eliminar el index: ${index}`)
     abrirModalEliminar();
   };


   //Evito que renderize algo que no existe
   if (!departamentosAPI) return null;//<<<-----
   
  
  let departamentoCards = departamentosAPI.map((departamento, index) => (
    console.log("departamento: ",departamento),
    <TarjetaDepartamento key={index} id={departamento.id} index={index} descripcion={departamento.descripcion} 
      nombre={departamento.nombre} funcionVer={verDepartamentoSeleccionado} autoridades={departamento.autoridades}
      funcionEditar={editarDepartamentoSeleccionado} funcionEliminar={eliminarDepartamentoSeleccionado} imagenUrl={departamento.logo.url}
    />));
  //console.log('Se renderearon los socios');

  return (
    <React.StrictMode>
        <GlobalConteiner >
          <Header/>
          <Conteiner2>
            <Lateral/>
            <Conteiner>
              {/* Breadcrumbs  */}
              <Navegacion ruta="DEPARTAMENTOS"/>
              <div className="title">
                <h2 >Módulo de Departamentos</h2>
                <div className="title-line">
              </div>
              </div>
              <div className="info-tecnico-cadrs">
                <div className="rowDepto" >
                  <div className="superDepartamento" style={{paddingLeft:"0"}}>
                    <span className="superdepto-item">Departamentos Técnicos</span>
                  </div>
                  <a href='/departamentos/nuevo' className="copal-button">+ DEPARTAMENTO</a>   
                </div>
                
      
                <section className="infoDepartamentosTecnicos">
                  <section className="puestos-ctn">
                    <div className="puesto">
                      <span className="titulo-puesto">Coordinación Departamentos Técnicos</span>
                      <span className="encargado-puesto">Darinka Anzulovich</span>                
                    </div>
                    <div className="puesto">
                      <span className="titulo-puesto">Asistente de Departamentos Técnicos</span>
                      <span className="encargado-puesto">Juliana Cortez Danese</span>                
                    </div>
                  </section>
                  <section className="info-ctn">
                    <article className="articulo">
                    Su objetivo es el diseño de propuestas y seguimiento en materia de políticas de desarrollo productivo, acceso al financiamiento y mejora de la competitividad de los sectores de la industria de alimentos y bebidas, en particular las economías regionales y el entramado PyME.
                    </article>
                  </section>
                </section>
                <div className="cads-display">
                  {departamentoCards}
                </div>
              </div>

              <VerDepartamentoModal departamento={departamentoSeleccionado} mostrarModalVer={verDepartamento} cerrarModalVer={cerrarModalVer}/>
              
              <EliminarDepartamentoModal departamento={departamentoSeleccionado}  mostrarModal={eliminarDepartamento} cerrarModal={cerrarModalEliminar}/>  
            </Conteiner> 
          </Conteiner2>
      </GlobalConteiner>
    </React.StrictMode>
  );
}

export default Departamentos;