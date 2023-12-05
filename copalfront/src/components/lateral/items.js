import 'bootstrap/dist/css/bootstrap.min.css';
import  './lateral.css';
import {HelpIcon} from '../icons'

function EnlaceItem(props){
    return(
        <a  id="bloque" href={props.url}  className='d-flex'>
            <props.img/>
            <div className={`texto ${props.isVisible ? 'visible' : 'hidden'}`}>
                {props.nombre}
            </div>
        </a>
    );
}

const Item=(props)=>{
    const items = props.items.map((item, index) => (
        <EnlaceItem key={index} url={item.url} nombre={item.nombre} img={item.img} isVisible={props.sidebarExpandedItem} />
      ));
        
      
    return(
        <div className='menu'>
            {items}                
        </div>

);

}
export default Item;