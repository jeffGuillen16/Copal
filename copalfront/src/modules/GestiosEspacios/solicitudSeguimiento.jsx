// solicitudSeguimiento.js
import React, { useState } from "react";
//import BuscadorSeguimiento from "./components/buscadorSeguimiento";
import Header from "../../components/header/header";
import "./nuevoSolicitud.css";
import {reservaHash} from './services/AxiosReservas'


const SolicitudSeguimiento = () => {

  const [inputValue, setInputValue] = useState('');
  const [reserva, setReserva] = useState();
  

  const handleInputChange = (e) => {
    //console.log("Nombre socio: ", e.target.value);
    setInputValue(e.target.value);
  };

  
  function buscarReserva(hash){ (async () => {
      try {
        const data = await reservaHash(hash);
        setReserva(data);
      } catch (error) {
        console.error('Error al obtener los eventos:', error);
      }
    })();
  }

  return (
    <React.StrictMode>
      <Header />
      <div className="contenedorSeguimiento">
        <div className="invitacion-body">
          <div className="col-4 custom-padding"></div>
          <div className="col-4 custom-padding">
            <h2 className="title">Buscar</h2>
            <div className="title-line"></div>
            <div className="container-fluid">
                <div className="row nav-socios">
                      <div className="">
                          {/*<!-- Contenido de la segunda fila, columna 1 -->*/}
                          <div className="input-group ">
                            <div
                              className=" btn btn-outline-secondary custom-input "
                              onClick={() => buscarReserva(inputValue)}
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
                              required
                              value={inputValue}
                              onChange={handleInputChange}
                            />
                          </div>
                      </div>             
                </div>   
            </div>
            {!reserva ? null : <>
            <div className="conteinerColumnFirst">
                <img
                  src={reserva.linkDepartamento}
                  alt="Imagen centrada"
                  className="img_logo"
                />
            </div>
            <div className="conteiner">
              <div className="conteinerColumnSecond">
                <div>
                  <div className="textfirst">Estado</div>
                  <div className="textsecond"></div>{reserva.estado.nombre}
                </div>
                <div>
                  <div className="textfirst">Organiza</div>{" "}
                  <div className="textsecond">
                    {reserva.departamento}
                  </div>
                </div>
                <div>
                  <div className="textfirst">Espacio</div>{" "}
                  <div className="textsecond">{reserva.espacio}</div>
                </div>
                <div>
                  <div className="textfirst">Dirección</div>{" "}
                  <div className="textsecond">{reserva.direccion}</div>
                </div>
                <div>
                  <div className="textfirst">Nombre Completo</div>{" "}
                  <div className="textsecond">{reserva.nombreDelResponsable }</div>
                </div>
                <div>
                  <div className="textfirst">Email</div>{" "}
                  <div className="textsecond">{reserva.mail}</div>  
                </div>
                <div>
                  <div className="textfirst">Fecha de la reserva</div>{" "}
                  <div className="textsecond">{reserva.fecha}</div>
                </div>
                <div className="textConteiner">
                  <div className="firstColumn">
                    <div className="textfirst">Horario</div>
                    <div>{reserva.horaInicio}</div>
                  </div>
                  <div className="secondColumn">
                    <div className="textfirst">Duracion</div>
                    <div className="texsecond">{reserva.duracion}</div>
                  </div>
                </div>
              </div>
              <div class="invitados">
                <p class="textfirst">
                  Recursos reservados
                </p>
                <div class="recursos-lista">
                  {reserva.recursosReservados.map( (recurso) => (
                    <div class="invitados-list-item">
                      <div class="invitados-list-item-empresa-nombre">
                        <p class="invitados-list-item-label"> Estado: {recurso.estado} </p> 
                        <p class="invitados-list-item-nombre"> {recurso.cantidadAceptada} x {recurso.nombre}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div> </>}
          </div>
        </div>
      </div>
    </React.StrictMode>
  );
};

export default SolicitudSeguimiento;
