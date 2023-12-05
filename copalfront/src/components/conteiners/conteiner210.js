import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './conteiner.css'; // Archivo CSS personalizado para agregar estilos adicionales

function Conteiner210(props) {
  const children = React.Children.toArray(props.children);
  return (
   
      <div className="container-home">
        <div className="navigation">
          {/* Contenido de la columna 1 (ocupa 2 columnas) */}
          {children[0]}
        </div>
        <div className="contenido">
          {/* Contenido de la columna 2 (ocupa 10 columnas) */}
          {children[1]}
        </div>
      </div>
  
  );
}

export default Conteiner210;