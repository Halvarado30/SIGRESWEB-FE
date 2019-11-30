import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";
import { Link } from "react-router-dom";

// Libreria de Sweetalert2
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const baseUrl = "http://839cb0c8.ngrok.io";

class listComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listCliente: []
    };
  }

  componentDidMount() {
    this.loadCliente();
  }

  loadCliente() {
    const url = baseUrl + "/cliente/list";
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
            <Link class="btn btn-outline-info" to={"/edit/" + data.id}>
              Editar
            </Link>
          </td>
          <td>
            <button
              class="btn btn-outline-danger"
              onClick={() => this.onDelete(data.id)}
            >
              {" "}
              Eliminar{" "}
            </button>
          </td>
        </tr>
      );
    });
  }

  onDelete(id) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás recuperar la información eliminada",
      type: "Alerta",
      showCancelButton: true,
      confirmButtonText: "¡Sí, Eliminar!",
      cancelButtonText: "No, Conservar"
    }).then(result => {
      if (result.value) {
        this.sendDelete(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelado", "La información sigue aquí", "error");
      }
    });
  }

  sendDelete(id) {
    // url de backend
    const url = baseUrl + "/cliente/delete"; // parametro del datapost
    // red
    axios
      .post(url, {
        id: id
      })
      .then(response => {
        if (response.data.success) {
          Swal.fire("¡Eliminado!", "El cliente ha sido eliminado.", "correcto");
          this.loadCliente();
        }
      })
      .catch(error => {
        alert("Error 325 ");
      });
  }
}

export default listComponent;
