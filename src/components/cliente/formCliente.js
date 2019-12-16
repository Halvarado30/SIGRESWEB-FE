import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";
import { Redirect } from "react-router-dom";
import * as globalUrl from "../variable";
const bUrl = globalUrl.url;

class AgregarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campRTN: "",
      campNombre: "",
      campTelefono: "",
      campCorreo: "",
      campDireccion: ""
    };
  }

  render() {
    if (localStorage.getItem("token")) {
      return (
        <form>
          <div className="form-row justify-content-center">
            {/* sección para el RTN del cliente */}
            <div className="form-group col-md-7">
              <label for="inputPassword4">RTN</label>
              <input
                type="text"
                className="form-control"
                placeholder="RTN del Cliente"
                value={this.state.campRTN}
                onChange={value =>
                  this.setState({ campRTN: value.target.value })
                }
                required
              />
            </div>

            {/* sección para el nombre del cliente */}
            <div className="form-group col-md-7">
              <label for="inputPassword4">Nombre cliente</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre del Cliente"
                value={this.state.campNombre}
                onChange={value =>
                  this.setState({ campNombre: value.target.value })
                }
                required
              />
            </div>

            {/* sección para el teléfono del cliente */}
            <div className="form-group col-md-7">
              <label for="inputPassword4">Teléfono</label>
              <input
                type="number"
                className="form-control"
                placeholder="+504 XXXX-XXXX"
                value={this.state.campTelefono}
                onChange={value =>
                  this.setState({ campTelefono: value.target.value })
                }
                required
              />
            </div>

            {/* sección para el correo del cliente */}
            <div className="form-group col-md-7">
              <label for="inputEmail4">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                placeholder="nombre@dominio"
                value={this.state.campCorreo}
                onChange={value =>
                  this.setState({ campCorreo: value.target.value })
                }
              />
            </div>

            {/* sección para la dirección del cliente */}
            <div className="form-group col-md-7">
              <label for="inputAddress">Dirección</label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="Barrio XXXXX Calle XXXX"
                value={this.state.campDireccion}
                onChange={value =>
                  this.setState({ campDireccion: value.target.value })
                }
              />
            </div>
            <div className="form-group col-md-7">
              <button
                type="submit"
                className="btn btn-outline-primary"
                onClick={() => this.sendSave()}
              >
                GUARDAR
              </button>
            </div>
          </div>
        </form>
      );
    } else {
      return <Redirect to={{ pathname: "/" }} />;
    }
  }

  // Sección para guardar los datos del cliente en la base de datos
  sendSave() {
    if (this.state.campRTN === "") {
      alert("Digite el campo de RTN");
    } else if (this.state.campNombre === "") {
      alert("Digite el campo de Nombre");
    } else if (this.state.campTelefono === "") {
      alert("Digite el campo de Telefono");
    } else if (this.state.campCorreo === "") {
      alert("Digite el campo de email");
    } else if (this.state.campDireccion === "") {
      alert("Digite el campo de Direccion");
    } else {
      const baseUrl = bUrl + "/cliente/crear";
      const datapost = {
        rtn: this.state.campRTN,
        nombre: this.state.campNombre,
        telefono: this.state.campTelefono,
        correo: this.state.campCorreo,
        direccion: this.state.campDireccion
      };

      axios
        .post(baseUrl, datapost)
        .then(response => {})
        .catch(error => {
          alert("Error 34 " + error);
        });
    }
  }
}

export default AgregarComponent;
