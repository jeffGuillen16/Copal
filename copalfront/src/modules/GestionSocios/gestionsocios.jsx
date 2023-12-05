import axios from "axios";
import React, {useEffect, useState} from "react";
import Lateral from "../../components/lateral/lateral";
import Header from "../../components/header/header";
/* import Footer from '../../components/footer'; */
import Conteiner2 from '../../components/conteiners/conteiner210';
import Conteiner from '../../components/conteiners/conteiner100';
import Navegacion from '../../components/navhorizontal/navhorizontal';
import GlobalConteiner from '../../components/conteiners/globalConteiner';
import TarjetaUsuario from './components/tarjetaUsuario';
import Filtrado from '../../components/navhorizontal/filtro';
import VerSocioModal from './modal/modalVer';
import EliminarSocioModal from './modal/modalEliminar';
import ContainerCards from '../../components/conteiners/conatainerCards';
import Paginacion from '../../components/paginacion';
import { useNavigate } from 'react-router-dom';
import './gestionsocios.css'
import './nuevoSocio'

const apiUrl = process.env.REACT_APP_API_URL;

const socioDefault = {
  "id": 0,
  "denominacion": "",
  "descripcion": "",
  "mail": "",
  "telefono": "",
  "ubicacion": {
      "calle": "",
      "altura": "",
      "piso": "",
      "departamento": "",
      "localidad": "",
      "provincia": ""
  },
  "tipoSocio" : {
    "id": 0,
    "nombreTipoSocio": ""
  },
  "sitioWeb": "",
  "fechaDeAlta": "",
  "areas": [],
  "logo": {
    id:""
  }
};

const tipoSocios = [];

const areas = [];



function GestionSocios() {
  const navigate = useNavigate();
  /*ZONA DE PAGINACION */
  const [paginaActual, setPaginaActual] = useState(1);
  const [paginas, setPaginas] = React.useState(1);

  const handleChangePagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
    // Aquí puedes realizar alguna acción cuando se cambia de página
    //console.log('Se actualizo a pagina: ', nuevaPagina);
  };

  /*API LLAMADAS */
  //Variables de estado
  const [sociosApi, setSociosApi] = React.useState(null);
  const [areasFiltro, setAreasFiltro] = React.useState([]);
  const [tipoSocioFiltro, setTipoSocioFiltro] = React.useState([]);
  const [nombreFiltro, setNombreFiltro] = React.useState("");
  let busqueda = {tipoSocio:"", areas:"", denominacion:''};  

  const [busquedaFiltrada, setBusquedaFiltrada] = useState(busqueda);
  const ObtenerSociosAPI = () => {
    React.useEffect(() => {
      const filtros = `&tipoSocio=${busquedaFiltrada.tipoSocio}&areas=${busquedaFiltrada.areas}&denominacion=${busquedaFiltrada.denominacion}`;
      const endpoint = `socios?page=${paginaActual}`+ filtros;
      axios.get(apiUrl + endpoint).then((response) => {
        setSociosApi(response.data.content);
        console.log("content:  ", response.data.content); 
        setPaginas(response.data.totalPages);
      });
    }, [paginaActual, busquedaFiltrada]);   
    //console.log("Se obtuvieron los socios Pagina: ", paginaActual); 
  }
  const aplicarFiltros = (envioParametros) =>{
      setBusquedaFiltrada({
        tipoSocio: envioParametros.tipoSocio.join(','),
        areas: envioParametros.areas.join(','),
        denominacion: envioParametros.denominacion
      });
      setPaginaActual(1)
      console.log('Se envio la solicitud');
      // Esto recargará la página actual sin eliminar el historial
      
  }

