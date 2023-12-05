import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './conteiner.css'; // Archivo CSS personalizado para agregar estilos adicionales



function ContainerCards({children}) {

  return (
        <div className='diplay-cards'>
            {children}
        </div>
  );
}

export default ContainerCards;