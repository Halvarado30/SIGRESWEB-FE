import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Link, Redirect } from "react-router-dom";
import * as globalUrl from "../variable";
import axios from "axios";
const baseUrl = globalUrl.url;

class MesaComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listMesa: []
    };
  }

  componentWillMount() {
    this.loadMesa();
  }

  // Cargar lista de mesas
  loadMesa() {
    const url = baseUrl + "/mesas/list";
    axios
      .get(url)
      .then(res => {
        const data = res.data;
        this.setState({ listMesa: data });
      })
      .catch(error => {
        alert(error);
      });
  }

  render() {
    if (localStorage.getItem("token")) {
      return (
        <div className="mx-auto">
          <div className="form-group float-left">
            <table className="table table-hover table-striped">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Area</th>
                  <th scope="col">idMesa</th>
                  <th scope="col">Nombre Mesa</th>
                  <th scope="col">estado</th>
                  <th colspan="2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {/* Llenado de las mesas */}
                {this.loadFillData2(this.state.id)}
              </tbody>
            </table>
          </div>
          <div className="form-group col-md-6 float-right">
            <Link className="btn btn-outline-info" to={"/areas"}>
              REGRESAR
            </Link>
          </div>
        </div>
      );
    } else {
      return <Redirect to={{ pathname: "/" }} />;
    }
  }

  // Carga de datos de mesa para mostrar
  loadFillData2(id) {
    const valorfiltrado = this.state.listMesa.filter(inf => {
      return inf.estado == "O";
    });
    return valorfiltrado.map(data => {
      return (
        <tr>
          <th>{data.codigoArea}</th>
          <td>{data.idregistro}</td>
          <td>{data.mesa}</td>
          <td>{data.estado}</td>
          <td>
            <Link
              className="btn btn-outline-info"
              to={"/formPedido/" + data.idregistro}
            >
              PEDIDO
            </Link>
          </td>
          <td>
            <Link
              className="btn btn-outline-danger"
              to={"/areas"}
              onClick={() => this.sendUpdate(data.idregistro)}
            >
              LIBERAR
            </Link>
          </td>
        </tr>
      );
    });
  }

  sendUpdate(id) {
    const Url = baseUrl + "/mesas/update/" + id;
    const datapost = {
      estado: "L"
    };

    axios
      .post(Url, datapost)
      .then(response => {
        if (response.data.success === true) {
          this.sendDelete(id);
        } else {
          alert(response.data.message);
        }
      })
      .catch(error => {
        alert("Error 34 " + error);
      });
  }

  sendDelete(Mesa) {
    const Url = baseUrl + "/pedido/delete/" + Mesa;

    axios
      .post(Url, {
        Mesa: Mesa
      })
      .then(response => {})
      .catch(error => {
        alert("Error 34 " + error);
      });
  }
}

export default MesaComponent;
