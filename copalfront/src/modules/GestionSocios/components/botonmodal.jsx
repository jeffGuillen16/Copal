import React,{useState} from 'react';
import img_delete from '../../../assets/icons/trash2.svg';
import '../modal/style.css';

const BotonModal =()=>{
    /*Logica del Boton trash, para abrirModal*/
    const [mostrarModal, setMostrarModal] = useState(false);
    function AbrirModal(){
        setMostrarModal(true);
     }
    return(
    // Botón  del modal -->*/}
      <div  className="container-icon" data-bs-toggle="modal" data-bs-target="#eliminarSocioModal" onClick={AbrirModal}>
        <img src={img_delete}  className='btntrash' alt=''/>
      </div>
    );
  }  
export default BotonModal;
  