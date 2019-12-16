import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import * as globalUrl from "../variable";
// Libreria de Sweetalert2
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
const baseUrl = globalUrl.url;

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

  // Cargar lista de clientes
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
    if (localStorage.getItem("token")) {
      return (
        <div>
          <Link className="btn btn-outline-info" to={"/formCliente"}>
            Agregar Cliente
          </Link>
          <br />
          <br />
          <table className="table table-hover table-striped table-bordered table-responsive">
            <thead className="thead-dark">
              <tr>
                <th scope="col" hidden>
                  Id Cliente
                </th>
                <th scope="col">RTN</th>
                <th scope="col">Nombre</th>
                <th scope="col">Direccion</th>
                <th scope="col">Telefono</th>
                <th scope="col">Correo</th>
                <th colspan="2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
              {/* Llenado de lista de clientes */}
              {this.loadFillData()}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <Redirect to={{ pathname: "/" }} />;
    }
  }

  // Carga de los datos de clientes
  loadFillData() {
    return this.state.listCliente.map(data => {
      return (
        <tr>
          <th hidden>{data.idregistro}</th>
          <td>{data.rtn}</td>
          <td>{data.nombre}</td>
          <td>{data.direccion}</td>
          <td>{data.telefono}</td>
          <td>{data.correo}</td>
          <td>
            <Link
              className="btn btn-outline-info"
              to={"/edit/" + data.idregistro}
            >
              EDITAR
            </Link>
          </td>
          <td>
            <button
              className="btn btn-outline-danger"
              onClick={() => this.onDelete(data.idregistro)}
            >
              {" "}
              ELIMINAR{" "}
            </button>
          </td>
        </tr>
      );
    });
  }

  // Área de confirmación para eliminar un cliente
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

  // Dato del cliente enviado para eliminar
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
