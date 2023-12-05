import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './tarjetaDepartamento.css'; // Archivo CSS personalizado para agregar estilos adicionales
import {ViewIcon, EditIcon, DeleteIcon} from '../../../components/icons';

function TarjetaDepartamento({id,nombre, index, funcionVer, funcionEditar, funcionEliminar, imagenUrl, autoridades}) {
  return (
  <section className='container-global-departamento'>
      {/* Zona 0: Imagen */}
    <div className="container-presentacion">
      <img src={imagenUrl} alt="Imagen centrada" className="img_logo" />
      <label className='denominacion-depa'>{nombre}</label>
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
    <div className='container-line'/>
    <div className="container-info-departamento">
      {autoridades.map((autoridad)=>
        <div className='container-rol-nombre'>
          <p className='container-rol'>{autoridad.rol.nombre}</p> 
          <p className='container-nombre'>{autoridad.usuario.nombre}</p>
        </div>)}
    </div>
    
  </section>
  );
}

export default TarjetaDepartamento;
