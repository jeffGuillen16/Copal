import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './itemEspacio.css'; // Archivo CSS personalizado para agregar estilos adicionales
import {EditIcon, CheckIcon, XIcon, SpacesIconMedium} from '../../../components/icons';

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

function ItemEspacio({espacio, index,funcionAceptar, funcionRechazar, funcionEditar, colorEstado}) {

  const [iconColorState, setIconColorState] = useState(colorEstado);

  useEffect(() => {
    setIconColorState(colorEstado);
  }, [colorEstado]);

  const calcularFecha = (inputDate) => {
    const [year, month, day] = inputDate.split('-');
    return `${day}-${month}-${year}`;
  }

  const calculoHoraFin = (horaInicioInput, duracion) => {
    const [hora, minutos] = horaInicioInput.split(':').map(Number);
    let horaFin = hora + duracion;
  
    if (horaFin >= 24) {
      horaFin = horaFin - 24;
    }
  
    return `${horaFin.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
  }


  if(!espacio){
    return <h1>Cargando datos...</h1>
  }


  return (
  <section className={`container-space-global-evento`} style={{borderBottom:`2px solid ${espacio.estado.hexColor}`}}>
      {/* Hasta 1200px de ancho se visualiza bien, pasar a partir de aca a modo tablet/mobile */}
    <div className="container-presentacion-evento">
      <div className={`item-logo state-space-color-`} style={{color:espacio.estado.hexColor}}>
        <SpacesIconMedium/>  
      </div>
      <div className='info-espacio-ctn'>
      <div className='title-ctn' >
        <span className='card-title'>{espacio.departamento}</span>
        <div className='hash-ctn'>
          {
            //console.log(espacio.codigoSeguimiento)
          }
          <span className='hash'>{espacio.codigoSeguimiento}</span>
        </div>
      </div>

        <div className='col-container'>
          <div className="subitem-space-col-container" id='subitem-space-ctn-1'>
              <div className='subitem-evento-top'>
                  <label className='subitem-evento-titulo'>Espacio Reservado</label>
                  <span className='subitem-evento-info-strong'>{espacio.espacio}</span>
              </div>
              <div className='subitem-evento-bottom'>
                  <label className='subitem-evento-titulo'>Dirección</label>
                  <span className='subitem-evento-info'>{espacio.direccion}</span>
              </div>
          </div>

          <div className="subitem-space-col-container" id='subitem-space-ctn-2'>
          <div className='subitem-evento-bottom'>
                  <label className='subitem-evento-titulo'>Responsable</label>
                  <span className='subitem-evento-info'>{espacio.nombreDelResponsable}</span>
              </div>
              <div className='subitem-evento-top'>
                  <label className='subitem-evento-titulo'>Fecha</label>
                  <span className='subitem-evento-info'>{calcularFecha(espacio.fecha)}</span>
              </div>
          </div>

          <div className="subitem-space-col-container">
              <div className='subitem-evento-top'>
                  <label className='subitem-evento-titulo'>Estado</label>
                  <span className='subitem-evento-info'>{espacio.estado.nombre}</span>
              </div>
              <div className='subitem-evento-bottom'>
                  <label className='subitem-evento-titulo'>Horario</label>
                  <span className='subitem-evento-info'>{espacio.horaInicio} - {calculoHoraFin(espacio.horaInicio, espacio.duracion)}</span>
              </div>
          </div>

          <div className="subitem-space-col-container">
              <div className='subitem-evento-top'>
                  <label className='subitem-evento-titulo'>Recursos</label>
                    <div className='subitem-evento-info-scroll'>
                      {espacio.recursosReservados.map((recurso)=>{
                        return(
                          <span key={recurso.id}>x{recurso.cantidadAceptada} - {recurso.nombre}</span>
                        )
                      })}
                    
                    </div>
              </div>
          </div>
        </div>
      </div>
      
      {
        espacio.estado.nombre == "PENDIENTE"?
      <div className="container-actions">
        {/* Iconos de accion */}
          <a className='custom-icon' onClick={() => funcionAceptar(index)} >
            <CheckIcon/>
          </a>
          <a className='deleted-icon' onClick={() => funcionRechazar(index)} >
            <XIcon/>
          </a>
          <a className='custom-icon' onClick={() => funcionEditar(index)} >
            <EditIcon/>
          </a>
      </div>
      :
      /* Ver si dejar o no este espacio vacio cuando no hay botones */
      <div className="container-actions">

      </div>
      }
    </div>
    
  </section>
  );
}

export default ItemEspacio;
