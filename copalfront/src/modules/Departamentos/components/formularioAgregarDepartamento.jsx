import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Deptoforms.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { CameraIcon } from '../../../components/icons'

const apiUrl = process.env.REACT_APP_API_URL;

const generarItem = (nombre, id)=>{
    return (<option key={id} data-key={id} value={nombre}>{nombre}</option>);
}

const validarCampos = (departamento) => {
    const { nombre, descripcion, rolUsuario} = departamento;
  
    // Expresión regular para validar el formato del CUIT
    const cuitRegex = /^\d{2}-\d{8}-\d{1}$/;
    const mailRegex =  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const sitioWebRegex = /^(https?:\/\/)?([\w-]+\.)+[\w]{2,}(\/)?$/;

  
    const esCadenaVacia = (cadena) => cadena===null || cadena===undefined || cadena.trim() === '';// Función para verificar si una cadena está vacía
  
    const validacion = {
      nombre: { invalido: esCadenaVacia(nombre), mensaje: '' },
      descripcion: { invalido: esCadenaVacia(descripcion), mensaje: '' },
      rolUsuario: { invalido: !rolUsuario, mensaje: !rolUsuario? 'Debes selecionar un tipo': '' },
    };
  
    let valido = !validacion.nombre.invalido && !validacion.rolUsuario.invalido && !validacion.descripcion.invalido;
  
    return {validacion: validacion, formularioValido: true};
  };
  
  
  
