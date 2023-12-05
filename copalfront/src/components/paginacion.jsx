import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import './paginacion.css';
import { ChevronLeft, ChevronRight} from './icons';


function generarElementosDePaginacion(paginaActual, totalPaginas, onChangePagina) {
  const paginas = [];

  paginas.push(
    <Pagination.Item
      key="prev"
      style={{cursor: "pointer"}}
      onClick={() => onChangePagina(paginaActual - 1)}
      disabled={paginaActual === 1}
      >
      <ChevronLeft/>
    </Pagination.Item>
  );

  paginas.push(
    <Pagination.Item
      key={paginaActual}
      active={true}
      onClick={() => onChangePagina(paginaActual)}
    >
      {paginaActual}
    </Pagination.Item>
  );

  paginas.push(
    <Pagination.Item
      key="next"
      style={{cursor: "pointer"}}
      onClick={() => onChangePagina(paginaActual + 1)}
      disabled={paginaActual === totalPaginas}
    >
    <ChevronRight/>
    </Pagination.Item>
  );

  return paginas;
}


// TODO: ver estilo una vez que haya mas de una pagina(arreglar el agregar socio)
function Paginacion({ paginaActual, totalPaginas, onChangePagina }) {


  const paginas = generarElementosDePaginacion(paginaActual, totalPaginas, onChangePagina);




  return (
    <div>
      <Pagination>{paginas}</Pagination>
    </div>
  );
}

export default Paginacion;
