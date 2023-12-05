import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import FormularioExito from '../components/formSuccess';
import './modalEspacios.css';
import { updateReserva } from '../services/AxiosReservas';
import { AlertTriangleIcon } from '../../../components/icons'
import { useState } from 'react';

function RechazarReservaModal({espacio, mostrarModal, cerrarModal}) {
  //let formulario = (<FormularioExito titulo={`Se elimino a ${espacio.nombre} con exito`}/>);

  //Creamos esta funcion para cuando haga clik en el boton Eliminar
  /* const handleRejectClick = (id) => {
    deleteEventos(id).then((success) => {
      if(success){
        window.location.reload();
      }else{
        alert("el departamento debe estar en estado activo para ser eliminado");
      }
    });
  }; */

  const handleRejectClick = (id) => {
    const updatedData = {...espacio, estado: {nombre:"RECHAZADO"}};
  
    updateReserva(id, updatedData).then((response) => {
      if(response.status === 202){
        window.location.reload();
      }else{
        alert("Hubo un problema al actualizar la reserva");
      }
    }).catch((error) => {
      console.error("Error al actualizar la reserva:", error);
    });
  };

  
  return (
  <React.StrictMode>
    <div className={`modal modal-transparente ${mostrarModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: mostrarModal ? 'block' : 'none' }}>
      <div className="modal-dialog modal-md" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Estas por rechazar la reserva #{espacio.id}</h5>
            <button type="button" onClick={cerrarModal} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">

          {/* ex componente formulario ver */}
          <div className="card-delete-container">
            <div className="container-icono">
                <AlertTriangleIcon/>
            </div> 
            <div className="container-text-info">
              <p>Rechazar <strong>{espacio.id}</strong>?</p>
            </div>
            <div className="container-text-message">
                <p>Desea <strong>rechazar</strong> la reserva del espacio #{espacio.id}?</p>          
            </div>
          </div>
          
          </div>
          <div className="modal-footer">
            <button type="button" className="copal-button-red-outline" onClick={cerrarModal}>Cancelar</button>

            <button type="button" className="copal-button-red" onClick={()=>handleRejectClick(espacio.id)}>Rechazar</button>
          </div>
        </div>
      </div>
    </div>



  </React.StrictMode>
  );
}

export default RechazarReservaModal;