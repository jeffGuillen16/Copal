import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './conteiner_cards.css';

function Conteinercards(props) {
 
    return (
      <div className="row">
        <div className="col-sm">
            {props.children}
        </div>
        <div className="col-sm">
            {props.children2}
        </div>
      </div>
    );
  }
  export default Conteinercards;
  