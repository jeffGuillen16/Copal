import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';

import Lateral from "../../components/lateral/lateral";
import Header from "../../components/header/header";
import Conteiner2 from '../../components/conteiners/conteiner210';
import Conteiner from '../../components/conteiners/conteiner100';
import Navegacion from '../../components/navhorizontal/navhorizontal';
import GlobalConteiner from '../../components/conteiners/globalConteiner';
import FiltradoEventos from './components/filtroEventos';
import ItemEvento from './components/ItemEvento';
import VerEventoModal from './modal/modalVer';
import EliminarEventoModal from './modal/modalEliminar';
import {fetchEventos} from './services/AxiosEventos'
/* import Paginacion from '../../components/paginacion'; */

import './gestionEventos.css'

/* const eventoDefault = {
  id: 1,
  nombre: "",
  descripcion: "",
  lugar: "",
  linkRegistro: "",
  linkReunion: "",
  modalidad: "",
  estado: "",
  fechaInicio: "",
  fechaFin: "",
  horaInicio: "",
  horaFin: "",
  invitados: [],
  departamento: ""
}; */

function Eventos() {
  const navigate = useNavigate();

  /* Filtros */
  let busqueda = {nombre:"",departamento:"", modalidad:"", estado:"", fechaInicio:"", fechaFin:""};
  const [busquedaFiltrada, setBusquedaFiltrada] = useState(busqueda);
  
  const aplicarFiltros = (envioParametros) =>{
    setBusquedaFiltrada(prevState => ({
      ...prevState,
      departamento: envioParametros.departamento.join(','),
      modalidad: envioParametros.modalidad,
      estado: envioParametros.estado.join(','), 
      fechaInicio: envioParametros.fechaInicio,
      fechaFin: envioParametros.fechaFin,
      nombre: envioParametros.nombre
    }), () => {
      console.log('Se envio la solicitud');
      // Esto recargará la página actual sin eliminar el historial
    });
    // Esto recargará la página actual sin eliminar el historial
    
}

  /*API LLAMADAS */
  const [eventosAPI, setEventosAPI] = useState(null);
  const [filterChange, setFilterChange] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 5;  // Cantidad de elementos por página

  const[scrollPosition,setScrollPosition] = useState(1)
  const [lastPage, setLastPage] = useState(5);
  
  /* useEffect(() => {
    const filtros = `&nombre=${busquedaFiltrada.nombre}&departamento=${busquedaFiltrada.departamento}&modalidad=${busquedaFiltrada.modalidad}&estado=${busquedaFiltrada.estado}&desde=${busquedaFiltrada.fechaInicio}&hasta=${busquedaFiltrada.fechaFin}`; //&nombre=${busquedaFiltrada.nombre}&modalidad=${busquedaFiltrada.modalidad}&estado=${busquedaFiltrada.estado}&desde=10-10-2023&hasta=29-10-2023
    (async () => {
      try {
        const data = await fetchEventos(filtros);
        setEventosAPI(data);
      } catch (error) {
        console.error('Error al obtener los eventos:', error);
      }
    })();
  }, [busquedaFiltrada]); */


  const loadMoreData = async () => {
    // Calcula el índice inicial y final para la próxima página de datos
    console.log("currentPage:" + currentPage)
    console.log("isLoading:" + isLoading)
    console.log("lastPage:" + lastPage)
    if (currentPage > lastPage ) return; // Evita solicitudes múltiples simultáneas
    setIsLoading(true);

    try {
      // Obtén la próxima página de datos de la API
      const filtros = `&nombre=${busquedaFiltrada.nombre}&departamento=${busquedaFiltrada.departamento}&modalidad=${busquedaFiltrada.modalidad}&estado=${busquedaFiltrada.estado}&desde=${busquedaFiltrada.fechaInicio}&hasta=${busquedaFiltrada.fechaFin}`;
      console.log("Filtros:" + filtros)
      console.log("itemsPerPage:" + itemsPerPage)
      console.log("currentPage:" + currentPage)
 
      const nextPageData = await fetchEventos(filtros, itemsPerPage, currentPage, setLastPage);
      
      setEventosAPI([...eventosAPI, ...nextPageData]);
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
    setEventosAPI([]);
    setCurrentPage(1)
  }, [busquedaFiltrada]);

  /* FIN USE EFFECTS */
 

  /* FIN API LLAMADAS */
 
   /*Mostrar Ver socio logica*/
   const [verEvento, setVerEvento] = useState(false);
   const [indexModalEvento, setIndexModalEvento] = useState(0);
   const cerrarModalVer = ()=>{setVerEvento(false);};
   /*fin Ver Evento seleccionado */
 
   /*Eliminar Evento modal logica*/
   const [eliminarEvento, setEliminarEvento] = useState(false);
   const abrirModalEliminar=()=>{setEliminarEvento(true);};
   const cerrarModalEliminar=()=>{setEliminarEvento(false);};
   /*fin eliminar Evento modal */
 
   /*Logica seleccion del Evento*/
   const [eventoSeleccionado, setEventoSeleccionado] = useState({});
 
   const verEventoSeleccionado = (index)=>{
    index = parseInt(index);
    setEventoSeleccionado(eventosAPI[index]);
    console.log(`Se asigno para ver el index: ${index}`)
    setVerEvento(true);
    setIndexModalEvento(index);
   };
 
   const editarEventoSeleccionado = (index)=>{
    /*    index = parseInt(index);
       setSocioSeleccionado(sociosApi[index]);
       console.log(`Se asigno para editar el index: ${index}`)
       abrirModalEditar(); */
       navigate(`/eventos/${eventosAPI[index].id}/editar`);
     };
   
   const eliminarEventoSeleccionado = (index)=>{
     index = parseInt(index);
     setEventoSeleccionado(eventosAPI[index]);
     console.log(`Se asigno para eliminar el index: ${index}`)
     abrirModalEliminar();
   };

   const invitarEventoSeleccionado = (index)=>{
    index = parseInt(index);
    setEventoSeleccionado(eventosAPI[index]);
    /* TODO: asignar la ruta en base a la id */
    /* navigate(`/eventos/${eventosAPI[index].id}/editar`); */
    navigate(`/eventos/${eventosAPI[index].id}/invitacion`);
  };


   //Evito que renderize algo que no existe
   if (!eventosAPI) return null;//<<<-----
   
  const calcularEstadoDelIcono = (estado) => {
    switch(estado){
      case "SUSPENDIDO":
        return 2;
      case "FINALIZADO":
        return 3;
      case "CANCELADO":
        return 4;
      case "INICIADO":
        return 5;
      default:
      //case "ACTIVO":
        return 1;
    }
  }

  let itemsEventos = eventosAPI.map((evento, index) => (
    /* console.log("eventos: ",evento), */
    <ItemEvento key={index} index={index} evento={evento} funcionVer={verEventoSeleccionado} 
      funcionEditar={editarEventoSeleccionado} funcionEliminar={eliminarEventoSeleccionado} funcionInvitar={invitarEventoSeleccionado} colorEstado={calcularEstadoDelIcono(evento.estado)}
    />));

const modalVer = <VerEventoModal evento={eventoSeleccionado} index={indexModalEvento} funcionEditar={editarEventoSeleccionado} funcionEliminar={eliminarEventoSeleccionado} funcionInvitar={invitarEventoSeleccionado}  mostrarModalVer={verEvento} cerrarModalVer={cerrarModalVer} colorEstado={calcularEstadoDelIcono(eventoSeleccionado.estado)} />

const modalEliminar = <EliminarEventoModal evento={eventoSeleccionado}  mostrarModal={eliminarEvento} cerrarModal={cerrarModalEliminar}/>

  return (
    <React.StrictMode>
        <GlobalConteiner >
          <Header/>
          <Conteiner2>
            <Lateral/>
            <Conteiner>
              {/* Breadcrumbs  */}
              <Navegacion ruta="EVENTOS"/>
              <div className="title">
                <h2 >Módulo de Eventos</h2>
                <div className="title-line">
              </div>
              </div>
  
              <FiltradoEventos aplicarFiltros={aplicarFiltros}/>

              <div className="cards-display" onScroll={handleScroll}>
                {itemsEventos}
              </div>

              {modalVer}
              {modalEliminar}
              
              
            </Conteiner> 
          </Conteiner2>
      </GlobalConteiner>
    </React.StrictMode>
  );
}

export default Eventos;