ObtenerSociosAPI();

 

  /* FIN API LLAMADAS */

   /*Mostar Crear Socio logica*/
   const [mostrarModal, setMostrarModal] = useState(false);
   const abrirModal = () => {setMostrarModal(true);};
   const cerrarModal = () => {setMostrarModal(false);};
   /*Fin Mostrar Socio seleccionado Logica*/
 
   /*Mostrar Ver socio logica*/
   const [verSocio, setVerSocio] = useState(false);
   const abrirModalVer= ()=>{setVerSocio(true);};
   const cerrarModalVer = ()=>{setVerSocio(false);};
   /*fin Ver socio seleccionado */
 
   /*Editar socio modal logica */
   const [editarSocio, setEditarSocio] = useState(false);
   const abrirModalEditar=()=>{setEditarSocio(true);};
   const cerrarModalEditar=()=>{setEditarSocio(false);};
   /*fin editar socio*/
 
   /*Eliminar socio modal logica*/
   const [eliminarSocio, setEliminarSocio] = useState(false);
   const abrirModalEliminar=()=>{setEliminarSocio(true);};
   const cerrarModalEliminar=()=>{setEliminarSocio(false);};
   /*fin eliminar socio modal */
 
   /*Logica seleccion del socio*/
   const [socioSeleccionado, setSocioSeleccionado] = useState(socioDefault);
 
   const verSocioSeleccionado = (index)=>{
     index = parseInt(index);
     setSocioSeleccionado(sociosApi[index]);
     console.log(`Se asigno para ver el index: ${index}`)
     abrirModalVer();
   };
 
   const editarSocioSeleccionado = (index)=>{
    /*    index = parseInt(index);
       setSocioSeleccionado(sociosApi[index]);
       console.log(`Se asigno para editar el index: ${index}`)
       abrirModalEditar(); */
       navigate(`/socios/${sociosApi[index].id}/editar`);
     };
   
   const eliminarSocioSeleccionado = (index)=>{
     index = parseInt(index);
     setSocioSeleccionado(sociosApi[index]);
     console.log(`Se asigno para eliminar el index: ${index}`)
     abrirModalEliminar();
   };

   const filtrarAreas = (areas) => {
    setAreasFiltro(areas);
   }

   const filtrarTipos = (tipos) => {
    setTipoSocioFiltro(tipos);
   }

   const filtrarNombre = (nombre) => {
    setNombreFiltro(nombre);
   }

   //Evito que renderize algo que no existe
   if (!sociosApi) return null;//<<<-----
   

  const modalVer = (<VerSocioModal user={socioSeleccionado} mostrarModalVer={verSocio} cerrarModalVer={cerrarModalVer}/>);

  const modalEliminar = (<EliminarSocioModal socio={socioSeleccionado}  mostrarModal={eliminarSocio} cerrarModal={cerrarModalEliminar}/>);
  
  let sociosCards = sociosApi.map((socio, index) => (
    console.log("socio: ",socio),
    <TarjetaUsuario key={index} id={socio.id} index={index} descripcion={socio.descripcion} 
      nombre={socio.denominacion} funcionVer={verSocioSeleccionado}
      funcionEditar={editarSocioSeleccionado} funcionEliminar={eliminarSocioSeleccionado} imagenUrl= {`${apiUrl}imagen/${socio.logo.id}`}
    />));
  //console.log('Se renderearon los socios');

  return (
    <React.StrictMode>
        <GlobalConteiner >
          <Header/>
          <Conteiner2>
            <Lateral/>
            <Conteiner>
              {/* TODO: agregar breadcrumbs  */}   
               <Navegacion ruta='SOCIOS'/> 

               <div className="title">
                <h2 >Módulo de Socios</h2>
                <div className="title-line">
              </div>
              </div>
              
              <Filtrado aplicarFiltros={aplicarFiltros}/>
              <ContainerCards> 
                {sociosCards}
              </ContainerCards>
              <Paginacion
                    paginaActual={paginaActual}
                    totalPaginas={paginas}
                    onChangePagina={handleChangePagina}
                  />
              {modalVer}
              {modalEliminar}   
            </Conteiner> 
          </Conteiner2>
      </GlobalConteiner>
    </React.StrictMode>
  );
}


export default GestionSocios;