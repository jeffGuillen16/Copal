import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';

import Lateral from "../../components/lateral/lateral";
import Header from "../../components/header/header";
import Conteiner2 from '../../components/conteiners/conteiner210';
import Conteiner from '../../components/conteiners/conteiner100';
import Navegacion from '../../components/navhorizontal/navhorizontal';
import GlobalConteiner from '../../components/conteiners/globalConteiner';
import FiltradoEspacios from './components/filtroEspacios';
import ItemEspacio from './components/ItemEspacio';
import {fetchReservas} from './services/AxiosReservas'
import RechazarReservaModal from './modal/modalRechazazSolicitud'
import ConfirmarReservaModal from './modal/modalConfirmarSolicitud'
/* import Paginacion from '../../components/paginacion'; */

import './gestionEspacios.css'

/* const espacioDefault = {
  {
    "id": 12,
    "departamento": "Economía, Desarrollo Regional y PyME",
    "nombreDelResponsable": "Roberto",
    "mail": "roberto@gmail.com",
    "espacio": "Centro 2",
    "direccion": "Av Gaona 425",
    "fecha": "2023-11-16",
    "horaInicio": "17:00",
    "duracion": 3,
    "estado": "ACEPTADO",
    "recursosReservados": [
        {
            "id": 1,
            "nombre": "proyector",
            "cantidad": 10,
            "cantidadAceptada": 0,
            "aceptado": false
        },
        {
            "id": 2,
            "nombre": "silla",
            "cantidad": 2,
            "cantidadAceptada": 1,
            "aceptado": true
        }
    ]
} */

