import 'bootstrap/dist/css/bootstrap.min.css';
import  './lateral.css';
import Item from './items';
import React,{useState} from 'react';
/* lista de objetos de naveagacion */
import Lista from './itemsNavegacion';
import { HelpIcon, RightIcon, LeftIcon} from '../icons';
import '../conteiners/conteiner.css'


const Lateral=()=>{

    const [sidebarExpanded, setSidebarExpanded] = useState(true);

    const toggleSidebar = () => {
        console.log("Alternar barra lateral");
        setSidebarExpanded(!sidebarExpanded);
    };

return(
    
        <div id='sidebar-container' className={`bg-primary ${sidebarExpanded ? 'expanded' : 'collapsed'}`}>
            <div>
                <div id="expandir" onClick={toggleSidebar}>
                    {sidebarExpanded ? (
                        <LeftIcon  />
                    ) : (
                        <RightIcon  />
                    )}
                </div>
                <Item items={Lista} sidebarExpandedItem={sidebarExpanded}/>
            </div>   
            <div className='soporte-etiqueta' > 
                <a  id="soporte" href="/" className='d-flex'>
                    <HelpIcon/>
                    <span className={`texto ${sidebarExpanded ? 'visible' : 'hidden'}`}> SOPORTE </span>
                </a>
                <span className={`texto ${sidebarExpanded ? 'visible' : 'hidden'} copyright`}> ©2023 COPAL </span>
            </div>    
        </div>
  
);

}
export default Lateral;