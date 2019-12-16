import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";
import * as globalUrl from "./variable";
import { Redirect } from "react-router-dom";
import "./estilos/estilo.css";

const baseUrl = globalUrl.url;

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      campLogin: "",
      campContrasenia: "",
      isSignedUp: false
    };
  }

  render() {
    if (this.state.isSignedUp) {
      return <Redirect to={{ pathname: "/areas" }} />;
    }
    return (
      <div>
        <div className="formimagen">
          <img src="./img/logoFrites_Grill.png" alt="logo"></img>
          <br />
          <br />
          <h5>Inicio de sesión</h5>
        </div>
        <div className="form-login">
          {/* sección para el nombre de Usuario */}
          <div className="form-group col-md-10">
            <label for="inputPassword4">Nombre de Usuario</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre de usuario"
              value={this.state.campLogin}
              onChange={value =>
                this.setState({ campLogin: value.target.value })
              }
              required
            />
          </div>

          {/* sección para la contraseña del usuario*/}
          <div className="form-group col-md-10">
            <label for="inputPassword4">Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••••••••"
              value={this.state.campContrasenia}
              onChange={value =>
                this.setState({ campContrasenia: value.target.value })
              }
              required
            />
          </div>

          <div className="form-group col-md-7">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => this.sendSave()}
            >
              ACCEDER
            </button>
          </div>
        </div>
      </div>
    );
  }

  sendSave() {
    if (this.state.campLogin === "") {
      alert("Digite el nombre de usuario");
    } else if (this.state.campContrasenia === "") {
      alert("Digite la contraseña");
    } else {
      const bUrl = baseUrl + "/usuario/login";
      const datapost = {
        LoginUsuario: this.state.campLogin,
        Contrasena: this.state.campContrasenia
      };
      return axios
        .post(bUrl, datapost)
        .then(response => {
          if (response.status === 200) {
            localStorage.setItem("token", response.data.token);
            this.setState({ isSignedUp: true });
          }
        })
        .catch(error => {
          this.setState({
            isSignedUp: false,
            campLogin: "",
            campContrasenia: ""
          });
        });
    }
  }
}

export default LoginComponent;