function Espacios() {
  const navigate = useNavigate();

  /* Filtros */
  let busqueda = {departamento:"", espacio:"", estado:"", fechaInicio:"", fechaFin:""};
  const [busquedaFiltrada, setBusquedaFiltrada] = useState(busqueda);
  
  const aplicarFiltros = (envioParametros) =>{
    setBusquedaFiltrada(prevState => ({
      ...prevState,
      departamento: envioParametros.departamento.join(','),
      espacio: envioParametros.espacio.join(','),
      estado: envioParametros.estado.join(','), 
      fechaInicio: envioParametros.fechaInicio,
      fechaFin: envioParametros.fechaFin,
    }));
/*     setEspaciosAPI([]);
    setCurrentPage(1);
    loadMoreData(); */
  }

  /* estados */
  const [espaciosAPI, setEspaciosAPI] = useState([]);
  const [filterChange, setFilterChange] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 6;  // Cantidad de elementos por página

  const[scrollPosition,setScrollPosition] = useState(1)
  const [lastPage, setLastPage] = useState(5);

/*   const loadMoreReservas = async () => {
    setIsLoading(true);
    const filtros = `&departamento=${busquedaFiltrada.departamento}&espacio=${busquedaFiltrada.espacio}&estado=${busquedaFiltrada.estado}&desde=${busquedaFiltrada.fechaInicio}&hasta=${busquedaFiltrada.fechaFin}`;
    const newReservas = await fetchReservas(filtros, itemsPerPage, currentPage);
    setEspaciosAPI(prevEspacios => [...prevEspacios, ...newReservas]);
    setPage(prevPage => prevPage + 1);
    setIsLoading(false);
  }; */

  const loadMoreData = async () => {
    // Calcula el índice inicial y final para la próxima página de datos
    console.log("currentPage:" + currentPage)
    console.log("isLoading:" + isLoading)
    console.log("lastPage:" + lastPage)
    if (currentPage > lastPage ) return; // Evita solicitudes múltiples simultáneas
    setIsLoading(true);

    try {
      // Obtén la próxima página de datos de la API
      const filtros = `&departamento=${busquedaFiltrada.departamento}&espacio=${busquedaFiltrada.espacio}&estado=${busquedaFiltrada.estado}&desde=${busquedaFiltrada.fechaInicio}&hasta=${busquedaFiltrada.fechaFin}`;
      console.log("Filtros:" + filtros)
      console.log("itemsPerPage:" + itemsPerPage)
      console.log("currentPage:" + currentPage)
 
      const nextPageData = await fetchReservas(filtros, itemsPerPage, currentPage, setLastPage);
      
      setEspaciosAPI([...espaciosAPI, ...nextPageData]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error al cargar más datos:', error);
      setIsLoading(false);
    }
};

// Funcion para manejar el scroll de la lista
const handleScroll = (event) => {
  const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
  let aux = scrollHeight - scrollTop - clientHeight;
  if (aux <=1){
    aux = 0;
  }
  setScrollPosition(aux)
  /*
  if (scrollHeight - scrollTop <= clientHeight + tolerance) {
  // Cuando el usuario ha llegado al final, carga más datos
  setCurrentPage(currentPage + 1);  
  console.log("estoy scrollllllll")
  }*/
};

   /* USE EFFECTS */
   useEffect(() => {
    if (scrollPosition === 0){
      let aux = Math.min(currentPage + 1,lastPage)

      setCurrentPage(aux); 
    }
    
    
  }, [scrollPosition]);

   useEffect(() => {
    
    loadMoreData();
  }, []);

  useEffect(() => {
    console.log("load more data")
    loadMoreData();
  }, [currentPage,filterChange]);

  useEffect(() => {
    setFilterChange(!filterChange)
    setEspaciosAPI([]);
    setCurrentPage(1)
  }, [busquedaFiltrada]);

  /* FIN USE EFFECTS */
 
 
  /*Aceptar Solicitud modal logica*/
  const [aceptarEspacio, setAceptarEspacio] = useState(false);
  const abrirModalAceptar=()=>{setAceptarEspacio(true);};
  const cerrarModalAceptar=()=>{setAceptarEspacio(false);};
  /*fin Rechazar Solicitud modal */
 
   /*Rechazar Solicitud modal logica*/
   const [rechazarEspacio, setRechazarEspacio] = useState(false);
   const abrirModalRechazar=()=>{setRechazarEspacio(true);};
   const cerrarModalRechazar=()=>{setRechazarEspacio(false);};
   /*fin Rechazar Solicitud modal */
 
   /*Logica seleccion del Evento*/
   const [espacioSeleccionado, setEspacioSeleccionado] = useState({});
 
 
   const editarEventoSeleccionado = (index)=>{
    /*    index = parseInt(index);
       setSocioSeleccionado(sociosApi[index]);
       console.log(`Se asigno para editar el index: ${index}`)
       abrirModalEditar(); */
       navigate(`/espacios/${espaciosAPI[index].id}/editar`);
     };

  const aceptarEspacioSeleccionado = (index)=>{
      index = parseInt(index);
      setEspacioSeleccionado(espaciosAPI[index]);
      console.log("Se selecciono para confirmar el espacio de index: %d y data: ",index,espacioSeleccionado)
      abrirModalAceptar();
  };
   
  const rechazarEspacioSeleccionado = (index)=>{
     index = parseInt(index);
     setEspacioSeleccionado(espaciosAPI[index]);
     console.log("Se selecciono para rechazar el espacio de index: %d y data: ",index,espacioSeleccionado)
     abrirModalRechazar();
   };



   //Evito que renderize algo que no existe
   if (!espaciosAPI) return null;//<<<-----
   
   const calcularEstadoDelIcono = () => {
    switch(espaciosAPI.estado){
      case "ACEPTADO":
        return 2;
      case "RECHAZADO":
        return 3;
      case "ACEPTADO-MODIFICADO":
          return 4;
      default:
      //case "PENDIENTE":
        return 1;
    }
}

  let itemsEspacios = espaciosAPI.map((espacio, index) => (
    /* console.log("eventos: ",espacio), */
    <ItemEspacio key={index} index={index} espacio={espacio} funcionAceptar={aceptarEspacioSeleccionado} funcionRechazar={rechazarEspacioSeleccionado} funcionEditar={editarEventoSeleccionado}  colorEstado={calcularEstadoDelIcono(espacio.estado)}
    />));


  const modalConfirmar = <ConfirmarReservaModal espacio={espacioSeleccionado}  mostrarModal={aceptarEspacio} cerrarModal={cerrarModalAceptar}/>

  const modalRechazar = <RechazarReservaModal espacio={espacioSeleccionado}  mostrarModal={rechazarEspacio} cerrarModal={cerrarModalRechazar}/>


  return (
    <React.StrictMode>
        <GlobalConteiner >
          <Header/>
          <Conteiner2>
            <Lateral/>
            <Conteiner>
              {/* Breadcrumbs  */}
              <Navegacion ruta="ESPACIOS"/>
              <div className="title">
                <h2 >Módulo Espacios Colaborativos</h2>
                <div className="title-line">
              </div>
              </div>
  
              <FiltradoEspacios aplicarFiltros={aplicarFiltros}/>

              <div className="cards-display" onScroll={handleScroll}>
                {itemsEspacios}
              </div>
              
              {modalConfirmar}
              {modalRechazar}
              
            </Conteiner> 
          </Conteiner2>
      </GlobalConteiner>
    </React.StrictMode>
  );
}

export default Espacios;