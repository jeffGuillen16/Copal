import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './forms.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { CalendarIconLarge, DeleteIcon } from '../../../components/icons'
import {addEvento, updateEvento} from '../services/AxiosEventos'

const apiUrl = process.env.REACT_APP_API_URL;

const generarItem = (nombre, id)=>{
    return (<option key={id} data-key={id} value={nombre}>{nombre}</option>);
}
   
  
function FormularioEventos({listaDepartamentos = [], listaModalidades = [], listaEstados=[] ,eventoEstruct = null}){

    const [modoAgregar, setModoAgregar] = useState(true);

    console.log(listaModalidades);
    console.log(listaDepartamentos);
    const navigate = useNavigate();

    const [evento, setEvento] = useState({
        id: 1,
        nombre: "",
        descripcion: "",
        lugar: "",
        linkReunion:"",
        linkRegistro: "",
        estado: "ACTIVO",
        modalidad: "",
        fechaInicio: "",
        fechaFin: "",
        horaInicio: "",
        horaFin: "",
        invitados: [
            {
                id: 0,
                nombre: "",
                apellido: "",
                mail: "",
                empresa: ""
            }
        ],
        departamento: ""
      });

    useEffect(() => {
        if(eventoEstruct !== null){
            setModoAgregar(false);
            setEvento(eventoEstruct);
        }
    }, [eventoEstruct]);

    console.log(evento.autoridades);
    //estructura para validacion de campos
    const [validacionCampos, setValidacionCampos] = useState({
        nombre:{invalido: false, mensaje: ''},
        descripcion:{invalido: false, mensaje: ''},
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEvento({ ...evento, [name]: value });    
    }

    const enviarFormulario = async(event) => {
        event.preventDefault();
        
        console.log('Formulario Valido');
        console.log('Enviando Formulario....');
        console.log(evento);

        const json = JSON.stringify(evento);

        //valido que se entro en modo Agregar Departamento
        if(eventoEstruct != null){
            try {
                const data = await updateEvento(evento.id, json);
                console.log('Evento actualizado:', data);
                alert("Evento guardado!");
                navigate('/eventos')
                } catch (error) {
                console.error('Error al actualizar el evento:', error);
                }
        }else{
            try {
                const data = await addEvento(json);
                console.log('Evento agregado:', data);
                alert("Evento agregado!");
                navigate('/eventos')
                } catch (error) {
                console.error('Error al actualizar el evento:', error);
                }
        }
    }

    const handleDelete = (index) => {
        const invitados = [...evento.invitados];
        invitados.splice(index,1);
        setEvento({...evento, "invitados" : invitados});
    }
    
    return (
        <form className="formulario" onSubmit={enviarFormulario}>
        {/*method="post" action={'http://localhost:5000/crearevento'} */}

        
{/*  */}<div className="container-fluid">
            <div className="row">
                <div className="col-3"></div>

                    <div className="col-6">
                        <div className="form-header">

                            <div className="icon-calendar-add">
                                <CalendarIconLarge />
                            </div>

                            <div>
                                {/* DENOMINACION */}
                                <div className={`form-group`}>
                                    <label htmlFor="nombre" className="form-label fw-bold">Nombre del evento*</label>
                                    <input type="text" className="form-control"  id="nombre" name="nombre" value={evento.nombre} onChange={handleInputChange} required placeholder="Ingrese el evento" />
                                    <div className={`form-text ${validacionCampos.nombre.invalido? 'item-error-validation': ''}`}>{validacionCampos.nombre.mensaje}
                                    </div>  
                                </div>
                                
                            {/* Departamento */}
                            <div className="mb-3">
                                <label htmlFor="departamento" className="form-label fw-bold">Departamento*</label>
                                <select className="form-select form-control" name="departamento" id="departamento" required value={evento.departamento} onChange={handleInputChange} >
                                    <option value="">seleccione el departamento </option>
                                        {listaDepartamentos.map((departamento, index) => (
                                            <option key={index} value={departamento}>
                                                {departamento}
                                            </option>
                                     ))} 
                                    </select>
                                    <div className={`form-text ${validacionCampos.descripcion.invalido? 'item-error-validation': ''}`}>{validacionCampos.descripcion.mensaje}</div> 
                                </div>   
                            </div>
                        </div>

                        {/* estados */}
                        <div className="mb-3">
                                <label htmlFor="estado" className="form-label fw-bold">Estados*</label>
                                <select className="form-select form-control" required name="estado" id="estado" rows="2" value={evento.estado} onChange={handleInputChange} disabled={modoAgregar} >
                                    {!modoAgregar ? null : (
                                        <option value="ACTIVO">ACTIVO</option>
                                    )}
                                    {listaEstados.map((estado, index) => (
                                        <option key={index} value={estado}>
                                            {estado}
                                        </option>
                                    ))}    
                                </select>
                                <div className={`form-text ${validacionCampos.descripcion.invalido? 'item-error-validation': ''}`}>{validacionCampos.descripcion.mensaje}</div> 
                        </div>

                       {/*Fechas*/}
                        <div className="form-fechas">

                            <div className="mb-3">
                                <label htmlFor="fechaInicio" className="form-label fw-bold">Fecha de inicio*</label>
                                <input type="date" className={`form-control`} required name="fechaInicio" id="fechaInicio" rows="2" value={evento.fechaInicio} onChange={handleInputChange} placeholder="Ingrese la fecha de inicio"></input>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="fechaFin" className="form-label fw-bold">Fecha de fin*</label>
                                <input type="date" className={`form-control`} required name="fechaFin" id="fechaFin" rows="2" value={evento.fechaFin} onChange={handleInputChange} placeholder="Ingrese la fecha de fin"></input>
                            </div>

                        </div>    
                        
                        {/* Horario */}
                        <div className="mb-3">
                                <label htmlFor="horaInicio" className="form-label fw-bold">Horario de inicio*</label>
                                <input type="time" className={`form-control`} required name="horaInicio" id="horaInicio" rows="2" value={evento.horaInicio} onChange={handleInputChange} placeholder="Ingrese la horario de inicio"></input>
                                <div className={`form-text ${validacionCampos.descripcion.invalido? 'item-error-validation': ''}`}>{validacionCampos.descripcion.mensaje}</div> 
                        </div>

                        <div className="mb-3">
                                <label htmlFor="horaFin" className="form-label fw-bold">Horario de fin*</label>
                                <input type="time" className={`form-control`} required name="horaFin" id="horaFin" rows="2" value={evento.horaFin} onChange={handleInputChange} placeholder="Ingrese la horario de fin"></input>
                                <div className={`form-text ${validacionCampos.descripcion.invalido? 'item-error-validation': ''}`}>{validacionCampos.descripcion.mensaje}</div> 
                        </div>

                        {/* Modalidad */}
                        <div className="mb-3">
                                <label htmlFor="modalidad" className="form-label fw-bold">Modalidad*</label>
                                <select className="form-select form-control" required name="modalidad" id="modalidad" rows="2" value={evento.modalidad} onChange={handleInputChange} >
                                    <option value="">seleccione el modo de la reunion </option>
                                        {listaModalidades.map((modalidad, index) => (
                                            <option key={index} value={modalidad}>
                                                {modalidad}
                                            </option>
                                        ))}    
                                </select>
                                <div className={`form-text ${validacionCampos.descripcion.invalido? 'item-error-validation': ''}`}>{validacionCampos.descripcion.mensaje}</div> 
                        </div>

                        {/* Dirrecion del evento hay que completarlo*/}
                        <div className="mb-3">
                                { (evento.modalidad == 'PRESENCIAL' || evento.modalidad == 'HIBRIDO') && <label htmlFor="lugar" className="form-label fw-bold">Dirrecion del evento*</label>}
                                { (evento.modalidad == 'PRESENCIAL' || evento.modalidad == 'HIBRIDO') && <input className={`form-control`} required name="lugar" id="lugar" rows="2" value={evento.lugar} onChange={handleInputChange} placeholder="Ingrese la dirreccion"></input>}
                                
                                { (evento.modalidad == 'VIRTUAL' || evento.modalidad == 'HIBRIDO') && <label htmlFor="linkReunion" className="form-label fw-bold">Link de la reunion*</label>}
                                { (evento.modalidad == 'VIRTUAL' || evento.modalidad == 'HIBRIDO') && <input className={`form-control`} required name="linkReunion" id="linkReunion" rows="2" value={evento.linkReunion} onChange={handleInputChange} placeholder="Ingrese la link de reunion"></input>}
                                <div className={`form-text ${validacionCampos.descripcion.invalido? 'item-error-validation': ''}`}>{validacionCampos.descripcion.mensaje}</div> 
                        </div>

                        {/* Descripcion */}
                        <div className="mb-3">
                                <label htmlFor="descripcion" className="form-label fw-bold">Descripcion*</label>
                                <textarea className={`form-control`} required name="descripcion" id="descripcion" rows="2" value={evento.descripcion} onChange={handleInputChange} placeholder="Ingrese la descripción"></textarea>
                                <div className={`form-text ${validacionCampos.descripcion.invalido? 'item-error-validation': ''}`}>{validacionCampos.descripcion.mensaje}</div> 
                        </div>

                    </div>
                </div>
            </div>    
            {/* ----------------------------------------------------- */}                         
        
            
           { modoAgregar ? null :
            (<div className="lista-invitados">  
                <div className="col-2"></div>
                <div className="col-8">
                    <div className="lista-invitados-header">
                        <p className="lista-invitados-title">Invitados</p> 
                        <p className="lista-invitados-count">#{evento.invitados.length}</p>
                    </div>
                    <div className="lista-invitados-items">
                        {evento.invitados.map((invitado, index) => (
                            <div className="tarjeta-invitado">
                                <div className="tarjeta-invitado-item">
                                    <p className="tarjeta-invitado-title">Nombre de invitado</p>
                                    <p className="tarjeta-invitado-content">{invitado.nombre} {invitado.apellido}</p>
                                </div>
                                <div className="tarjeta-invitado-item">
                                    <p className="tarjeta-invitado-title">Empresa</p>
                                    <p className="tarjeta-invitado-content">{invitado.empresa}</p>
                                </div>
                                <div className="tarjeta-invitado-item">
                                    <p className="tarjeta-invitado-title">Email</p>
                                    <p className="tarjeta-invitado-content">{invitado.mail}</p>
                                </div>
                                
                                <button className="tarjeta-invitado-botton" type="button" onClick={() => handleDelete(index)}><DeleteIcon/></button>
                            </div>
                        ))}
                    </div>       
                </div> 
            </div>)
                
                
            }

            <div className="button-ctn">
                <a href="/eventos" className="copal-button-white" >
                    CANCELAR
                </a>
                <button type="submit" className="copal-button" >
                    {eventoEstruct !== null ? "GUARDAR" : "AGREGAR"} 
                </button>
            </div>                    
        </form>
    );
}

export default FormularioEventos;