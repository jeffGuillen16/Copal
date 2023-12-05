import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './forms.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

const generarItem = (nombre, id)=>{
    return (<option key={id} data-key={id} value={nombre}>{nombre}</option>);
}

const validarCampos = (socio) => {
    const { denominacion, cuit, tipoSocio, areas, descripcion, mail, telefono, sitioWeb, provincia, localidad, calle, altura } = socio;
  
    // Expresión regular para validar el formato del CUIT
    const cuitRegex = /^\d{2}-\d{8}-\d{1}$/;
    const mailRegex =  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const sitioWebRegex = /^(https?:\/\/)?([\w-]+\.)+[\w]{2,}(\/)?$/;

  
    const esCadenaVacia = (cadena) => cadena===null || cadena===undefined || cadena.trim() === '';// Función para verificar si una cadena está vacía
  
    const validacion = {
      denominacion: { invalido: esCadenaVacia(denominacion), mensaje: '' },
      cuit: { invalido: esCadenaVacia(cuit) || !cuitRegex.test(cuit), mensaje: 'CUIT Inválido (ej: 12-12345678-9)'},
      tipoSocio: { invalido: !tipoSocio, mensaje: !tipoSocio? 'Debes selecionar un tipo': '' },
      areas: { invalido: areas.length === 0, mensaje: areas.length===0? 'Debe seleccionar al menos un Area': ''},
      descripcion: { invalido: esCadenaVacia(descripcion), mensaje: '' },
      mail: { invalido: esCadenaVacia(mail) || !mailRegex.test(mail), mensaje: !mailRegex.test(mail)? 'Email Invalido!' :''},
      telefono: { invalido: esCadenaVacia(telefono), mensaje: '' },
      sitioWeb: { invalido: esCadenaVacia(sitioWeb) || !sitioWebRegex.test(sitioWeb), mensaje: !sitioWebRegex.test(sitioWeb)? 'Sitio Web Invalido':'' },
      provincia: { invalido: !provincia, mensaje: '' },
      localidad: { invalido: !localidad, mensaje: '' },
      calle: {invalido: esCadenaVacia(calle), mensaje: ''},
      altura: {invalido: esCadenaVacia(altura), mensaje: ''}
    };
  
    let valido = !validacion.areas.invalido && !validacion.denominacion.invalido && !validacion.cuit.invalido &&
      !validacion.tipoSocio.invalido && !validacion.descripcion.invalido && !validacion.mail.invalido &&
      !validacion.telefono.invalido && !validacion.sitioWeb.invalido && /* !validacion.provincia.invalido */ 
     /*  !validacion.localidad.invalido */  !validacion.calle.invalido && !validacion.altura.invalido;
  
    return {validacion: validacion, formularioValido: true};
  };
  
  
  
