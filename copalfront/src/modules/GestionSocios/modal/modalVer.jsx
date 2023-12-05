import React from 'react';
import FormularioVer from '../components/formularioVer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importa Bootstrap JavaScript

import './modal.css';

function VerSocioModal({user, mostrarModalVer, cerrarModalVer}) {

  return (
  <React.StrictMode>
    {/*<!-- Botón para abrir el modal -->*/} 
    {/*<!-- Modal de Crear Socio -->*/}
    <div className={`modal modal-transparente ${mostrarModalVer ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: mostrarModalVer ? 'block' : 'none' }}>
      <div className="modal-dialog modal-xl" >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{`Ver Socio: ${user.denominacion}`}</h5>
            <button type="button" onClick={cerrarModalVer}  className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          <FormularioVer user={user}/>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={cerrarModalVer}>Cerrar</button>
            
          </div>
        </div>
      </div>
    </div>
  </React.StrictMode>
  );
}

export default VerSocioModal;
