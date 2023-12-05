import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/images/logo1.png' 


const Navigation=()=>{
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src={logo} alt="Logo Copal" className="img-fluid w-50 h-auto"/>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                    <a className="nav-link" href="GestionSocios">Gestion de Socios</a>
                    <a className="nav-link" href="/">Varios</a>
                    <a className="nav-link disabled" aria-disabled="true" href="/">Disabled</a>
                </div>
            </div>
            </div>
        </nav>
    );
};
export default Navigation;