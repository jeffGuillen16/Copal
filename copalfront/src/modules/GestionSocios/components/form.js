import React,{Fragment} from "react";
import {useForm} from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './forms.css'

const Formulario=(props)=>{
    let socios=['Socio','Camara'];
    let provincia=['Ciudad Autónoma de Buenos Aires','Buenos Aires','Catamarca','Chaco','Chubut','Córdoba','Corrientes','Entre Ríos','Formosa','Jujuy','La Pampa','La Rioja','Mendoza','Misiones','Neuqué','Rio Negro','Salta','San Juan','San Luis','Santa Cruz','Santiago del Estero','Tierra del Fuego',
    'Tucumán'];
    let localidad=['Localidad1','Localidad2'];
    const {register, formState:{errors},handleSubmit}=useForm();
    const onSubmit=(data)=>{
        console.log(data);

    }
return(
    <Fragment>
        <form className="row" onSubmit={handleSubmit(onSubmit)} >
            {/* Comienza Primera Fila*/}
            <h4 className=" color col-2 ">{props.name}</h4>
            <div className="  col-1 offset-8">    
                <button
                    className=" div0  btn btn-default"
                    type="submit"
                    value="enviar"
                    >Guardar</button>
            </div>
            <div className=" col-1">    
                <button
                    className=" div0   btn btn-default"
                    type="submit"
                    >Cancelar</button>
            </div>
            
            <div className="  col md-2">
                <label className="color" >Nombre</label>
                <br></br>
                <input 
                type="text"
                className="div"
                placeholder="Escriba aqui.."
                {...register('nombre',{
                    required: true,
                    maxLength:20
                })}/>
                {errors.nombre?.type==='required' && <p>El campo es requerido</p>}
                {errors.nombre?.type==='maxLength' && <p>El campo debe tener menos de 20 caracteres</p>}
            </div>
            <div className="  col md-2">
                <label className="color" >Tipo de Socio</label>
                <br></br>
                <select className="div" {...register('tipoSocio')}>
                    <option value={socios[0]}>{socios[0]}</option>
                    <option value={socios[1]}>{socios[1]}</option>
                </select>
            </div>
            <div className="col md-2 ">
                <label className="color">Denominacion</label>
                <br></br>
                <input
                type="text"
                className=" div"
                placeholder="Escriba aqui.."
                {...register('denominacion',{
                    required: true,
                    maxLength:20
                })}
                />
                {errors.denominacion?.type==='required' && <p>El campo es requerido</p>}
                {errors.denominacion?.type==='maxLength' && <p>El campo debe tener menos de 20 caracteres</p>}
            </div>
            <div className=""></div>
            <div className="col md-2 ">
                <label className="color">Email</label>
                <br></br>
                <input
                type="email"
                className="div"
                placeholder="Escriba aqui.."
                {...register('email',{
                    required: true,
                    maxLength:20
                },{
                    pattern:"[a-zA-Z0-9!#$%&'*\/=?^_`\{\|\}~\+\-]([\.]?[a-zA-Z0-9!#$%&'*\/=?^_`\{\|\}~\+\-])+@[a-zA-Z0-9]([^@&%$\/\(\)=?¿!\.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2})?"
                })}
                />
                {errors.email?.type==='required' && <p>El campo es requerido</p>}
                {errors.email?.type==='maxLength' && <p>El campo debe tener menos de 20 caracteres</p>}
                {errors.email?.type==='pattern' && <p>El formato del Email es incorrecto</p>}
            </div>
            <div className="  col md-2">
                <label className="color" >Numero de telefono</label>
                <br></br>
                <input 
                type="text"
                className="div"
                placeholder="ej.(011)1530210167"
                {...register('telefono',{
                    required: true,
                    maxLength:20
                })}/>
                {errors.telefono?.type==='required' && <p>El campo es requerido</p>}
                {errors.telefono?.type==='maxLength' && <p>El campo debe tener menos de 20 caracteres</p>}
            </div>
            <div className="  col md-2">
                <label className="color" >Pagina web</label>
                <br></br>
                <input 
                type="text"
                className="div"
                placeholder="ej.(011)1530210167"
                {...register('pagina',{
                    required: true,
                    maxLength:20
                })}/>
                {errors.pagina?.type==='required' && <p>El campo es requerido</p>}
                {errors.pagina?.type==='maxLength' && <p>El campo debe tener menos de 20 caracteres</p>}
            </div>
             <div className="col-md-12"></div>   
            <div className="  col md-2">
                <label className="color" >Localidad</label>
                <br></br>
                <select className="div" {...register('tipoSocio')}>
                    <option value={localidad[0]}>{localidad[0]}</option>
                    <option value={localidad[1]}>{localidad[1]}</option>    
                </select>
            </div>
            <div className="  col md-2 ">
                <label className="color" >Provincia</label>
                <br></br>
                <select className="div" {...register('tipoSocio')}>
                    <option value={provincia[1]}>{provincia[1]}</option>    
                    <option value={provincia[0]}>{provincia[0]}</option>
                </select>
            </div>
            <div className="col-5"></div>
            <div className="col md-2 offset-sm-0  ">
                <label className="color">Dirrecion</label>
                <br></br>
                <input
                type="text"
                className=" div"
                placeholder="Escriba aqui.."
                {...register('direccion',{
                    required: true,
                    maxLength:20
                })}
                />
                {errors.direccion?.type==='required' && <p>El campo es requerido</p>}
                {errors.direccion?.type==='maxLength' && <p>El campo debe tener menos de 20 caracteres</p>}
            </div>
            
            <div className="col md-2 offset-sm-0">
                <label className="color">Departamento</label>
                <br></br>
                <input
                type="text"
                className=" div"
                placeholder="Escriba aqui.."
                {...register('departamento',{
                    required: true,
                    maxLength:20
                })}
                />
                {errors.departamento?.type==='required' && <p>El campo es requerido</p>}
                {errors.departamento?.type==='maxLength' && <p>El campo debe tener menos de 20 caracteres</p>}
            </div>
            <div className="col-10"></div>
            <div className="col md-2">
                <label className="color">Descripcion</label>
                <br></br>
                <input
                type="text"
                className=" div3"
                placeholder="Escriba aqui.."
                {...register('direccion')}
                />
            </div>
        </form>
    </Fragment>
);
}
 export default Formulario;