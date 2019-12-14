import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
class Navbar extends React.Component {
  getNavLinkClass = path => {
    return this.props.location.pathname === path ? "active" : "";
  };
  render() {
    return (
      <nav className="navbar navbar-inverse ">
        <Link class="btn btn-info " to="/login">
          Login
        </Link>
        <Link class="btn btn-info " to="/">
          Iniciar
        </Link>
        <Link class="btn btn-info " to="/formCliente">
          Agregar Cliente
        </Link>
      </nav>
    );
  }
}
Navbar = withRouter(Navbar);
export default Navbar;
