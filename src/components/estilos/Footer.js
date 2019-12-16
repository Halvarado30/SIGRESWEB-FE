import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Navbar.css";

class Footer extends React.Component {
  render() {
    return (
      <footer class="page-footer font-small black fixed-bottom">
        <div class="footer-copyright text-center py-3">
          © 2019 Copyright: &nbsp;
          <label>Gimena Sánchez - Hesler Alvarado</label>
        </div>
      </footer>
    );
  }
}

export default Footer;
