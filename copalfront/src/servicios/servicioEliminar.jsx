import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export function deleteSocio(socioId) {
  return axios.delete(apiUrl + `socios/${socioId}`).then(() => {
      console.log("Socio eliminado!");
      return true; 
    })
    .catch((error) => {
      console.error("Error al eliminar el socio no se pudo conectar al servidor:", error);
      return false; 
    });
}

export function deleteDepartamento(departamentoId) {
  return axios.delete(apiUrl + `departamentos/${departamentoId}`).then(() => {
      console.log("Departamento eliminado!");
      return true; 
    })
    .catch((error) => {
      console.error("Error al eliminar el Departamento no se pudo conectar al servidor:", error);
      return false; 
    });
}

export function deleteEventos(eventoId) {
  return axios.delete(apiUrl + `eventos/${eventoId}`).then(() => {
      console.log("evento eliminado!");
      return true; 
    })
    .catch((error) => {
      console.error("Error al eliminar el evento no se pudo conectar al servidor:", error);
      return false; 
    });
}


