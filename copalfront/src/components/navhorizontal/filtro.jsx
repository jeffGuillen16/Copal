import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Asegúrate de incluir el archivo JavaScript de Bootstrap
import '../../includes/popper.js';
import './navhorizontal.css';
import React, { useEffect, useState } from 'react';
import axios from "axios";

//import Lupa from './buscar.png';
const apiUrl = process.env.REACT_APP_API_URL;

function Check({nombre,id, seleccionar}){
    const handleCheckboxChange = (event) => {
      seleccionar({
        id: id, // Utiliza key como identificador único o cualquier otro valor que debas usar
        nombre: nombre,
        checked: event.target.checked, // Indica si el checkbox está marcado o desmarcado
      });
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


function FiltroAreas({items, nombre, seleccionar, enviarFiltro}){
    let lista = [];
    //console.log(items);
    items.forEach(item => {
        //console.log(item.nombre, item.id);
        lista.push(<Check nombre={item.nombre} id={item.id} seleccionar={seleccionar}/>);
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

function FiltroTipos({items, nombre, seleccionar, enviarFiltro}){
    let lista = [];
    //console.log(items);
    items.forEach(item => {
        //console.log(item.nombreTipoSocio, item.id);
        lista.push(<Check nombre={item.nombreTipoSocio} id={item.id} seleccionar={seleccionar}/>);
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
/*
<button className="btn btn-outline-secondary btn-rounded" type="button">
                    <input type="submit" className='btn btn-outline-secondary'/>
                    <img
                    src={Lupa}
                    alt="Lupa"
                    className="img-fluid"
                    />
                </button>
*/



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


function Filtrado({aplicarFiltros}){
    const [listadoTiposSocio, setListadoTiposSocio] = React.useState([]);
    const [listadoAreas, setListadoAreas] = React.useState([]);

    React.useEffect(() => {
        
        axios.get(apiUrl + 'areas').then((response) => {
            setListadoAreas(response.data);
        });
        axios.get(apiUrl + 'tiposSocio').then((response) => {
            setListadoTiposSocio(response.data);
        });
    }, []);

    const [tipoDeSocio, setTipoDeSocio] = useState([]);

    const seleccionarSocio = (tipoSocio) => {
      if (tipoSocio.checked === true) {
        // Si checked es true, agrega el objeto a la lista
        setTipoDeSocio([...tipoDeSocio,tipoSocio.id]);
        //console.log('se agrego el tipo de Socio de id=',tipoSocio.id);
      } else {
        // Si checked es false, elimina el objeto de la lista
        const nuevaLista = tipoDeSocio.filter((id) => id !== tipoSocio.id);
        setTipoDeSocio(nuevaLista);
        //console.log('Se quito el tipo de socio de id=', tipoSocio.id);
        
      }
    };
    
    
    const [areaSeleccionada, setAreaSeleccionada] = useState([]);
    const seleccionarArea = (area) => {
      if(area.checked){
        setAreaSeleccionada([...areaSeleccionada, area.id]);
        //console.log('Se agrego el area de id=',area.id);
      }
      else{
        const nuevaLista = areaSeleccionada.filter((id) => id !== area.id);
        setAreaSeleccionada(nuevaLista);
        //console.log('Se quito el area de id=', area.id);
      }
    };

    const [inputValue, setInputValue] = useState('');

    const [enviarBusqueda, setEnviarBusqueda] = useState(false);

    const enviarFiltro = () =>{
      setEnviarBusqueda(true);
    }


    useEffect(()=>{
      console.log('Se procesa la busqueda filtrada');
      let envio = {tipoSocio:tipoDeSocio, areas: areaSeleccionada, denominacion: inputValue};
      console.log(envio);
      aplicarFiltros(envio);
      setEnviarBusqueda(false);
    },[enviarBusqueda])
    return (
        <React.StrictMode>
            <div className="container-fluid">
                <div className="row nav-socios">
                  
                      <div className="col-3">
                          {/*<!-- Contenido de la segunda fila, columna 1 -->*/}
                          <Buscar inputValue={inputValue} setInputValue={setInputValue} enviarFiltro={enviarFiltro}/>
                      </div>
                      <div className="col-3">
                          {/*<!-- Contenido de la segunda fila, columna 2 -->*/}
                          <FiltroTipos nombre='Tipo de Socio' items={listadoTiposSocio} seleccionar={seleccionarSocio} enviarFiltro={enviarFiltro}/>
                      </div>
                      <div className="col-3">
                          {/*<!-- Contenido de la segunda fila, columna 3 -->*/}
                          <FiltroAreas nombre='Por areas' items={listadoAreas} seleccionar={seleccionarArea} enviarFiltro={enviarFiltro}/>
                      </div>
                      <div className=" col-3">
                        <a href='/socios/nuevo' className="copal-button add-button">+ NUEVO SOCIO</a>
                      </div>      
                                           
                </div>   
            </div>
        </React.StrictMode>
        
        
    );
}

export default Filtrado;