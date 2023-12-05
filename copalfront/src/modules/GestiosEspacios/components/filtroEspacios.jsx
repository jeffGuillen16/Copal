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
function FiltroEspacios({items, nombre, seleccionar, enviarFiltro}){
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

// funcion principal, la que devuelve lo que se termina renderizando en el componente eventos.jsx
function FiltradoEspacios({aplicarFiltros}){
    // definicion de estados
    const [listadoTiposDepartamentos, setListadoTiposDepartamentos] = useState([]);
    const [listadoEspacios, setListadoEspacios] = useState([]);
    const [listadoEstados, setListadoEstados] = useState([]);

    useEffect(() => {
      //fetch de todas las listas necesarias para los filtros
        axios.get(apiUrl + 'ides/departamentos').then((response) => {
          const departamentosAux = response.data.map((departamento, index) => (
            {id:departamento.id, nombre: departamento.nombre}
            ));
          setListadoTiposDepartamentos(departamentosAux);
          console.log("deptosAux:",departamentosAux); 
        });
        axios.get(apiUrl + 'espacios').then((response) => {
          const espaciosAux = response.data.map((espacio, index) => (
            {id: index, nombre: espacio.nombre}
            ));
            setListadoEspacios(espaciosAux);
        });
        axios.get(apiUrl + 'estados/reservas').then((response) => {
          const estadosAux = response.data.map((estado, index) => (
            {id: index, nombre: estado}
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
    const [espacioSeleccionado, setEspacioSeleccionado] = useState([]);

    // funcion para manejar que items de modalidad estan seleccionados y cuales no
    const seleccionarEspacio = (espacio) => {
      if(espacio.checked && !espacioSeleccionado.find(elem => elem == espacio.nombre)){
        setEspacioSeleccionado([...espacioSeleccionado, espacio.nombre]);
        //console.log('Se agrego el espacio de id=',espacio.id);
      }
      else{
        // Si checked es false, elimina el objeto de la lista agregando a una nueva lista todos menos el que tenga el nombre del campo deseleccionado, para luego setearlo en la lista de modalidades
        const nuevaLista = espacioSeleccionado.filter((nombre) => nombre !== espacio.nombre);
        setEspacioSeleccionado(nuevaLista);
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


    const [enviarBusqueda, setEnviarBusqueda] = useState(false);

    const enviarFiltro = () =>{
      setEnviarBusqueda(true);
    }


    useEffect(()=>{
      console.log('Se procesa la busqueda filtrada');
      let envio = {departamento:departamentoSeleccionado, espacio: espacioSeleccionado, estado:estadoSeleccionado, fechaInicio:"", fechaFin:""};
      console.log(envio);
      aplicarFiltros(envio);
      setEnviarBusqueda(false);
    },[enviarBusqueda])
    return (
        <React.StrictMode>
            <div className="container-fluid">
                <div className="row nav-socios">
                      <div className="col-3">
                          {/*<!-- Contenido de la segunda fila, columna 2 -->*/}
                          <FiltroDepartamentos nombre='Departamento' items={listadoTiposDepartamentos} seleccionar={seleccionarDepartamento} enviarFiltro={enviarFiltro}/>
                      </div>
                      <div className="col-3">
                          {/*<!-- Contenido de la segunda fila, columna 3 -->*/}
                          <FiltroEspacios nombre='Por espacio' items={listadoEspacios} seleccionar={seleccionarEspacio} enviarFiltro={enviarFiltro}/>
                      </div>
                      <div className="col-3">
                          {/*<!-- Contenido de la segunda fila, columna 3 -->*/}
                          <FiltroEstados nombre='Por estados' items={listadoEstados} seleccionar={seleccionarEstado} enviarFiltro={enviarFiltro}/>
                      </div>
                      <div className=" col-3" id='boton-add-1'>
                        <a href='/espacios/invitacion' className="copal-button add-button">+ INVITACION</a>
                      </div>      
                                           
                </div>   
            </div>
        </React.StrictMode>
        
        
    );
}

export default FiltradoEspacios;