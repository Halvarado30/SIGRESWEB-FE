import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";
const baseUrl = "http://3179d50b.ngrok.io";

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
    console.log(userId);
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
    return (
      <div>
        <div class="form-row justify-content-center">
          {/* sección para el RTN del cliente */}
          <div class="form-group col-md-7">
            <label for="inputPassword4">RTN</label>
            <input
              type="text"
              class="form-control"
              placeholder="RTN del Cliente"
              value={this.state.campRTN}
              onChange={value => this.setState({ campRTN: value.target.value })}
              required
            />
          </div>

          {/* sección para el nombre del cliente */}
          <div class="form-group col-md-7">
            <label for="inputPassword4">Nombre cliente</label>
            <input
              type="text"
              class="form-control"
              placeholder="Nombre del Cliente"
              value={this.state.campNombre}
              onChange={value =>
                this.setState({ campNombre: value.target.value })
              }
              required
            />
          </div>

          {/* sección para el teléfono del cliente */}
          <div class="form-group col-md-7">
            <label for="inputPassword4">Teléfono</label>
            <input
              type="number"
              class="form-control"
              placeholder="+504 XXXX-XXXX"
              value={this.state.campTelefono}
              onChange={value =>
                this.setState({ campTelefono: value.target.value })
              }
              required
            />
          </div>

          {/* sección para el correo del cliente */}
          <div class="form-group col-md-7">
            <label for="inputEmail4">Correo electrónico</label>
            <input
              type="email"
              class="form-control"
              placeholder="nombre@dominio"
              value={this.state.campCorreo}
              onChange={value =>
                this.setState({ campCorreo: value.target.value })
              }
            />
          </div>

          {/* sección para la dirección del cliente */}
          <div class="form-group col-md-7">
            <label for="inputAddress">Dirección</label>
            <input
              type="text"
              class="form-control"
              id="inputAddress"
              placeholder="Barrio XXXXX Calle XXXX"
              value={this.state.campDireccion}
              onChange={value =>
                this.setState({ campDireccion: value.target.value })
              }
            />
          </div>

          <div class="form-group col-md-7">
            <button type="submit" class="btn btn-primary">
              Actualizar
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default EditComponent;
