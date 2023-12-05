import axios from "axios";

/* const API_URL = 'http://localhost:8080'; */

const API_URL = process.env.REACT_APP_API_URL;


// Función para realizar una solicitud GET
export const fetchEventos = async (filtros, itemsPerPage, currentPage,setLastPage) => {
    try {
      const response = await axios.get(`${API_URL}eventos?size=${itemsPerPage}&page=${currentPage}${filtros}
      `); // ver size y pag variable
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

  export const fetchEventoById = async (eventoId) => {
    try {
      // Construye la URL completa para obtener el socio por su ID
      const url = `${API_URL}eventos/${eventoId}`;
      
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
export const addEvento = async (newEventoData) => {
    try {
      const response = await axios.post(`${API_URL}eventos`, newEventoData, {
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
  export const updateEvento = async (eventoId, updatedData) => {

      return axios.put(`${API_URL}eventos/${eventoId}`, updatedData,  {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  };

  export const deleteEvento = async (eventoId) => {
    try {
      const response = await axios.delete(`${API_URL}eventos/${eventoId}`);
      
      if (response.status === 200) {
        // The DELETE request was successful (status 200)
        return true; // Return a boolean indicating success
      } else {
        throw new Error(`Error in DELETE request: Status ${response.status}`);
      }
    } catch (error) {
      // Error handling, you can throw an exception or handle it differently
      throw error;
    }
  };