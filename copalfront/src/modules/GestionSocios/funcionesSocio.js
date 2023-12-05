

function GetSocio(){
    let socio;
    //Solictud get con axios
    socio = {descripcion:"una descripcion", 
    url:"https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png",id:12};

     let respuesta = {socio:socio, areas:['','','',''], tipoSocio:['socio','camara']};


    //Fin solicitud
    return respuesta;
  }
export default GetSocio;