import React from "react";
import { withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { MDBIcon } from "mdbreact";
import jwt_decode from "jwt-decode";

class Navbar extends React.Component {
  logOut(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    this.props.history.push(`/`);
  }
  render() {
    const loginLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link" hidden>
            Login
          </Link>
        </li>
      </ul>
    );

    if (localStorage.getItem("token")) {
      const variable = localStorage.token;
      const decoded = jwt_decode(variable);
      const usuarioLink = (
        <ul className="navbar-nav justify-content-end">
          <li class="nav-item">
            <label>
              <img id="user" src="../img/usuario.png" alt="usuario" /> &nbsp;
              {decoded.nombreEmpleado}
            </label>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/areas">
              <MDBIcon icon="home" />
              &nbsp; Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link class="nav-link" onClick={this.logOut.bind(this)} to={"/"}>
              <MDBIcon icon="sign-in-alt" />
              &nbsp; Cerrar sesión
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/listCliente"}>
              <MDBIcon icon="cog" />
              &nbsp;
            </Link>
          </li>
        </ul>
      );

      return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark rounded">
          <div class="d-flex flex-grow-1">
            <span class="w-100 d-lg-none d-block"></span>
            <a
              class="navbar-brand"
              href="https://www.facebook.com/fritesngrill/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="../img/logoFrites_Grill.png" alt="logo" /> &nbsp; Frites
              & Grill
            </a>
            <div class="w-100 text-right">
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#myNavbar7"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>

          <div
            class="collapse navbar-collapse flex-grow-1 text-right"
            id="myNavbar7"
          >
            {localStorage.token ? usuarioLink : 0}
          </div>
        </nav>
      );
    } else {
      return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div class="d-flex flex-grow-1">
            <span class="w-100 d-lg-none d-block"></span>
            <a
              class="navbar-brand"
              href="https://www.facebook.com/fritesngrill/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Frites & Grill
            </a>
          </div>
          {localStorage.token ? 0 : loginLink}¿
        </nav>
      );
    }
  }
}
Navbar = withRouter(Navbar);
export default Navbar;
