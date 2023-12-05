import React from 'react';
import FormularioVer from '../components/formularioVer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importa Bootstrap JavaScript

import './modal.css';

function VerDepartamentoModal({departamento, mostrarModalVer, cerrarModalVer}) {

  return (
  <React.StrictMode>
    {/*<!-- Botón para abrir el modal -->*/} 
    {/*<!-- Modal de Crear Socio -->*/}
    <div className={`modal modal-transparente ${mostrarModalVer ? 'show' : ''}`} tabIndex="-1" role="dialog" style= {{ display: mostrarModalVer ? 'block' : 'none' }}>
      <div className="modal-dialog modal-lg" >
        <div className="modal-content">
          <div className="modal-body">
          <FormularioVer departamento={departamento} cerrarModal={cerrarModalVer}/>
          </div>
          <div className="modal-footer">
            <button type="button" className="copal-button" onClick={cerrarModalVer}>Cerrar</button>
            
          </div>
        </div>
      </div>
    </div>
  </React.StrictMode>
  );
}

export default VerDepartamentoModal;
