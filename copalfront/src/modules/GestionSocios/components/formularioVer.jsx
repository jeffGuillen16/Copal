import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './forms.css';

const UserCard = ({ user }) => {
  return (
    <React.StrictMode>
    <div className="container-fluid">
      <div className="row justify-content-center">
        
        <div className="col-lg-12">
          <div className="card mb-4">
            <div className="card-body">
            <h4 className="card-title rounded p-2 bg-primary text-white w-100"  >Datos del Socio</h4>
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Nombre:</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{user.denominacion}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Descripcion:</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{user.descripcion}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Email:</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{user.mail}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Telefono:</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{user.telefono}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Ubicacion: </p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">
                    {user.ubicacion.calle}, {user.ubicacion.altura}, {user.ubicacion.localidad}, {user.ubicacion.provincia}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Sitio Web:</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">
                    <a href={user.sitioWeb} target="_blank" rel="noopener noreferrer">{user.sitioWeb}</a>
                  </p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Fecha de Alta:</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{user.fechaDeAlta}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Tipo de Socio:</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{user.tipoSocio.nombreTipoSocio}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Areas:</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{user.areas.map((area)=>area.nombre).join(', ')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>    
    </React.StrictMode>
    
  );
};

export default UserCard;

