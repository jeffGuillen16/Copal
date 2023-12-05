import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Formularioeliminar from '../components/formularioelimnar';
//import FormularioExito from '../components/formSuccess';
import './modal.css';
import {deleteDepartamento} from '../../../servicios/servicioEliminar';
function ModalEliminar({departamento, mostrarModal, cerrarModal}) {
  //let formulario = (<FormularioExito titulo={`Se elimino a ${departamento.nombre} con exito`}/>);
  //Creamos esta funcion para cuando haga clik en el boton Eliminar
  const handleDeleteClick = (id) => {
    deleteDepartamento(id).then((success) => {
      window.location.reload();
    });
  };
  
  return (
  <React.StrictMode>
    <div className={`modal modal-transparente ${mostrarModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: mostrarModal ? 'block' : 'none' }}>
      <div className="modal-dialog modal-dm" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Estas por eliminar un departamento</h5>
            <button type="button" onClick={cerrarModal}  class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          <Formularioeliminar name={departamento.nombre} id={departamento.id}/>
          
          </div>
          <div className="modal-footer">
            <button type="button" className="copal-button-white" onClick={cerrarModal}>Cancelar</button>
            <button type="button" className="copal-button-red" onClick={()=>handleDeleteClick(departamento.id)}>Eliminar</button>
          </div>
        </div>
      </div>
    </div>



  </React.StrictMode>
  );
}

export default ModalEliminar;