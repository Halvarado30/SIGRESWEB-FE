import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

class EditComponent extends React.Component {
  render() {
    let userId = 0;
    //let userId = this.props.match.params.employeeId;
    return (
      <form>
        <div class="form-row justify-content-center">
          {/* sección para el RTN del cliente */}
          <div class="form-group col-md-7">
            <label for="inputPassword4">RTN</label>
            <input
              type="text"
              class="form-control"
              placeholder="RTN del Cliente"
            />
          </div>

          {/* sección para el nombre del cliente */}
          <div class="form-group col-md-7">
            <label for="inputPassword4">Nombre cliente</label>
            <input
              type="text"
              class="form-control"
              placeholder="Nombre del Cliente"
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
            />
          </div>
          <div class="form-group col-md-7">
            <button type="submit" class="btn btn-primary">
              Guardar
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default EditComponent;
