import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './footer/footer.css';

function Footer() {
    return (
        <React.StrictMode>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 text-center text-white custom-footer d-flex align-items-center justify-content-center">
                        <p className='m-0'>©2023 COPAL. Todos los derechos reservados. Desarrollado por alumnos UTN.</p>
                    </div>
                </div>
            </div>
        </React.StrictMode>
    );
}

export default Footer;