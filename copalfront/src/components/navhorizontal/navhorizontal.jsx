import 'bootstrap/dist/css/bootstrap.min.css';  
import './navhorizontal.css';

const NavHorizontal=(prop)=>{
    return(
        <div className="container-fluid  mb-0">
        {/*<!-- Primera fila con una columna de 12 -->*/}
        <div className="row">
            <div className="col-12 mb-0">
                {/*<!-- Contenido de la primera fila aquí -->*/}
                <span className='socio'>{prop.ruta}</span>
                <span className='operador'><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </span>
                
            </div>
        </div>
    </div>
    );
};

export default NavHorizontal;