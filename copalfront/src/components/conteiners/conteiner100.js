import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './App.css'; // Archivo CSS personalizado para agregar estilos adicionales
import './conteiner.css'; // Archivo CSS personalizado para agregar estilos adicionales
//import fondo from './images/fondo.png';

function pathjoin(rutaInicial, otraRuta){
  if (rutaInicial.endsWith("/") && otraRuta.startsWith("/")) {
    otraRuta = otraRuta.substring(1); // Elimina el "/" inicial de otraRuta
  }
  
  return `${rutaInicial}${otraRuta}`;
}

function Conteiner(props) {
  //url(http://localhost:3000/static/media/fondo.dcdde3981612ecfca5a8.png)
  const { children } = props;
  
  
  return (
      <div className='elemento-interno '>
        {children} 
      </div>
      
  );
}
export default Conteiner;
