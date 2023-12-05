import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormularioeliminarEvento from '../components/formularioEliminarEvento';
//import FormularioExito from '../components/formSuccess';
import './modal.css';
import {deleteEventos} from '../../../servicios/servicioEliminar';

function EliminarEventoModal({evento, mostrarModal, cerrarModal}) {
  //let formulario = (<FormularioExito titulo={`Se elimino a ${evento.nombre} con exito`}/>);
  //Creamos esta funcion para cuando haga clik en el boton Eliminar
  const handleDeleteClick = (id) => {
    deleteEventos(id).then((success) => {
      if(success){
        window.location.reload();
      }else{
        alert("el departamento debe estar en estado activo para ser eliminado");
      }
    });
  };

  const longitudInvitados = (evento.invitados === undefined ? 0 : evento.invitados.length)
  
  return (
  <React.StrictMode>
    <div className={`modal modal-transparente ${mostrarModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: mostrarModal ? 'block' : 'none' }}>
      <div className="modal-dialog modal-dm" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Estas por eliminar un evento</h5>
            <button type="button" onClick={cerrarModal}  class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          <FormularioeliminarEvento name={evento.nombre} invitados={longitudInvitados}/>
          
          </div>
          <div className="modal-footer">
            <button type="button" className="copal-button-white" onClick={cerrarModal}>Cancelar</button>
            {/* (evento.invitados == []) 
              ?
              <button type="button" className="btn btn-danger" disabled>Eliminar</button>
              :
              <button type="button" className="btn btn-danger" onClick={()=>handleDeleteClick(evento.id)}>Eliminar</button> */}
            {
              (longitudInvitados == 0) 
              ?
              <button type="button" className="copal-button-red" onClick={()=>handleDeleteClick(evento.id)}>Eliminar</button>
              :
              <a href={`/eventos/${evento.id}/editar`} className="copal-button">Ir a Editar</a>
            }
          </div>
        </div>
      </div>
    </div>



  </React.StrictMode>
  );
}

export default EliminarEventoModal;