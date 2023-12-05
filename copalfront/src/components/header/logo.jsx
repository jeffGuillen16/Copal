import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/images/logo1.png';
import './header.css';

function Logo() {
    return (
      <div className="logo-header">
        <div className="logo-header-box">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>
      </div>
        
    );
  }

export default Logo;
