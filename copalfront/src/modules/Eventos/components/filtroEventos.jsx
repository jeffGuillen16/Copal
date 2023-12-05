import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../../includes/popper.js';
import './navhorizontal.css';
import React, { useEffect, useState } from 'react';
import axios from "axios";


const apiUrl = process.env.REACT_APP_API_URL;

// componente quetransforma cada item que le llega a un checkbox - label
function Check({nombre,id, seleccionar}){
    const handleCheckboxChange = (event) => {
      seleccionar({
        id: id, 
        nombre: nombre,
        checked: event.target.checked, // Indica si el checkbox está marcado o desmarcado
      });
      console.log("cheked:", event.target.checked)
    };
    return (
        <li>
            <div className="form-check filter item">
                <input className="form-check-input" type="checkbox" id={id} name={nombre} onChange={handleCheckboxChange}/>
                <label className="form-check-label" for={nombre}>{nombre}</label>
            </div>
        </li>
    );
    
}

// componente que renderiza los elementos del filtro de departamentos
function FiltroDepartamentos({items, nombre, seleccionar, enviarFiltro}){
  let lista = [];
  //console.log(items);
  items.forEach((item, index) => {
      //console.log(item.nombreTipoSocio, item.id);
      lista.push(<Check key={index} nombre={item.nombre} id={item.id} seleccionar={seleccionar}/>);
  });
  return(
      <div className="dropdown filter input-group">
      <button className="btn dropdown-toggle filter"  data-bs-toggle="dropdown" aria-expanded="false">
      {nombre}
      </button>

      <ul className="dropdown-menu filter" onChange={enviarFiltro}>
          {lista}
      </ul>
      </div> 
  );
};

// componente que renderiza los elementos del filtro de modalidades
function FiltroModalidades({items, nombre, seleccionar, enviarFiltro}){
    let lista = [];
    //console.log(items);
    items.forEach((item, index) => {
        //console.log(item.nombre, item.id);
        lista.push(<Check key={index} nombre={item.nombre} id={item.id} seleccionar={seleccionar}/>);
    });
    

    return(
        <div className="dropdown filter input-group">
        <button className="btn dropdown-toggle filter"  data-bs-toggle="dropdown" aria-expanded="false">
        {nombre}
        </button>

        <ul className="dropdown-menu filter" onChange={enviarFiltro}>
            {lista}
        </ul>
        </div> 
    );
};

// componente que renderiza los elementos del filtro de estados
function FiltroEstados({items, nombre, seleccionar, enviarFiltro}){
  let lista = [];
  //console.log(items);
  items.forEach((item, index) => {
      //console.log(item.nombre, item.id);
      lista.push(<Check key={index} nombre={item.nombre} id={item.id} seleccionar={seleccionar}/>);
  });
  
  return(
      <div className="dropdown filter input-group">
      <button className="btn dropdown-toggle filter"  data-bs-toggle="dropdown" aria-expanded="false">
      {nombre}
      </button>

      <ul className="dropdown-menu filter" onChange={enviarFiltro}>
          {lista}
      </ul>
      </div> 
  );
};


// componente de busqueda por texto, en funcion del nombre del evento
function Buscar({inputValue, setInputValue, enviarFiltro}){
  const handleInputChange = (e) => {
    //console.log("Nombre socio: ", e.target.value);
    setInputValue(e.target.value);
    enviarFiltro()
  };
  return (
    <React.StrictMode>
      <div className="input-group ">
        <div
          className=" btn btn-outline-secondary custom-input "
          onClick={enviarFiltro}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="nav-list__feather feather-search"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>

        <input
          type="text"
          id="buscar"
          className=" form-control custom-input-text"
          placeholder="Buscar"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      
    </React.StrictMode>
  );
}

