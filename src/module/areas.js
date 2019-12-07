import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Link } from "react-router-dom";
import * as globalUrl from "./variable";
import axios from "axios";
const baseUrl = globalUrl.url;

class EditComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listArea: [],
      listMesa: [],
      id: 1
    };
    this.cambioId = this.cambioId.bind(this);
  }

  componentWillMount() {
    this.loadArea();
    this.loadMesa();
  }

  // Cargar lista de áreas
  loadArea() {
    const url = baseUrl + "/area/list";
    axios
      .get(url)
      .then(res => {
        const data = res.data;
        this.setState({ listArea: data });
      })
      .catch(error => {
        alert(error);
      });
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
        {/* Sección para las áreas */}
        <div class="form-group col-md-6">
          <label for="inputState">Areas: </label>

          <select
            value={this.state.value}
            id="inputState"
            class="form-control"
            onChange={this.cambioId}
          >
            <option value="" disabled selected>
              {" "}
              Seleccione un área
            </option>
            {/* Llenado de las áreas */}
            {this.loadFillData()}
          </select>
          {/* <h1>Id seleccionado: {this.state.id}</h1> */}
        </div>

        <div>
          <table class="table table-hover table-striped">
            <thead class="thead-dark">
              <tr>
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

  cambioId(e) {
    console.log(e);
    this.setState({
      id: e.target.value
    });
  }

  // Carga de datos de area para mostrar
  loadFillData() {
    return this.state.listArea.map(data => {
      return <option value={data.CodigoArea}>{data.Area}</option>;
    });
  }

  // Carga de datos de mesa para mostrar
  loadFillData2(id) {
    const valorfiltrado = this.state.listMesa.filter(inf => {
      return inf.codigoArea == id;
    });
    return valorfiltrado.map(data => {
      // alert("DATO DE AREA: " + data.codigoArea);
      return (
        <tr>
          <th>{data.codigoArea}</th>
          <td>{data.idregistro}</td>
          <td>{data.mesa}</td>
          <td>{data.estado}</td>
          <td>
            <Link
              class="btn btn-outline-info"
              to={"/formPedido/" + data.idregistro}
            >
              Pedido
            </Link>
          </td>
        </tr>
      );
    });
  }
}

export default EditComponent;
