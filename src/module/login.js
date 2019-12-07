import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";
import * as globalUrl from "./variable";
import { Link } from "react-router-dom";

const baseUrl = globalUrl.url;

class EditComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campLogin: "",
      campContrasenia: ""
    };

    // this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }

  // onChange(e) {
  //   this.setState({ [e.target.name]: e.target.value });
  // }
  // onSubmit(e) {
  //   e.preventDefault();

  //   const user = {
  //     email: this.state.email,
  //     password: this.state.password
  //   };

  // login(user).then(res => {
  //   if (res) {
  //     this.props.history.push(`/profile`);
  //   }
  // });
  // }

  render() {
    return (
      <form>
        <div class="form-row justify-content-center">
          {/* sección para el nombre de Usuario */}
          <div class="form-group col-md-7">
            <label for="inputPassword4">Nombre de Usuario</label>
            <input
              type="text"
              class="form-control"
              placeholder="Nombre de usuario"
              value={this.state.campLogin}
              onChange={value =>
                this.setState({ campLogin: value.target.value })
              }
              // value={this.state.campLogin}
              // onChange={this.onChange}
              required
            />
          </div>

          {/* sección para la contraseña del usuario*/}
          <div class="form-group col-md-7">
            <label for="inputPassword4">Contraseña</label>
            <input
              type="password"
              class="form-control"
              placeholder="••••••••••••••"
              // value={this.state.campContrasenia}
              // onChange={this.onChange}
              value={this.state.campContrasenia}
              onChange={value =>
                this.setState({ campContrasenia: value.target.value })
              }
              required
            />
          </div>

          <div class="form-group col-md-7">
            <button
              type="submit"
              class="btn btn-primary"
              onClick={() => this.sendSave()}
            >
              Acceder
            </button>
          </div>
        </div>
      </form>
    );
  }

  sendSave() {
    if (this.state.campLogin === "") {
      alert("Digite el nombre de usuario");
    } else if (this.state.campContrasenia === "") {
      alert("Digite la contraseña");
    } else {
      const Url = baseUrl + "/login";

      console.log(this.state.campLogin);
      console.log(this.state.campContrasenia);
      const datapost = {
        LoginUsuario: this.state.campLogin,
        Contrasena: this.state.campContrasenia
      };

      console.log(datapost);
      alert("ESPERE");
      axios
        .post(Url, datapost)
        .then(response => {
          if (response.data.success === true) {
            alert(response.data.message);
          } else {
            alert(response.data.message);
          }
        })
        .catch(error => {
          alert("Error 34 " + error);
        });
    }
  }
}

export default EditComponent;