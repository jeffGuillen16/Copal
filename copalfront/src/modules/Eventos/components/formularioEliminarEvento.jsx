import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './forms.css';
import { AlertTriangleIcon } from '../../../components/icons'

function FormularioeliminarEvento({name, invitados}){
    return (
    <div className="card-delete-container">
        <div className="container-icono">
            <AlertTriangleIcon/>
        </div> 
        <div className="container-text-info">
           <p>Eliminar <strong>{name}</strong>?</p>
        </div>
        <div className="container-text-message">
            {invitados == 0 
            ?
            <p>Esta seguro que quiere eliminar el evento seleccionado?</p>   
            :
            <p>Debe eliminar a todos los invitados del evento antes de continuar</p>
            }
            
        </div>
    </div>
    );
}

export default FormularioeliminarEvento;