import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./forms.css";
import {
  CloseIcon,
  CalendarIconLarge,
  LinkIcon,
  EditIcon,
  DeleteIcon
} from "../../../components/icons";



const FormularioVerEvento = ({ evento,index, funcionEditar, funcionEliminar, funcionInvitar ,cerrarModal, iconColorState }) => {
  
  if(!evento){
    return <h1>Cargando datos...</h1>
  }

  if(!evento.invitados){
    return <h1>Cargando datos...</h1>
  }

  const direccionesEvento = (evento) => {
    if(evento.modalidad == "VIRTUAL"){
      return(
        <div className='subitem-evento-top'> 
          <label className='subitem-evento-titulo'>Link Reunion</label>
          <a href={`${evento.linkReunion}`} target="_blank" rel="noopener noreferrer" className='subitem-evento-info'>{evento.linkReunion}</a>
        </div>
      )
    }else if(evento.modalidad == "PRESENCIAL"){
      return(
      <div className='subitem-evento-top'> 
          <label className='subitem-evento-titulo'>Lugar</label>
          <span className='subitem-evento-info'>{evento.lugar}</span>
      </div>
      )
    }else{
      return(
      <div className='subitem-evento-top'> 
        <label className='subitem-evento-titulo'>Lugar - Link</label>
        <span className='subitem-evento-info'>{evento.lugar}</span>
        <a href={`${evento.linkReunion}`} target="_blank" rel="noopener noreferrer" className='subitem-evento-info'>{evento.linkReunion}</a>
      </div>
      )
    }
  }

  
  return (
    <React.StrictMode>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="mb-4">
              <div className="cuerpo-vermas">
                <div className="modal_header">
                  <h5 className="modal-title">{`${evento.nombre}`}</h5>
                  {/* <button type="button" onClick={cerrarModal}  className="btn-close close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                  <a
                    className="close"
                    data-bs-dismiss="modal"
                    onClick={cerrarModal}
                  >
                    <CloseIcon />
                  </a>

                </div>

                <div className="event-info-ctn__autoridades">
                  <div className="event-info-ctn">
                      <div className={`img-ctn state-color-${iconColorState}`}>
                        <CalendarIconLarge />
                      </div>
                    <div className="container-actions-view">
                      {/* Iconos de accion */}
                        <a className='custom-icon' onClick={() => funcionInvitar(index)} >
                          <LinkIcon/>
                        </a>
                        <a className='custom-icon' onClick={() => funcionEditar(index)} >
                          <EditIcon/>
                        </a>
                        <a className='custom-icon' onClick={() => funcionEliminar(index)} >
                          <DeleteIcon/>
                        </a>
                    </div>
                  </div>

                  <div className="depto-info-ctn__info">
                    <div>
                      <div className="datos__container">
                        <div>
                          <p className="info-title">Nombre del evento</p>
                          <p className="info-text">
                            {evento.nombre}
                          </p>
                        </div>
                        <div>
                          <p className="info-title">Fecha de Inicio</p>
                          <p className="info-text">{evento.fechaInicio}</p>
                        </div>
                      </div>

                      <div className="datos__container">
                        <div>
                          <p className="info-title">Departamento</p>
                          <p className="info-text">
                            {evento.descripcion}
                          </p>
                        </div>
                        <div>
                          <p className="info-title">Fecha de Final</p>
                          <p className="info-text">{evento.fechaFin}</p>
                        </div>
                      </div>

                      <div className="datos__container">
                        <div>
                          <p className="info-title">Modalidad</p>
                          <p className="info-text">{evento.modalidad}</p>
                        </div>
                        {direccionesEvento(evento)}
                      </div>
                    </div>

                    <div className="descripcion">
                      <p className="mb-0 info-title">Descripcion</p>
                      <p className="mb-0 info-text">
                        {evento.descripcion}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="invitados"> 
                      <p className="info-title-invitados">Invitados</p>
                      <div className="invitados-list"> 

                        { 
                          evento.invitados.map((invitado, inde1)=>{
                          return(
                            <div className="invitados-list-item" key={inde1}>
                              <div className="invitados-list-item-empresa-nombre">
                               <p className="invitados-list-item-empresa"> {invitado.empresa}</p>
                               <p className="invitados-list-item-nombre"> {invitado.nombre} {invitado.apellido}</p>
                               </div>
                            </div>
                          );
                        })} 
                        
                      </div>
                    </div> 

              </div>
            </div>
          </div>
        </div>
      </div>
    </React.StrictMode>
  );
};

export default FormularioVerEvento;
