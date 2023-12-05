import React, { useEffect, useState} from 'react';
import FormularioVerEvento from '../components/formularioVerEvento';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importa Bootstrap JavaScript

import './modal.css';

function VerEventoModal({evento, index, funcionEditar, funcionEliminar, funcionInvitar,mostrarModalVer, cerrarModalVer, colorEstado }) {

  const [iconColorState, setIconColorState] = useState(colorEstado);

  useEffect(() => {
    setIconColorState(colorEstado);
  }, [colorEstado]);


  return (
  <React.StrictMode>
    {/*<!-- Botón para abrir el modal -->*/} 
    {/*<!-- Modal de Crear Socio -->*/}
    <div className={`modal modal-transparente ${mostrarModalVer ? 'show' : ''}`} tabIndex="-1" role="dialog" style= {{ display: mostrarModalVer ? 'block' : 'none' }}>
      <div className="modal-dialog modal-lg" >
        <div className="modal-content">
          <div className="modal-body">
          {/* TODO: cambiar este param depto por evento */}
          <FormularioVerEvento evento={evento} index={index} funcionEditar={funcionEditar} funcionEliminar={funcionEliminar} funcionInvitar={funcionInvitar} cerrarModal={cerrarModalVer} iconColorState={iconColorState} />
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

export default VerEventoModal;
