import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './forms.css';
import iconoExito from './imagenes/icon-check.png';

function FormularioExito({titulo}){
    return (
    <div className="card-delete-container">
        <div className="container-icono-success">
            <img src={iconoExito} alt="icono_delete" className="icon-check-success" />
        </div> 
        <div className="container-text-info">
           <p><strong>{titulo}</strong></p>
        </div>
        
    </div>
    );
}

export default FormularioExito;