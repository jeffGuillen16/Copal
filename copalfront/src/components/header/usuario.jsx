import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import User from '../../assets/icons/foto_perfil.jpeg';
import './header.css';
import {LogOutIcon} from '../icons';

function Usuario(props) {

  return (
    <div className="containerUser">
      <div className="cantainer-user">
        <div className="user-name">
          <span className='text-user'>{props.nombre}</span>
        </div>
        <div className="logo-user">
            <img
              src={User}
              alt="Logo de Usuario"
              className="custom-image"
            />
        </div>
        <a>
          <LogOutIcon/>
        </a> 
      </div>      
    </div>

  );
}

export default Usuario;
