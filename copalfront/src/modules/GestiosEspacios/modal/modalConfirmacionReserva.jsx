import React , {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import FormularioExito from '../components/formSuccess';
import './modalEspacios.css';
import { CheckIconMedium, ClipboardIcon} from '../../../components/icons'


function ConfirmacionReserva({hash ,mostrarModal, cerrarModal}) {
  //let formulario = (<FormularioExito titulo={`Se elimino a ${evento.nombre} con exito`}/>);
  //Creamos esta funcion para cuando haga clik en el boton Eliminar
  const [textToCopy, setTextToCopy] = useState(hash);

  useEffect(() => {
    setTextToCopy(hash);
  },[hash])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      console.log('Texto copiado al portapapeles');
    } catch (err) {
      console.error('Error al copiar al portapapeles:', err);
    }
  };

  return (
  <React.StrictMode>
    <div className={`modal modal-transparente ${mostrarModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: mostrarModal ? 'block' : 'none' }}>
      <div className="modal-dialog modal-dm" role="document">
        <div className="modal-content">
          <div className="modal-header-reserva">
            <button type="button" onClick={cerrarModal}  class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
            <div className="card-delete-container">
                <div className="container-icono-reserva">
                    <CheckIconMedium/>
                </div> 
                <div className="container-text-info">
                  <p className='text-modal-reserva'>
                    Gracias por reservar
                  </p>
                  <p className='text-modal-reserva'>
                      Su código de seguimiento es
                  </p>

                  {/*  nemero-reserva */}
                  <div className='nemero-reserva'>
                    <input type="text" className='hash-style' value={hash} readOnly />
                    <button className='button-copiar' onClick={copyToClipboard}>
                        <ClipboardIcon/>
                    </button>
                  </div>
                </div>
            </div>
        </div>
      </div>
    </div>



  </React.StrictMode>
  );
}

export default  ConfirmacionReserva;