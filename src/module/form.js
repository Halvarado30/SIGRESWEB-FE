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
          <div class="form-group col-md-6">
            <label for="inputPassword4">RTN</label>
            <input type="text" class="form-control" placeholder="Name" />
          </div>
          <div class="form-group col-md-6">
            <label for="inputPassword4">nombre {userId}</label>
            <input type="text" class="form-control" placeholder="Name" />
          </div>
          <div class="form-group col-md-6">
            <label for="inputPassword4">direccion</label>
            <input type="text" class="form-control" placeholder="Name" />
          </div>
          <div class="form-group col-md-6">
            <label for="inputPassword4">teléfono</label>
            <input type="text" class="form-control" placeholder="Name" />
          </div>
          <div class="form-group col-md-6">
            <label for="inputEmail4">correo electrónico</label>
            <input type="email" class="form-control" placeholder="Email" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputState">rol</label>
            <select id="inputState" class="form-control">
              <option selected>cambiar...</option>
              <option>...</option>
            </select>
          </div>
          <div class="form-group col-md-6">
            <label for="inputEmail4">Phone</label>
            <input type="number" class="form-control" placeholder="Email" />
          </div>
        </div>
        <div class="form-group">
          <label for="inputAddress">Address</label>
          <input
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Sign in
        </button>
      </form>
    );
  }
}

export default EditComponent;
