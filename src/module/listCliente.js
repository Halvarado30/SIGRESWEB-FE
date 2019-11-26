import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";

class listComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listCliente: []
    };
  }

  componentDidMount() {
    const url = "http://5b817f7a.ngrok.io/cliente/list";
    axios
      .get(url)
      .then(res => {
        const data = res.data;
        this.setState({ listCliente: data });
      })
      .catch(error => {
        alert(error);
      });
  }

  render() {
    return (
      <table class="table table-hover table-striped">
        <thead class="thead-dark">
          <tr>
            <th scope="col">idregistro</th>
            <th scope="col">rtn</th>
            <th scope="col">Nombre</th>
            <th scope="col">Direccion</th>
            <th scope="col">Telefono</th>
            <th scope="col">Correo</th>
            <th colspan="2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr></tr>
          {this.loadFillData()}
        </tbody>
      </table>
    );
  }

  loadFillData() {
    return this.state.listCliente.map(data => {
      return (
        <tr>
          <th>{data.id}</th>
          <td>{data.rtn}</td>
          <td>{data.nombre}</td>
          <td>{data.direccion}</td>
          <td>{data.telefono}</td>
          <td>{data.correo}</td>
          <td>
            <button class="btn btn-outline-info "> Edit </button>
          </td>
          <td>
            <button class="btn btn-outline-danger "> Delete </button>
          </td>
        </tr>
      );
    });
  }
}

export default listComponent;
