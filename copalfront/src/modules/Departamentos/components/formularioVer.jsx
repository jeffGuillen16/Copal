import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './Deptoforms.css';
import { CloseIcon } from '../../../components/icons'

const dept = {"id":2,"habilitado":true,"nombre":"Economía, Desarrollo Regional y PyME","descripcion":"Su objetivo es el diseño de propuestas y seguimiento en materia de políticas de desarrollo productivo, acceso al financiamiento y mejora de la competitividad de los sectores de la industria de alimentos y bebidas, en particular las economías regionales y el entramado PyME.","logo":{"id":2,"url":"http://localhost:8000/imagen/2"},"autoridades":[{"id":4,"habilitado":true,"usuario":{"id":10,"habilitado":true,"nombre":"Paulina Campion"},"rol":{"id":5,"habilitado":true,"nombre":"Jefe de Departamento"}},{"id":1,"habilitado":true,"usuario":{"id":7,"habilitado":true,"nombre":"Marcelo Ceretti"},"rol":{"id":1,"habilitado":true,"nombre":"Presidente"}},{"id":3,"habilitado":true,"usuario":{"id":9,"habilitado":true,"nombre":"Guillermo Assumma"},"rol":{"id":4,"habilitado":true,"nombre":"Vicepresidente de Financiamiento"}},{"id":2,"habilitado":true,"usuario":{"id":8,"habilitado":true,"nombre":"Alejandro Bestani"},"rol":{"id":3,"habilitado":true,"nombre":"Vicepresidente Pyme"}}],"coordinador":{"id":1,"habilitado":true,"nombre":"CDT","descripcion":"Coordinación de departamentos técnicos","logo":null,"autoridades":[]}}

const UserCard = ({ departamento, cerrarModal }) => {
  return (
    <React.StrictMode>
    <div className="container-fluid">
      <div className="row justify-content-center">
        
        <div className="col-lg-12">
          <div className="mb-4">

            <div className="cuerpo-vermas">
              <div className="modal_header">
                <h5 className="modal-title">{`${departamento.nombre}`}</h5>
                {/* <button type="button" onClick={cerrarModal}  className="btn-close close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                <a className='close' data-bs-dismiss="modal" onClick={cerrarModal}><CloseIcon/></a>
              </div>

              <div className="img-ctn">
                  <img className='dep-logo' src={departamento.logo.url} alt="imagen"/> 
              </div>
              <div className='depto-info-ctn'>

                <div className='depto-info-ctn__autoridades'>
                  <p className="mb-0 info-title">Autoridades</p>
                  <p className="mb-0 info-text">{departamento.autoridades.map((autoridad)=>
                    <div className='autoridad'>
                      <p className='autoridad__rol'>{autoridad.rol.nombre}</p> 
                      <p className='text-muted autoridad__user'>{autoridad.usuario.nombre}</p>
                    </div>)}
                  </p>
                </div>

                <div className='depto-info-ctn__descripcion'>
                  <p className="mb-0 info-title">Descripcion</p>
                  <p className="text-muted mb-0 info-text">{departamento.descripcion}</p>
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

export default UserCard;

