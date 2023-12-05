import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './forms.css';
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

  
function FormularioSolicitudEspacio({idEvento}){

    const [empresas, setEmpresas] = useState([]);
    
    useEffect(() => {
      },[])

    const [invitado, setInvitado] = useState({
        nombre: "",
        apellido:"",
        mail:"",
        empresa: "",
      });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInvitado({ ...invitado, [name]: value });
    }

      const enviarFormulario = (event) => {
        event.preventDefault();
        //si el formulario es valido procedo
            console.log('Formulario Valido');
            console.log('Enviando Formulario....');
            console.log(invitado);

            //valido que se entro en modo Agregar Departamento

            axios.post(apiUrl + 'eventos/'+ idEvento + '/invitados', invitado,{
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                alert("estas registrado");
            })
            .catch(error => {
                console.error('Error al hacer la solicitud '  + ':', error);
                alert('Error al hacer la solicitud '  + ':', error);
            });
    }
    
    return (
        <form className="formulario" onSubmit={enviarFormulario}>
        {/*method="post" action={'http://localhost:5000/crearevento'} */}

        
{/*  */}<div className="container-fluid">
                <div className="row">
                <div className="col-3"></div>

                    <div className="col-6">
                        
                    <p className="form-invitacion-title">Registrate al evento*</p>

                        {/* Nombre completo */}
                        <div className="mb-3">
                                <label htmlFor="nombre" className="form-label ">Nombre*</label>
                                <input className={`form-control`} required name="nombre" id="nombre" rows="2" onChange={handleInputChange} placeholder="Ingrese su nombre"></input>
                        </div>

                        <div className="mb-3">
                                <label htmlFor="apellido" className="form-label ">Apellido*</label>
                                <input className={`form-control`} required name="apellido" id="apellido" rows="2" onChange={handleInputChange} placeholder="Ingrese su apellido"></input>
                        </div>
                        {/* Empresa */}
                        
                                {/* <select c required name="empresa" id="empresa" rows="2" onChange={handleInputChange} >
                                    <option value="" disabled>seleccione su empresa</option>
                                        
                                </select>
                                 */}
                            <div className="mb-3">
                                <label htmlFor="empresa" className="form-label ">Empresa*</label>  
                                <input className="form-input form-control" type="text" id="empresa" name="empresa" list="nombreEmpresa" onChange={handleInputChange} placeholder="Ingrese su nombre de la empresa"/>      
                                <datalist  id="nombreEmpresa">
                                    {empresas.map((empresa, index) => (
                                        <option key={index} value={empresa}>
                                        {empresa}
                                        </option>
                                    ))}  
                                </datalist>
                                </div>                
                        {/* Email */}
                        <div className="mb-3">
                                <label htmlFor="mail" className="form-label ">Email*</label>
                                <input className={`form-control`} required name="mail" id="mail" rows="2" onChange={handleInputChange} placeholder="Ingrese su dirección de email"></input>
                        </div>

                    </div>
                </div>
            </div>    
            {/* ----------------------------------------------------- */}                         
        
            <div className="button-ctn">
                <a href="/espacios" className="copal-button-white" >
                    CANCELAR
                </a>
                <button type="submit" className="copal-button" >
                    AGREGAR 
                </button>
            </div>                    
        </form>
    );
}

export default FormularioSolicitudEspacio;