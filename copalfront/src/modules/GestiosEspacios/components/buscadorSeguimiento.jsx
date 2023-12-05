import "./buscadorSeguimiento.css";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../../includes/popper.js';
import './navhorizontal.css';
import React, { useEffect, useState } from 'react';


const apiUrl = process.env.REACT_APP_API_URL;

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
function BuscadorSeguimiento({aplicarFiltros}){
    // definicion de estados

    const [inputValue, setInputValue] = useState('');

    const [enviarBusqueda, setEnviarBusqueda] = useState(false);

    const enviarFiltro = () =>{
      setEnviarBusqueda(true);
    }


    useEffect(()=>{
      console.log('Se procesa la busqueda filtrada');
      let envio = {hash: inputValue};
      console.log(envio);
      //aplicarFiltros(envio);
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
                                           
                </div>   
            </div>
        </React.StrictMode>
        
        
    );
}

export default BuscadorSeguimiento;
