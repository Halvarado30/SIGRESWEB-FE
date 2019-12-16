import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Link } from "react-router-dom";
import "./estilos/pagina404.css";

class PaginaError extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 2
    };
  }

  componentDidMount() {}

  render() {
    return (
      // <div>
      <div className="error-page">
        <div>
          <h1 data-h1="404">404</h1>
          <p data-p="NOT FOUND">Página no encontrada</p>
          <Link className="btn btn-outline-primary" to={"/areas"}>
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }
}

export default PaginaError;
