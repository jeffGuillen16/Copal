import React, { useState, useEffect } from "react";
import HeaderInvitacion from "../../components/header/headerInvitacion";
import FormularioInvitacion from "./components/formularioInvitacion";
import "./nuevoEvento.css";
import { CalendarIconLarge } from '../../components/icons'
import {useParams} from 'react-router-dom'
import {fetchEventoById} from './services/AxiosEventos'

/* const apiUrl = process.env.REACT_APP_API_URL; */

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

function InvitacionEvento() {

  
  const [evento,setEvento] = useState({});
  const { id } = useParams();

  useEffect(() => {
  fetchEventoById(id).then( event => 
      setEvento(event)
    )
    console.log("eventoInvitacion",evento);
  },[])

  const calcularFecha = (inputDate) => {
    const [year, month, day] = inputDate.split('-');
    return `${day}-${month}-${year}`;
  }
  
  return (
    <React.StrictMode>
        <HeaderInvitacion/>
        
          <div className="invitacion-evento-body">
            <div className="col-3 custom-padding"></div>
            <div className="col-6 custom-padding">
              <h2 className="title">{evento.nombre}</h2>
              <div className="title-line"></div>
              <div className="invitacion-evento-element-first">
                <div className="invitacion-evento-element-title">
                  {/*logo departamento*/}
                  <img style={{width: "172px", aspectRatio: "1/1"}} src={evento.linkDepartamento}  alt="imagen departamento"/>
                  {/*nombre departamento*/}
                  <span className="subtitle">{evento.departamento}</span>
                </div>
                <div  className="invitacion-evento-element-row">
                  <div className="invitacion-evento-element">
                    {/*fecha inicio*/}
                    <div className="invitacion-evento-element">
                      <label className="invitacion-evento-label">Fecha de inicio</label>
                      <span className="invitacion-evento-content">{evento.fechaInicio ? calcularFecha(evento.fechaInicio):"-"}</span>
                    </div>

                    {/*fecha fin*/}
                    <div className="invitacion-evento-element">
                      <label className="invitacion-evento-label">Fecha de fin</label>
                      <span className="invitacion-evento-content">{evento.fechaFin ? calcularFecha(evento.fechaFin):"-"}</span>
                    </div>

                  </div>
                  {/*horario*/}
                  <div className="invitacion-evento-element">
                    <label className="invitacion-evento-label">Horario</label>
                    <span className="invitacion-evento-content">{evento.horaInicio} - {evento.horaFin}</span>
                  </div>

                  {/*modalidad*/}
                  <div className="invitacion-evento-element">
                    <label className="invitacion-evento-label">Modalidad</label>
                    <span className="invitacion-evento-content">{evento.modalidad}</span>
                  </div>

                  <div className="invitacion-evento-element">
                    {/*lugar*/}
                    { (evento.modalidad == 'PRESENCIAL' || evento.modalidad == 'HIBRIDO') && 
                      <div className="invitacion-evento-element">
                        <label className="invitacion-evento-label">Lugar</label>
                        <span className="invitacion-evento-content">{evento.lugar}</span>
                      </div>
                    }
                    {/*link */}
                    { (evento.modalidad == 'VIRTUAL' || evento.modalidad == 'HIBRIDO') &&
                      <div className="invitacion-evento-element">
                        <label className="invitacion-evento-label">Link</label>
                        <span className="invitacion-evento-content">{evento.linkReunion}</span>
                      </div>
                    }
                    
                  </div>
                </div>  
                
                {/*descripcion*/}
                <div className="invitacion-evento-element">
                  <label className="invitacion-evento-label">Descripcion</label>
                  <text className="invitacion-evento-content" >{evento.descripcion}</text>
                </div>

              </div>
              
            </div>
          </div>  
          <FormularioInvitacion idEvento={evento.id} />
        
    </React.StrictMode>
  );
}

export default InvitacionEvento;
