import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './conteiner.css'; // Archivo CSS personalizado para agregar estilos adicionales
function GlobalConteiner(props) {
    const children = React.Children.toArray(props.children);
  return (
    <div className="global">
      <div className="">
        {children[0]}
      </div>
      <div className="box-middle">
        {children[1]} 
      </div>      
    </div>
  );
}
export default GlobalConteiner;
