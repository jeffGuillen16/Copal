import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Lateral from "../../components/lateral/lateral";
import Header from "../../components/header/header";
import Conteiner2 from '../../components/conteiners/conteiner210';
import Conteiner from '../../components/conteiners/conteiner100';
import GlobalConteiner from '../../components/conteiners/globalConteiner';
import FormularioEspacios from "./components/formularioEditarEspacio";
import "./nuevoEspacio.css";
import {fetchReservaById} from './services/AxiosReservas'

const apiUrl = process.env.REACT_APP_API_URL;

function EditarEspacio() {

  const { id } = useParams();

  const [reserva, setReserva] = useState();

  const obtenerReserva = async () => {
    try {
      const [reservaAux] = await Promise.all([
        fetchReservaById(id)
      ]);
      setReserva(reservaAux)
      } catch (error) {
      console.error(error);
      }
  }

  console.log("llama formulario",reserva)
  useEffect(() => {
    obtenerReserva();
  }, []);
  

    return (
        <React.StrictMode>
            <GlobalConteiner >
              <Header/>
              <Conteiner2>
                <Lateral/>
                <Conteiner>
                 { /*<Navegacion ruta={"SOCIOS/EDITAR"}/>*/}
                 <div>
                    <span className="departamentos">
                      <a href="/espacios" style={{"textDecoration":"underline"}}>ESPACIOS</a>
                    </span>
                    <span className="operador">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-chevron-right"
                      >
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </span>
                    <span className="departamentos" style={{"cursor":"default"}}>EDITAR RESERVA DE ESPACIO</span>
                  </div>

                  <FormularioEspacios
                    reservaEstruc={reserva}
                  />
                </Conteiner> 
              </Conteiner2>
          </GlobalConteiner>
        </React.StrictMode>
    );

}

export default EditarEspacio;