function FormularioDepartamentos({rolesDeUsuario = [],  listaUsuarios = [], departamentoEstruct = null}){

    const navigate = useNavigate();

    const [departamento, setDepartamento] = useState({
        id : 0,
        nombre: "",
        descripcion: "",
        logo:{
          id:""
        },
        autoridades: [
          {
            usuario:"",
            rol:""
          }
        ],
        departamentoCoordinador: "CDT"
      });

    const [logo, setLogo] = useState(null);

    useEffect(() => {
        if(departamentoEstruct !== null){
            
            setDepartamento(departamentoEstruct);
        }
    }, [departamentoEstruct]);

    const selectRolUsuario = [];
    selectRolUsuario.push();
    rolesDeUsuario.forEach((rol) => { selectRolUsuario.push(generarItem(rol.nombre, rol.id)); });

    const selectUsuarios = [];
    selectUsuarios.push();
    listaUsuarios.forEach((usuario) => { selectUsuarios.push(generarItem(usuario.nombre, usuario.id)); });
    

    console.log(departamento.autoridades);
    //estructura para validacion de campos
    const [validacionCampos, setValidacionCampos] = useState({
        nombre:{invalido: false, mensaje: ''},
        descripcion:{invalido: false, mensaje: ''},
        rolUsuario:{invalido: false, mensaje: ''},
    });

    // Estado para el objeto departamento

    // Funciones para manejar cambios en los campos del formulario
    const asignar = (event, index) => {
        console.log("%s %d",event.target.value, index);
        const { name, value } = event.target;
        const deptoAux = departamento;
        deptoAux.autoridades[index][name] = value;
        setDepartamento({...deptoAux });
        /* setDepartamento((prevDepartamento) => {
            const newAutoridades = [...prevDepartamento.autoridades];
            newAutoridades[index] = { ...newAutoridades[index], [name]: value };
        }); */
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "rol") {
        } else if (name === "usuario"){
        } else if (name === "logo") {
            const file = event.target.files[0]; // Obtener el archivo seleccionado
    
            if (file) {
                const reader = new FileReader();
    
                reader.onload = (e) => {
                    const imagePreview = document.getElementById("imagePreview");
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = "block";
                };
    
                reader.readAsDataURL(file);
            } else {
                const imagePreview = document.getElementById("imagePreview");
                imagePreview.src = "";
                imagePreview.style.display = "none";
            }
    
            setLogo(file);
        } else { setDepartamento({ ...departamento, [name]: value });
        }
    }
    
    function addAutoridad() {
        const newAutoridad = { rol:{nombre: ""}, usuario:{nombre: ""} }; // Fill in initial values
        setDepartamento({...departamento, autoridades:[...departamento.autoridades, newAutoridad]});
      }
    
      function removeAutoridad(index) {
        const updatedAutoridades = (departamento.autoridades);
        updatedAutoridades.splice(index, 1);
        setDepartamento({...departamento , autoridades:updatedAutoridades});
      }


      const enviarFormulario = (event) => {
        event.preventDefault();
        const validacionDelFormulario = validarCampos(departamento);
        //si el formulario es valido procedo
        if(validacionDelFormulario.formularioValido){

            console.log('Formulario Valido');
            console.log('Enviando Formulario....');
            console.log(departamento);

            const formData = new FormData();
            const json = JSON.stringify(departamento);
            const blob = new Blob([json], {type: 'application/json'});
            formData.append('departamento',blob);
            formData.append('logo', logo);
            //valido que se entro en modo Agregar Departamento
            let method = 'post'
            let path = 'departamentos'
            if(departamentoEstruct != null){
                method = 'put'
                path = 'departamentos/' + departamento.id
            }

            axios[method](apiUrl + path, formData,{
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                alert("departamento guardado!");
                navigate('/departamentos')
            })
            .catch(error => {
                console.error('Error al hacer la solicitud ' + method + ':', error);
            });

        }
        else{
            console.log('Formulario Invalido!!!!');
            console.log(validacionDelFormulario.validacion);
            console.log(validacionCampos);
            setValidacionCampos(validacionDelFormulario.validacion);
        }

    }
    
    return (
        <form className="formulario" onSubmit={enviarFormulario}>
        {/*method="post" action={'http://localhost:5000/creardepartamento'} */}

        
{/*  */}<div className="container-fluid">
                <div className="row">
                <div className="col-2"></div>
                    {/* LOGO mb-3*/}
                    <div className="col-3">
                       <div className="imagen-icon"> 
                            <div className="circle-image">
                                
                                {departamento.logo.id !== "" ? (    
                                    <a href={departamento.logo.url}>
                                        <img id="imagePreview" className="cargado" src={departamento.logo.url} />
                                    </a>
                                    ) : ( 
                                        <img id="imagePreview" src="" alt="Preview" style={{ width: '184px',height: '184px' , stroke: '#67B4C0', display: "none" }} />
                                    )}    

                            </div>
                            <div className="custom-file-upload">
                                    <CameraIcon
                                        onClick={() => document.getElementById('fileInput').click()} // Hacer clic en el input de archivo al hacer clic en el icono
                                        style={{ cursor: 'pointer' }} // Cambiar el cursor al puntero para indicar que es clickeable
                                    />
                                    <input
                                        type="file"
                                        accept=".jpg, .jpeg, .png, .gif, .svg"
                                        id="fileInput"
                                        name="logo"
                                        style={{ display: 'none' }} // Ocultar el input de archivo inicialmente
                                        onChange={handleInputChange}
                                        
                                    />
                                    
                                </div>
                            </div>    
                    </div>

                    
                    {/* DENOMINACION */}
                    <div className="col-5">
                        <div className={`form-group`}>
                            <label htmlFor="nombre" className="form-label fw-bold">Nombre del Departamento*</label>
                            <input type="text" className="form-control"  id="nombre" name="nombre" value={departamento.nombre} onChange={handleInputChange} required placeholder="Ingrese el departamento" />
                            <div className={`form-text ${validacionCampos.nombre.invalido? 'item-error-validation': ''}`}>{validacionCampos.nombre.mensaje}
                            </div>  
                        </div>
                        {/* DESCRIPCION */}
                        <div className="mb-3">
                            <label htmlFor="descripcion" className="form-label fw-bold">Descripción*</label>
                            <textarea className={`form-control`} required name="descripcion" id="descripcion" rows="2" value={departamento.descripcion} onChange={handleInputChange} placeholder="Ingrese la descripción"></textarea>
                            <div className={`form-text ${validacionCampos.descripcion.invalido? 'item-error-validation': ''}`}>{validacionCampos.descripcion.mensaje}</div> 
                        </div>                        
                    
                    </div>
                </div>
            </div>    
            {/* ----------------------------------------------------- */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2"></div>
                    
                    <div className="section-title col-8">
                        <h5 className="titulo">Asignacion de Usuarios</h5>
                        <a className="agregar-usuario" onClick={addAutoridad}>
                            + Añadir
                        </a>
                    </div> 
                </div>
            
                

                {departamento.autoridades.map((autoridad, index) => {
                    return(
                        <div className="row" key={index}>
                        <div className="col-2"></div>

                            <div className="col-3">
                                <div className="mb-3">
                                    <label className="form-label fw-bold" htmlFor="rol" >Rol*
                                    </label>
                                    {/* TODO: VER que se muestren correctamentes los nombres de los roles, esto viene presuntament`e` de otro componente, puede ser editarDepartamentos */}
                                    <select required className={`form-select`} aria-label="Large select example" id="rol" name="rol" onChange={(event) => asignar(event, index)} value={autoridad.rol}>                          
                                        <option value="">Seleccione</option>
                                        {selectRolUsuario}
                                    </select>
                                    {/* <div className={`form-text ${validacionCampos.rolUsuario.invalido? 'item-error-validation': ''}`}>{validacionCampos.rolUsuario.mensaje}
                                    
                                    </div>    */}
                                </div>  
                            </div>

                            <div className="col-5">
                                <div className="mb-3">
                                    
                                        <label className="form-label fw-bold" htmlFor="usuario">Usuario*
                                        </label>
                                        {/* TODO: VER que se muestren correctamentes los nombres de los roles, esto viene presuntamente de otro componente, puede ser editarDepartamentos */}
                                        <select required className={`form-select`} aria-label="Large select example" id="usuario" name="usuario" onChange={(event) => asignar(event, index)} value={autoridad.usuario}>   
                                            <option value="" >Seleccione</option>                         
                                            {/* <option value="">Seleccione</option>
                                            {selectUsuarios.map( (usuario) => {
                                                <option value={usuario}>{usuario}</option>
                                            })} */}
                                            {selectUsuarios}
                                        </select>
                                    <div className="eliminar-departamento">
                                        <a className="eliminar" onClick={() => removeAutoridad(index)}>
                                            - Eliminar
                                        </a>
                                    </div>
                                    <div className={`form-text ${validacionCampos.nombre.invalido? 'item-error-validation': ''}`}>{validacionCampos.nombre.mensaje}
                                    
                                    </div>   
                                </div>  
                            </div>

                            {/* <div className="col-5">
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label fw-bold">Nombre del Usuario*</label>
                                    
                                    <input type="text" id="nombre" name="nombre" className="form-control" value={autoridad.usuario.nombre} onChange={handleInputChange} required placeholder="Ingrese el nombre del usuario"/>    
                                </div>
                                
                            </div> */}

                        </div>    
                        );
                })}

                
            </div>                   
        
            <div className="button-ctn">
                <a href="/departamentos" className="copal-button-white" >
                    CANCELAR
                </a>
                <button type="submit" className="copal-button" >
                    {departamentoEstruct !== null ? "GUARDAR" : "AGREGAR"} 
                </button>
            </div>                    
        </form>
    );
}

export default FormularioDepartamentos;