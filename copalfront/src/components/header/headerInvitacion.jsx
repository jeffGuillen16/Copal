import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Usuario from './usuario';
/* import Logo from './logo'; */
import '../header/header.css';
import copal from '../../assets/icons/Logo.png';
import copalBlanco from '../../assets/icons/copalBlanco.jpeg';


function HeaderInvitacion(){
  return (
    <header className="container-fluid">
      <div className="row header-invitacion">
        {/* Logo a la izquierda */}
        <div className="col-6">
          {/* <Logo/> */}
          <img tabIndex="0"  src={copalBlanco} alt='Logo Copal' className='logo-copal'/>
        </div>
        {/* Zona de inicio de sesión a la derecha (2 columnas) */}
      </div>
    </header>
  );
}

export default HeaderInvitacion;

{/* <header className="container-fluid">
      <div className="row header-blanco">
        
        <div className="col-6">
          
          <img tabIndex="0"  src={copal} alt='Logo Copal' className='logo-copal'/>
        </div>
        
      </div>
</header> */}