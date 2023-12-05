import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './forms.css';
import { AlertTriangleIcon } from "../../../components/icons";
function Formularioeliminar({name}){
    return (
    <div className="card-delete-container">
        <div className="container-icono">
            <AlertTriangleIcon/>
        </div> 
        <div className="container-text-info">
           <p>Eliminar <strong>{name}</strong>?</p>
        </div>
        <div className="container-text-message">
            <p>Esta seguro que quiere eliminar el socio seleccionado?</p>
        </div>
    </div>
    );
}

export default Formularioeliminar;