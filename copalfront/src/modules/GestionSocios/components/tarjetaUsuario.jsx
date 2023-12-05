import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './tarjetaSocios.css'; // Archivo CSS personalizado para agregar estilos adicionales
import {ViewIcon, EditIcon, DeleteIcon} from '../../../components/icons';

function TarjetaDepartamento({id,nombre, descripcion, index, funcionVer, funcionEditar, funcionEliminar, imagenUrl}) {
  return (
  <section className='container-global'>
    <section className="container-logo">
      {/* Zona 0: Imagen */}
      
      <div className="container-logo logo">
        <img src={imagenUrl} alt="Imagen centrada" className="img_logo " /> 
      </div>
      {/* <img src={logosocio} alt="Imagen centrada" className="img_logo" /> */}
    </section>
    <div className='container-info'>
        <div className='zona1-2'>
          {/* Zona 1: Denominacion / Nombre de la empresa */}
          <div className='zona1'>
            <label className='denominacion'>{nombre}</label>
          </div>
          {/* Zona 2: Descripción */}
          <div className="zona2">
            <p className="descripcion">{descripcion}</p>
          </div>
        </div>
        {/* Zona 3: Acciones de la card */}
        <div className='zona3'>
          <div className="container-actions">
            {/* Iconos de accion */}
              <a className='custom-icon' onClick={() => funcionVer(index)} >
                <ViewIcon/>
              </a>
              <a className='custom-icon' onClick={() => funcionEditar(index)} >
                <EditIcon/>
              </a>
              <a className='custom-icon' onClick={() => funcionEliminar(index)} >
                <DeleteIcon/>
              </a>
          </div>
        </div>
              
      </div>
  </section>
  );
}

export default TarjetaDepartamento;
