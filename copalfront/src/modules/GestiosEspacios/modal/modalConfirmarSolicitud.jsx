import React , { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import FormularioExito from '../components/formSuccess';
import './modalEspacios.css';
import { updateReserva } from '../services/AxiosReservas';
import { CheckIconLarge } from '../../../components/icons'

function ConfirmarReservaModal({espacio, mostrarModal, cerrarModal}) {
  //let formulario = (<FormularioExito titulo={`Se elimino a ${espacio.nombre} con exito`}/>);
  //Creamos esta funcion para cuando haga clik en el boton Eliminar

/*   const handleConfirmClick = (id) => {
    deleteEventos(id).then((success) => {
      if(success){
        window.location.reload();
      }else{
        alert("el departamento debe estar en estado activo para ser eliminado");
      }
    });
  }; */
  const [updatedData, setUpdatedData] = useState();

  const handleConfirmClick = (id) => {  
    const hayUnRecursoModificado = espacio.recursosReservados.some((recurso) => 
                                    recurso.cantidad != recurso.cantidadAceptada)

    if(hayUnRecursoModificado){
      setUpdatedData({...espacio, estado: {nombre:"ACEPTADO_PARCIAL"}})
    }else{
      setUpdatedData({...espacio, estado: {nombre:"ACEPTADO"}})
    }

    console.log("updatedData: ", updatedData);
    updateReserva(id, updatedData).then((response) => {
      if(response.status == 202){
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
      <div className="modal-dialog modal-dm" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Estas por confirmar la reserva #{espacio.id}</h5>
            <button type="button" onClick={cerrarModal}  class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">

          {/* ex componente formulario ver */}
          <div className="card-delete-container">
            <div className="container-icono-2">
              <CheckIconLarge/>
            </div> 
            <div className="container-text-info">
            <p>Confirmar <strong>{espacio.id}</strong>?</p>
            </div>
            <div className="container-text-message-2">
                <p>Desea <strong>confirmar</strong> el espacio seleccionado?</p>        
            </div>
          </div>
          
          </div>
          <div className="modal-footer">
            <button type="button" className="copal-button-white" onClick={cerrarModal}>Cancelar</button>
              
            <button type="button" className="copal-button" onClick={()=>handleConfirmClick(espacio.id)}>Confirmar</button>
          </div>
        </div>
      </div>
    </div>



  </React.StrictMode>
  );
}

export default ConfirmarReservaModal;