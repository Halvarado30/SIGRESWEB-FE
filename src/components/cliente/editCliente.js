import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Redirect } from "react-router-dom";
import axios from "axios";
import * as globalUrl from "../variable";

// Libreria de Sweetalert2
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const baseUrl = globalUrl.url;

class EditComponent extends React.Component {
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

  componentDidMount() {
    let userId = this.props.match.params.id;
    const url = baseUrl + "/cliente/get/" + userId;
    axios
      .get(url)
      .then(res => {
        if (res.data.success) {
          const data = res.data.data[0];
          this.setState({
            dataCliente: data,
            campRTN: data.rtn,
            campNombre: data.nombre,
            campTelefono: data.telefono,
            campCorreo: data.correo,
            campDireccion: data.direccion
          });
        } else {
          alert("Error web service");
        }
      })
      .catch(error => {
        alert("Error server " + error);
      });
  }

  render() {
    let userId = this.props.match.params.id;
    if (localStorage.getItem("token")) {
      return (
        <div>
          <div>
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
                  className="btn btn-primary"
                  onClick={() => this.onUpdate(userId)}
                >
                  Actualizar
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to={{ pathname: "/" }} />;
    }
  }

  onUpdate(userId) {
    // Mensaje sweetalert
    Swal.fire({
      title: "¿Estás seguro?",
      text: "La información será modificada",
      type: "Alerta",
      showCancelButton: true,
      confirmButtonText: "¡Sí, Actualizar!",
      cancelButtonText: "No, Conservar"
    }).then(result => {
      if (result.value) {
        this.sendUpdate(userId);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelado", "Tu información sigue igual", "error");
      }
    });
  }

  sendUpdate(id) {
    // url de backend
    const Url = baseUrl + "/cliente/update/" + id;
    // parametros de datos post
    const datapost = {
      rtn: this.state.campRTN,
      nombre: this.state.campNombre,
      telefono: this.state.campTelefono,
      correo: this.state.campCorreo,
      direccion: this.state.campDireccion
    };

    axios
      .post(Url, datapost)
      .then(response => {
        if (response.data.success == true) {
          Swal.fire(
            "¡Actualizado!",
            "La información del cliente ha sido modificada.",
            "correcto"
          );
        } else {
          alert("Error");
        }
      })
      .catch(error => {
        alert("Error 34 " + error);
      });
  }
}

export default EditComponent;
