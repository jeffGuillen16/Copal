import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './itemEvento.css'; // Archivo CSS personalizado para agregar estilos adicionales
import {ViewIcon, EditIcon, DeleteIcon, CalendarIconMedium, LinkIcon} from '../../../components/icons';

// id: 1,
// nombre: "",
// descripcion: "",
// lugar: "",
// linkRegistro: "",
// modalidad: "",
// estado: "",
// fechaInicio: "",
// fechaFin: "",
// horaInicio: "",
// horaFin: "",
// invitados: []

function ItemEvento({evento, index, funcionVer, funcionEditar, funcionEliminar, funcionInvitar, colorEstado}) {

  const [iconColorState, setIconColorState] = useState(colorEstado);

  useEffect(() => {
    setIconColorState(colorEstado);
  }, [colorEstado]);

  const calcularFecha = (inputDate) => {
    const [year, month, day] = inputDate.split('-');
    return `${day}-${month}-${year}`;
  }

  if(!evento){
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
  <section className={`container-global-evento card-color-${iconColorState}`}>
      {/* Hasta 1120px de ancho se visualiza bien, pasar a partir de aca a modo tablet/mobile */}
    <div className="container-presentacion-espacio">
      <div className={`item-logo state-color-${iconColorState}`}>
        <CalendarIconMedium/>  
      </div>

      <div className="subitem-col-container" id='subitem-ctn-1'>
          <div className='subitem-evento-top'>
              <label className='subitem-evento-titulo'>Nombre del Evento</label>
              <span className='subitem-evento-info-strong'>{evento.nombre}</span>
          </div>
          <div className='subitem-evento-bottom'>
              <label className='subitem-evento-titulo'>Departamento</label>
              <span className='subitem-evento-info'>{evento.departamento}</span>
          </div>
      </div>

      <div className="subitem-col-container" id='subitem-ctn-2'>
          {direccionesEvento(evento)}
          <div className='subitem-evento-bottom'>
              <label className='subitem-evento-titulo'>Fecha Inicio</label>
              <span className='subitem-evento-info'>{calcularFecha(evento.fechaInicio)}</span>
          </div>
      </div>

      <div className="subitem-col-container">
          <div className='subitem-evento-top'>
              <label className='subitem-evento-titulo'>Modalidad</label>
              <span className='subitem-evento-info'>{evento.modalidad}</span>
          </div>
          <div className='subitem-evento-bottom'>
              <label className='subitem-evento-titulo'>Fecha Fin</label>
              <span className='subitem-evento-info'>{calcularFecha(evento.fechaFin)}</span>
          </div>
      </div>

      <div className="subitem-col-container">
          <div className='subitem-evento-top'>
              <label className='subitem-evento-titulo'>Estado</label>
              <span className='subitem-evento-info'>{evento.estado}</span>
          </div>
          <div className='subitem-evento-bottom'>
              <label className='subitem-evento-titulo'>Horario</label>
              <span className='subitem-evento-info'>{evento.horaInicio} - {evento.horaFin}</span>
          </div>
      </div>

      <div className="container-actions">
        {/* Iconos de accion */}
          <a className='custom-icon' onClick={() => funcionInvitar(index)} >
            <LinkIcon/>
          </a>
          <a className='custom-icon' onClick={() => funcionVer(index)} >
            <ViewIcon/>
          </a>
          <a className='custom-icon' onClick={() => funcionEditar(index)} >
            <EditIcon/>
          </a>
          <a className='deleted-icon' onClick={() => funcionEliminar(index)} >
            <DeleteIcon/>
          </a>
      </div>
    </div>
    
  </section>
  );
}

export default ItemEvento;
