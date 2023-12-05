import React, { useState, useEffect } from "react";
import HeaderInvitacion from "../../../components/header/headerInvitacion";
import "../nuevoEspacio.css";
import { useNavigate } from 'react-router-dom';
import {listaDepartamentos, listaEspacios, listaRecursos} from '../services/AxiosReservas.js'
import {updateReserva} from "../services/AxiosReservas.js";

/* const apiUrl = process.env.REACT_APP_API_URL; */

const apiUrl = process.env.REACT_APP_API_URL;
   
  
function FormularioEspacios({reservaEstruc}){

    const navigate = useNavigate();

    const [recursos, setRecursos] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [espacios, setEspacios] = useState([]);
    const [reserva, setReserva] = useState(reservaEstruc);

    useEffect(() => {
        fetchAll(); 
    }, [reserva]);

    useEffect(() => {
        setReserva(reservaEstruc); 
    }, [reservaEstruc]);

   /*  console.log("estructura",reservaEstruc)
    console.log("reserva",reserva) */


    const fetchAll = async () => {
        try {
        const [data1, data2, data3] = await Promise.all([
            listaDepartamentos(),
            listaEspacios(),
            listaRecursos(),
        ]);

        setDepartamentos(data1);
        setEspacios(data2);
        setRecursos(data3);
        } catch (error) {
        console.error(error);
        }
    };

    const asignar = (event, index) => {
        /* console.log("ACA: %s %d",event.target.value, index); */
        const { name, value } = event.target;
        const reservaAux = reserva;
        reservaAux.recursosReservados[index][name] = value;
        setReserva({...reservaAux });
    }

    const handleInputChange = (event) => {
        /* console.log("name: ",event.target.name); */
        if(event.target.name == "espacio"){
        const value = event.target.value;
        /* console.log("valor: ",event.target.value); */
        const espDir = espacios.find(espacio => espacio.nombre == value);
        setReserva({ ...reserva, espacio: espDir.nombre, direccion: espDir.direccion});
/*         console.log(reserva.direccion)
        console.log(reserva.espacio) */
        }else if(event.target.name == "departamento") {
        const value = event.target.value;
        /* console.log("valor: ",event.target.value); */
        const departamentoImg = departamentos.find(departamento => departamento.nombre == value);
        setReserva({ ...reserva, departamento: departamentoImg.nombre, linkDepartamento: departamentoImg.linkImagen});
        /* console.log("nombre del departamento",reserva.departamento)
        console.log("link de la imagen",reserva.linkDepartamento) */
        } else{
        const { name, value } = event.target;
        setReserva({ ...reserva, [name]: value });
        }
    }

    const enviarFormulario = async(event) => {
        event.preventDefault();

        console.log("Reserva Pre envio: ",reserva.recursosReservados)

        try {
        const data = await updateReserva(reserva.id, reserva);
        /* console.log('Reserva modificada:', data); */
        alert("Reserva modificada!");
        navigate('/espacios')
        } catch (error) {
        console.error('Error al confirmar la reserva:', error);
        }
    }

    if(!reserva){
        return <h1>cargando...</h1>
    };

    return (
        <React.StrictMode>

        <div className="ctn-edit-reserva">
        
            <div className="invitacion-body">
                <div className="col-3 custom-padding"></div>
                <div className="col-6 custom-padding">
                <h2 className="title">Editar reserva</h2>
                <div className="title-line"></div>
            
                  
                <div className="invitacion-element-title">
                {/*logo departamento*/}
                <img style={{width: "172px", aspectRatio: "1/1"}} src={reserva.linkDepartamento} alt="imagen departamento"/>
                </div>
                </div>
                </div>
        
            <form className="formularioReserva" onSubmit={enviarFormulario}>
            {/*method="post" action={'http://localhost:5000/crearevento'} */}
                <div className="container-fluid">
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6">

                    {/* departamento*/}
                    <div className="mb-3">
                        <label htmlFor="departamento" className="invitacion-label ">Seleccionar departamento *</label>
                        <select className={`form-control form-select`} value={reserva.departamento} disabled name="departamento" id="departamento" rows="2" onChange={handleInputChange} placeholder="selecione un departamento">
                        <option value=""> Seleccione un departamento</option>
                        {departamentos.map( (departamento,index) => (
                            <option key={index} value={departamento.nombre}>
                            {departamento.nombre}
                            </option>
                        ))}
                        </select>

                    </div>

                    {/* espacio y Dirreccion*/}
                    <div className="invitacion-element-dirreccion">
                        <div className="invitacion-content">
                        <label htmlFor="espacio" className="invitacion-label ">Seleccionar espacio *</label>
                        <select className={`form-control form-select`} value={reserva.espacio} disabled name="espacio" id="espacio" rows="2" onChange={handleInputChange} placeholder="seleccione un espacio">
                            <option value=""> Seleccione un espacio</option>
                            {espacios.map( (espacio, index) => (
                            <option key={index} value={espacio.nombre}>
                            {espacio.nombre} , {espacio.direccion}
                            </option>
                            ))}
                        </select>
                        </div>
                        
                        <div className="invitacion-dirreccion ">
                        <div className="invitacion-content">
                            <label htmlFor="direccion" className="invitacion-output-label ">Dirreccion *</label>
                            <p className="info-text-dirreccion">{reserva.direccion}</p>  
                        </div>
                        </div>
                        
                    </div>
                        
                    {/*Nombre del Responsable*/}
                    <div className="mb-3">
                        <label htmlFor="nombreDelResponsable" className="invitacion-label ">Nombre del Responsable *</label>
                        <input className={`form-control`} value={reserva.nombreDelResponsable} disabled name="nombreDelResponsable" id="nombreDelResponsable" rows="2" onChange={handleInputChange} placeholder="Ingrese el nombre del responsable"></input>
                    </div>
                        
                    {/* Email*/}
                    <div className="mb-3">
                        <label htmlFor="mail" className="invitacion-label ">Email *</label>
                        <input className={`form-control`} value={reserva.mail}  name="mail" id="mail" rows="2" onChange={handleInputChange} disabled placeholder="Ingrese el mail del responsable"></input>
                    </div>
                        
                    {/* Fecha de la reserva */}
                    <div className="mb-3">
                        <label htmlFor="fecha" className="invitacion-label ">Fecha de la reserva *</label>
                        <input type="date" className={`form-control`} value={reserva.fecha} name="fecha" id="fecha" rows="2" onChange={handleInputChange} disabled placeholder="Ingrese la fecha de la reserva" ></input>
                    </div>
                        
                    {/* Horario de reserva y duracion */}
                    <div className="invitacion-element-row">
                        <div className="invitacion-content">
                        <label htmlFor="horaInicio" className="invitacion-label ">Horario de la reserva *</label>
                        <input type="time" className={`form-control`}  name="horaInicio" id="horaInicio" rows="2" onChange={handleInputChange} disabled placeholder="Ingrese el horario de la reserva" value={reserva.horaInicio}></input>
                        </div>

                        <div className="invitacion-content">
                        <label htmlFor="duracion" className="invitacion-label ">Duración *</label>
                        <input type="number" className={`form-control`}  name="duracion" id="duracion" min={0} rows="2" onChange={handleInputChange} disabled placeholder="Ingrese la duracion de la reserva" value={reserva.duracion}></input>
                        </div>  
                    </div>

                    <div className="invitacion-list-recursos">
                        <div className="invitacion-element-row">
                            <div className="section-title ">
                                <h5 className="titulo">Asignacion de recurso</h5>
                            </div> 
                        </div>
                        { reserva.recursosReservados != undefined &&
                        reserva.recursosReservados.map((recurso, index) => {
                            return(
                            <div>
                                <div className="invitacion-element-row" key={index}>
                                    <div className="invitacion-content-cantidad">
                                        <label className="invitacion-label" htmlFor="cantidadAceptada" >Cantidad*</label>
                                        {/* TODO: VER que se muestren correctamentes los nombres de los roles, esto viene presuntament`e` de otro componente, puede ser editarDepartamentos */}
                                        <input type="number" required className={`form-control`} aria-label="Large select example" id="cantidadAceptada" name="cantidadAceptada" min={0} max={recurso.cantidad} onChange={(event) => asignar(event, index)} value={recurso.cantidadAceptada}></input>
                                    </div>  

                                    <div className="invitacion-content">
                                            <label className="invitacion-label" htmlFor="nombre">Recurso*</label>
                                            {/* TODO: VER que se muestren correctamentes los nombres de los roles, esto viene presuntamente de otro componente, puede ser editarDepartamentos */}
                                            <select disabled className={`form-select form-control`} aria-label="Large select example" id="nombre" name="nombre"
                                            value={recurso.nombre}>
                                                    <option value="">Seleccione un recurso</option>      
                                                {recursos.map((nombre, indexx) => (
                                                    <option key={indexx} value={nombre}>{nombre}</option>
                                                ))}
                                            </select>
                                    </div>  
                                </div>    
                            </div>
                            );
                        })
                        }
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
                        CONFIRMAR
                    </button>
                </div>                    
            </form>
        </div>
            
        </React.StrictMode>
    );
    }

    export default FormularioEspacios;