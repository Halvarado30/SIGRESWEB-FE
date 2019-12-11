import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Link } from "react-router-dom";
import * as globalUrl from "./variable";
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
    return (
      <div>
        <div>
          <table class="table table-hover table-striped">
            <thead class="thead-dark">
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
      </div>
    );
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
              class="btn btn-outline-info"
              to={"/"}
              onClick={() => this.sendUpdate(data.idregistro)}
            >
              Liberar
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

    console.log(datapost);
    alert("tu codigo cambio");

    axios
      .post(Url, datapost)
      .then(response => {
        if (response.data.success === true) {
          alert(response.data.message);
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
    alert("se borraron los datos");

    axios
      .post(Url, {
        Mesa: Mesa
      })
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

export default MesaComponent;
