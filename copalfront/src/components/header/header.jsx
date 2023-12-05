import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Usuario from './usuario';
/* import Logo from './logo'; */
import '../header/header.css';
import copalBlanco from '../../assets/icons/copalBlanco.jpeg';


function Header(){
  return (
    <header className="container-fluid">
      <div className="row header">
        {/* Logo a la izquierda */}
        <div className="col-6">
          {/* <Logo/> */}
          <img tabIndex="0"  src={copalBlanco} alt='Logo Copal' className='logo-copal'/>
        </div>
        <div className="col-6">
          <Usuario nombre='Matias Hernandez'/>
        </div>

        {/* Zona de inicio de sesión a la derecha (2 columnas) */}
        
      </div>
    </header>
  );
}

export default Header;