// funcion principal, la que devuelve lo que se termina renderizando en el componente eventos.jsx
function FiltradoEventos({aplicarFiltros}){
    // definicion de estados
    const [listadoTiposDepartamentos, setListadoTiposDepartamentos] = useState([]);
    const [listadoModalidades, setListadoModalidades] = useState([]);
    const [listadoEstados, setListadoEstados] = useState([]);

    useEffect(() => {
      //fetch de todas las listas necesarias para los filtros
        axios.get(apiUrl + 'ides/departamentos').then((response) => {
          const departamentosAux = response.data.map((departamento) => (
            {id:departamento.id, nombre: departamento.nombre}
            ));
          setListadoTiposDepartamentos(departamentosAux);
          console.log("deptosAux:",departamentosAux); 
        });
        axios.get(apiUrl + 'enums/modalidades').then((response) => {
          const modalidadesAux = response.data.map((modalidad) => (
            {nombre: modalidad}
            ));
          setListadoModalidades(modalidadesAux);
        });
        axios.get(apiUrl + 'enums/estados').then((response) => {
          const estadosAux = response.data.map((estado) => (
            {nombre: estado}
            ));
          setListadoEstados(estadosAux);
      });
    }, []);

    //estado DepartamentoSeleccionado
    const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState([]);

     // funcion para manejar que items de departamentos estan seleccionados y cuales no
    const seleccionarDepartamento = (departamento) => {
      if(departamento.checked){
        // Si checked es true, agrega el objeto a la lista
        setDepartamentoSeleccionado([...departamentoSeleccionado,departamento.id]);
        //console.log('se agrego el tipo de Socio de id=',departamento.id);
      } else {
        // Si checked es false, elimina el objeto de la lista agregando a una nueva lista todos menos el que tenga el nombre del campo deseleccionado, para luego setearlo en la lista de departamentos
        const nuevaLista = departamentoSeleccionado.filter((id) => id !== departamento.id);
        setDepartamentoSeleccionado(nuevaLista);
        //console.log('Se quito el tipo de socio de id=', departamento.id);
        
      }
    };
    
    //estado ModalidadSeleccionada
    const [modalidadSeleccionada, setModalidadSeleccionada] = useState([]);

    // funcion para manejar que items de modalidad estan seleccionados y cuales no
    const seleccionarModalidad = (modalidad) => {
      if(modalidad.checked && !modalidadSeleccionada.find(elem => elem == modalidad.nombre)){
        setModalidadSeleccionada([...modalidadSeleccionada, modalidad.nombre]);
        //console.log('Se agrego el modalidad de id=',modalidad.id);
      }
      else{
        // Si checked es false, elimina el objeto de la lista agregando a una nueva lista todos menos el que tenga el nombre del campo deseleccionado, para luego setearlo en la lista de modalidades
        const nuevaLista = modalidadSeleccionada.filter((nombre) => nombre !== modalidad.nombre);
        setModalidadSeleccionada(nuevaLista);
        //console.log('Se quito el modalidad de id=', modalidad.id);
      }
    };

    //estado EstadoSeleccionado
    const [estadoSeleccionado, setEstadoSeleccionado] = useState([]);

    // funcion para manejar que items de estado estan seleccionados y cuales no
    const seleccionarEstado = (estado) => {
      if(estado.checked && !estadoSeleccionado.find(elem => elem == estado.nombre)){
        setEstadoSeleccionado([...estadoSeleccionado, estado.nombre]);
        //console.log('Se agrego el estado de id=',estado.id);
      }
      else{
        // Si checked es false, elimina el objeto de la lista agregando a una nueva lista todos menos el que tenga el nombre del campo deseleccionado, para luego setearlo en la lista de estados
        const nuevaLista = estadoSeleccionado.filter((nombre) => nombre !== estado.nombre);
        setEstadoSeleccionado(nuevaLista);
        //console.log('Se quito el estado de id=', estado.id);
      }
    };

    const [inputValue, setInputValue] = useState('');

    const [enviarBusqueda, setEnviarBusqueda] = useState(false);

    const enviarFiltro = () =>{
      setEnviarBusqueda(true);
    }


    useEffect(()=>{
      console.log('Se procesa la busqueda filtrada');
      let envio = {nombre: inputValue, departamento:departamentoSeleccionado, modalidad: modalidadSeleccionada, estado:estadoSeleccionado, fechaInicio:"", fechaFin:""};
      console.log(envio);
      aplicarFiltros(envio);
      setEnviarBusqueda(false);
    },[enviarBusqueda])
    return (
        <React.StrictMode>
            <div className="container-fluid">
                <div className="row nav-socios">
                  
                      <div className="col-2">
                          {/*<!-- Contenido de la segunda fila, columna 1 -->*/}
                          <Buscar inputValue={inputValue} setInputValue={setInputValue} enviarFiltro={enviarFiltro}/>
                      </div>
                      <div className="col-3">
                          {/*<!-- Contenido de la segunda fila, columna 2 -->*/}
                          <FiltroDepartamentos nombre='Departamento' items={listadoTiposDepartamentos} seleccionar={seleccionarDepartamento} enviarFiltro={enviarFiltro}/>
                      </div>
                      <div className="col-2">
                          {/*<!-- Contenido de la segunda fila, columna 3 -->*/}
                          <FiltroModalidades nombre='Por modalidad' items={listadoModalidades} seleccionar={seleccionarModalidad} enviarFiltro={enviarFiltro}/>
                      </div>
                      <div className="col-2">
                          {/*<!-- Contenido de la segunda fila, columna 3 -->*/}
                          <FiltroEstados nombre='Por estados' items={listadoEstados} seleccionar={seleccionarEstado} enviarFiltro={enviarFiltro}/>
                      </div>
                      <div className=" col-3" id='boton-add-1'>
                        <a href='/eventos/nuevo' className="copal-button add-button">+ NUEVO EVENTO</a>
                      </div>      
                                           
                </div>   
            </div>
        </React.StrictMode>
        
        
    );
}

export default FiltradoEventos;