function FormularioCrear({areasDeSocio=[], tiposDeSocio=[], socioEstruct = null, provincias=[]}){

    const navigate = useNavigate();

    const [socio, setSocio] = useState({
        denominacion: "",
        tipoSocio: null,
        areas:[],
        cuit:"",
        descripcion: "",
        mail: "",
        telefono: "",
        sitioWeb: "",
        ubicacion:{
            provincia: "",
            localidad: "",
            calle: "",
            altura: "",
            departamento: "",
            piso: "" 
        },
        logo:{
            id:""
        }
    });

    const [logo, setLogo] = useState(null);

    useEffect(() => {
        if(socioEstruct !== null){
            setSocio(socioEstruct);
        }
    }, [socioEstruct]);

    const selectTiposSocio = [];
    selectTiposSocio.push();
    tiposDeSocio.forEach((tipo) => { selectTiposSocio.push(generarItem(tipo.nombreTipoSocio, tipo.id)); });
    
    const selectProvincias = [];
    provincias.forEach((prov) => { selectProvincias.push(generarItem(prov.nombre, prov.id)); });
    
    const [listado, setListado] = useState([]);    
    let optionsLocalidades = [];
    const changeSelectOptionHandler = (event) => {
        const selectedIndex = event.target.options.selectedIndex;
        const provinciaId = event.target.options[selectedIndex].getAttribute('data-key');
        Listado(provinciaId);    
        handleInputChange(event);
    }; 

    const Listado = (id) => {
        const endpoint = `provincias/${id}/localidades`;
        axios.get(apiUrl + endpoint).then((response) => {
          setListado(response.data);
        });
    }

    listado.forEach((loc) => { optionsLocalidades.push(generarItem(loc.nombre,loc.id)) });

    //estructura para validacion de campos
    const [validacionCampos, setValidacionCampos] = useState({
        denominacion:{invalido: false, mensaje: ''},
        cuit:{invalido: false, mensaje: ''},
        tipoSocio:{invalido: false, mensaje: ''},
        areas:{invalido: false, mensaje: ''},
        descripcion:{invalido: false, mensaje: ''},
        mail:{invalido: false, mensaje: ''},
        telefono:{invalido: false, mensaje: ''},
        sitioWeb:{invalido: false, mensaje: ''},
        provincia:{invalido: false, mensaje: ''},
        localidad:{invalido: false, mensaje: ''},
        calle:{invalido: false, mensaje: ''},
        altura:{invalido: false, mensaje: ''}
    });

    // Estado para el objeto socio

    // Funciones para manejar cambios en los campos del formulario
    const handleInputChange = (event) => {
        const { name, value} = event.target;
        // Si el campo es uno de los campos anidados en ubicacion, actualiza esos campos
        if (name.startsWith("ubicacion.")) {
            const subFieldName = name.replace("ubicacion.", "");
            setSocio({...socio, ubicacion: { ...socio.ubicacion, [subFieldName]: value } });
        }
        // Si el campo es tipoSocio, actualiza ese campo anidado
        else if (name === "tipoSocio") {
            const tipoSocioSeleccionado = tiposDeSocio.find((tipo) => tipo.nombreTipoSocio === value);
            console.log(value);
            console.log(tipoSocioSeleccionado.id, tipoSocioSeleccionado.nombreTipoSocio)
            setSocio({ ...socio, tipoSocio: { id: tipoSocioSeleccionado.id, nombreTipoSocio: value } });
        }
        else if (name === "logo") {
            //setSocio({ ...socio, logo: { urlPublica: value } });
            setLogo(event.target.files[0]);
            //setLogo({ logo: file });
        }
        
        // De lo contrario, actualiza los campos principales del objeto socio
        else { setSocio({ ...socio, [name]: value });
        }
    }

    // Función para manejar cambios en las áreas seleccionadas
    const handleAreaChange = (event) => {
        const { id, checked } = event.target;
        // Copia el array actual de áreas del socio
        const areasSocio = [...socio.areas];
        if (checked) {
          // Agrega el área al array si está marcada
          const areaSeleccionada = areasDeSocio.find((area) => area.id === parseInt(id));
          if (areaSeleccionada) {
            areasSocio.push(areaSeleccionada);
          }
        } else {
          // Elimina el área del array si está desmarcada
          const index = areasSocio.findIndex((area) => area.id === parseInt(id));
          if (index !== -1) {
            areasSocio.splice(index, 1);
          }
        }
      
        // Actualiza el estado con las áreas actualizadas
        setSocio({ ...socio, areas: areasSocio, });
    };
    
    const desahabilitarDefaultValue = (event) => {
        event.target.options[0].setAttribute("disabled", "");
    }
      

    const enviarFormulario = (event) => {
        event.preventDefault();
        const validacionDelFormulario = validarCampos(socio);
        //si el formulario es valido procedo
        if(validacionDelFormulario.formularioValido){

            console.log('Formulario Valido');
            console.log('Enviando Formulario....');
            console.log(socio);

            if(socioEstruct === null){
                axios.post(apiUrl + 'socios', socio)
                    .then(response => {
                        console.log('Respuesta de la API:', response.data);
                        const socio = response.data.id;
                        const formData = new FormData();
                        formData.append('logo', logo);

                        axios.post(apiUrl + `socios/${socio}/logo`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        }).then(response => {
                            navigate('/socios');
                        });
                        //window.location.reload();
                    })
                    .catch(error => {
                        console.error('Error al hacer la solicitud POST:', error);
                    });
                
            }else{
                axios.put(apiUrl + `socios/${socio.id}`, socio)
                    .then(response => {
                        console.log('Respuesta de la API:', response.data);
                        if(logo){
                            const socioId = response.data.id;
                            const formData = new FormData();
                            
                            formData.append('logo', logo);

                            axios.post(apiUrl + `socios/${socioId}/logo`, formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                },
                            });
                        }
                        
                        alert("Socio modificado!");
                        navigate('/socios');
                    })
                    .catch(error => {
                        console.error('Error al hacer la solicitud POST:', error);
                    });
            }
            
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
        {/*method="post" action={'http://localhost:5000/crearSocio'} */}
        <React.StrictMode>
            <div className="container-fluid">
                <div className="row">
                <div className="col-3">
                    <div className={`form-group`}>
                        <label htmlFor="denominacion" className="form-label fw-bold">Denominación*</label>
                        <input type="text" className={`form-control`}  id="denominacion" name="denominacion" value={socio.denominacion} onChange={handleInputChange} required />
                        <div className={`form-text ${validacionCampos.denominacion.invalido? 'item-error-validation': ''}`}>{validacionCampos.denominacion.mensaje}</div>  
                        
                    </div>
                    </div>

                    <div className="col-3">
                        <div className="mb-3">
                            <label for="denominacion" className="form-label fw-bold">CUIT*</label>
                            <input type="text" className={`form-control`}    id="cuit" name="cuit" value={socio.cuit} onChange={handleInputChange} required/>
                            <div className={`form-text ${validacionCampos.cuit.invalido? 'item-error-validation': ''}`}>{validacionCampos.cuit.mensaje}</div>                            
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="mb-3">
                            <label className="form-label fw-bold" for="tipoSocio">Tipo de Socio*</label>
                            <select className={`form-select`} aria-label="Large select example" id="tipoSocio" name="tipoSocio" onChange={handleInputChange} value={socio.tipoSocio === null? "": socio.tipoSocio.nombreTipoSocio}>                            
                                <option value="" >Seleccione</option>
                                {selectTiposSocio}
                            </select>
                            <div className={`form-text ${validacionCampos.tipoSocio.invalido? 'item-error-validation': ''}`}>{validacionCampos.tipoSocio.mensaje}</div>   
                        </div>
                        
                    </div>

                    <div className="col-3">
                        <div className="mb-3">
                            <label className="form-label fw-bold" >Áreas del Socio*</label>
                            <div className="dropdown">
                            
                                <button className="btn btn-copal dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Seleccione
                                </button>
                                <ul className="dropdown-menu w-100">
                                    {areasDeSocio.map((area) => (
                                        <li className="custom-checkboxs">
                                            <div key={area.id} className="form-check">
                                                <input
                                                    type="checkbox"
                                                    id={area.id}
                                                    name={area.nombre}
                                                    className={`form-check-input`}
                                                    checked={socio.areas.some((areaSocio)=> areaSocio.id === area.id)}
                                                    onChange={handleAreaChange}
                                                />
                                                <label className="form-check-label" htmlFor={area.id}>
                                                    {area.nombre}
                                                </label>
                                            </div>
                                        </li>
                                    ))}                            
                                </ul>
                            </div>
                            <div className={`form-text ${validacionCampos.areas.invalido? 'item-error-validation': ''}`}>{validacionCampos.areas.mensaje}</div> 
                        </div>
                    </div>

                </div>
            </div>
        </React.StrictMode>
        <React.StrictMode>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="mb-3">
                            <label for="descripcion" className="form-label fw-bold">Descripción*</label>
                            <textarea className={`form-control`} name="descripcion" id="descripcion" rows="2" value={socio.descripcion} onChange={handleInputChange}></textarea>
                            <div className={`form-text ${validacionCampos.descripcion.invalido? 'item-error-validation': ''}`}>{validacionCampos.descripcion.mensaje}</div> 
                        </div>                        
                    </div>
                </div>
            </div>

        </React.StrictMode>
        <React.StrictMode>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        <div className="mb-3">
                            <label for="mail" className="form-label fw-bold">Correo Electrónico*</label>
                            <input type="email" id="mail" name="mail" className={`form-control`} value={socio.mail} onChange={handleInputChange}/>
                            <div className={`form-text ${validacionCampos.mail.invalido? 'item-error-validation': ''}`}>{validacionCampos.mail.mensaje}</div>                           
                        </div>

                    </div>
                    <div className="col-4">
                        <label for="telefono" className="form-label fw-bold">Teléfono*</label>
                        <input type="text" id="telefono" name="telefono"  className={'form-control'} value={socio.telefono} onChange={handleInputChange}/>
                        <div className={`form-text ${validacionCampos.telefono.invalido? 'item-error-validation': ''}`}>{validacionCampos.telefono.mensaje}</div>   
                    </div>
                    <div className="col-4">
                        <label for="sitioWeb" className="form-label fw-bold">Sitio Web*</label>
                        <input type="text" id="sitioWeb" name="sitioWeb"  className={'form-control'} value={socio.sitioWeb} onChange={handleInputChange}/>
                        <div className={`form-text ${validacionCampos.sitioWeb.invalido? 'item-error-validation': ''}`}>{validacionCampos.sitioWeb.mensaje}</div>   
                    </div>
                </div>
            </div>
        </React.StrictMode>
        <React.StrictMode>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        <div className="mb-3">
                            <label className="form-label fw-bold" for="provincia">Provincia*</label>
                            <select className={`form-select`} aria-label="Large select example" id="provincias" name="ubicacion.provincia" onChange={changeSelectOptionHandler} value={socio.ubicacion.provincia === ""? "": socio.ubicacion.provincia}>
                                <option value="" >Seleccione</option>
                                {selectProvincias}
                            </select>
                            <div className={`form-text ${validacionCampos.provincia.invalido? 'item-error-validation': ''}`}>{validacionCampos.provincia.mensaje}</div>     
                        </div>                        
                    </div>
                   
                    <div className="col-4">
                        <div className="mb-3">
                            <label className="form-label fw-bold" for="provincia">Localidades*</label>
                            <select className='form-select' aria-label="Large select example" id="localidades" name="ubicacion.localidad" onChange={handleInputChange} value={socio.ubicacion.localidad === ""? "": socio.ubicacion.localidad}>
                                <option value="" >Seleccione</option>
                                {optionsLocalidades}
                            </select>
                            <div className={`form-text ${validacionCampos.localidad.invalido? 'item-error-validation': ''}`}>{validacionCampos.localidad.mensaje}</div>     
                        </div> 
                    </div>
                    <div className="col-4"></div>
                </div>
            </div>
        </React.StrictMode>

        <React.StrictMode>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        <div className="mb-3">
                            <label htmlFor="ubicacion.calle" className="form-label fw-bold">Calle*</label>
                            <input type="text" id="calle" name="ubicacion.calle" className="form-control" value={socio.ubicacion.calle} onChange={handleInputChange} required/>                           
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="mb-3">
                            <label htmlFor="altura" className="form-label fw-bold">Altura*</label>
                            <input type="text" id="altura" name="ubicacion.altura" className="form-control" value={socio.ubicacion.altura} onChange={handleInputChange} required/>   
                        </div>
                    </div>
                    <div className="col-4"></div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        <div className="mb-3">
                            <label htmlFor="ubicacion.departamento" className="form-label fw-bold">Nro. Departamento</label>
                            <input type="text" id="departamento" name="ubicacion.departamento"  className="form-control" value={socio.ubicacion.departamento} onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="mb-3">
                            <label htmlFor="ubicacion.piso" className="form-label fw-bold">Piso</label>
                            <input type="text" id="piso" name="ubicacion.piso" className="form-control" value={socio.ubicacion.piso} onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className="col-4"></div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-8">
                        <div className="mb-3">
                            <label htmlFor="logo" className="form-label fw-bold">Logo* </label>
                            {socio.logo.id !== "" ? (
                                    <div><a href={socio.logo.url}><img src={socio.logo.url} height={80}></img></a></div>
                                ) : ( ""
                                )}
                            
                            <input type="file" accept="image/.jpg" id="logoSocio" name="logo" className="form-control" onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className="col-4"></div>
                </div>
            </div>
        </React.StrictMode>

            <div className="button-ctn">
                    <a href="/departamentos" className="copal-button-white" >
                        CANCELAR
                    </a>
                    <button type="submit" className="copal-button" >
                        {socioEstruct !== null ? "GUARDAR" : "AGREGAR"} 
                    </button>
            </div>
        </form>
    );
}

export default FormularioCrear;