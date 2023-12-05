import React from 'react';
import Lateral from "../../components/lateral/lateral";
import Header from "../../components/header/header";
import Footer from '../../components/footer';
import Conteiner2 from '../../components/conteiners/conteiner210';
//import TarjetaUsuario from '../GestionSocios/components/tarjetausuario';
import Conteiner from '../../components/conteiners/conteiner100';
import Navegacion from '../../components/navhorizontal/navhorizontal';
import GlobalConteiner from '../../components/conteiners/globalConteiner';
import '../../components/conteiners/conteiner.css'

const RUTA = 'HOME';

const GestionSociosEditar = () => {
    // Usar useParams para acceder al ID de la URL
    
       
    return (
       <GlobalConteiner >
           <Header/>
           <Conteiner2>
             {/* componente 1*/}
             <Lateral/>
             {/* componente 2 */}
             <Conteiner>
               <Navegacion ruta={RUTA}/>
               <Conteiner >
               <div className='custom-fondo'>
                  <h1 className='custom-text'>Bienvenido a COPAL</h1>
               </div>
               </Conteiner>
             </Conteiner> 
              
           </Conteiner2>
   
       </GlobalConteiner>
    );
};
  
export default GestionSociosEditar;