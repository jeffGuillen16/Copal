import axios from "axios";

/* const API_URL = 'http://localhost:8080'; */

const API_URL = process.env.REACT_APP_API_URL;

// Función para realizar una solicitud GET
export const fetchReservas = async (filtros, itemsPerPage, currentPage,setLastPage) => {
    try {
      
      const response = await axios.get(`${API_URL}reservas?size=${itemsPerPage}&page=${currentPage}${filtros}`); // ver size y pag variable
      // http://localhost:8080/socios?size=5&page=0

      if (response.status === 200) {
        // La solicitud se completó exitosamente (estado 200)
        setLastPage(Math.max(1,response.data.totalPages));
        return response.data.content; // Retorna los datos obtenidos de la API
      } else {
        throw new Error(`Error en la solicitud: Estado ${response.status}`);
      }
    } catch (error) {
      // Manejo de errores, por ejemplo, puedes lanzar una excepción o hacer algo más
      throw error;
    }
  };

  export const fetchReservaById = async (reservaId) => {
    try {
      // Construye la URL completa para obtener el socio por su ID
      const url = `${API_URL}reservas/${reservaId}`;
      
      const response = await axios.get(url);
  
      if (response.status === 200) {
        // La solicitud se completó exitosamente (estado 200)
        return response.data; // Retorna los datos obtenidos de la API
      } else {
        throw new Error(`Error en la solicitud: Estado ${response.status}`);
      }
    } catch (error) {
      // Manejo de errores, por ejemplo, puedes lanzar una excepción o hacer algo más
      throw error;
    }
  };

// Función para realizar una solicitud POST
export const addReserva = async (newReservaData) => {
    try {
      const response = await axios.post(`${API_URL}reservas`, newReservaData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 201) {
        // La solicitud POST se completó exitosamente (estado 201 - Created)
        return response.data; // Retorna los datos del nuevo socio creado
      } else {
        throw new Error(`Error en la solicitud POST: Estado ${response.status}`);
      }
    } catch (error) {
      // Manejo de errores, por ejemplo, puedes lanzar una excepción o hacer algo más
      throw error;
    }
  };

    // Función para realizar una solicitud PUT
  export const updateReserva = async (eventoId, updatedData) => {

      return axios.put(`${API_URL}reservas/${eventoId}`, updatedData,  {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  };

  export const listaDepartamentos = async () => {
    try {
      const response = await axios.get(`${API_URL}departamentos/lista/imagen`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  export const listaEspacios = async () => {
    try {
      const response = await axios.get(`${API_URL}espacios`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  export const listaRecursos = async () => {
    try {
      const response = await axios.get(`${API_URL}recursos`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  export const listaEstadosReserva = async () => {
    try {
      const response = await axios.get(`${API_URL}enums/estadosReserva`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  export const reservaHash = async (hash) => {
    try {
      const track = { trackCode: hash }
  
      const response = await axios.post(`${API_URL}reservas/seguimiento`,JSON.stringify(track),{
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return response.data;

    } catch (error) {
      console.error(error);
      throw error;
    }
  }