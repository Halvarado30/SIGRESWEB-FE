import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Link } from "react-router-dom";
import { Button, ButtonGroup, ButtonToolbar } from "reactstrap";
import * as globalUrl from "./variable";
import axios from "axios";
const baseUrl = globalUrl.url;

class EditComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listTipoP: [],
      listProducto: [],
      valor: this.props.match.params.id
    };
    this.cambioId = this.cambioId.bind(this);
  }

  componentDidMount() {
    let areaId = this.state.valor;
    alert("DATO:" + areaId);
    this.loadTipoP();
    this.loadProducto();
  }

  // Cargar lista de tipos de productos
  loadTipoP() {
    const url = baseUrl + "/tproductos/list";
    axios
      .get(url)
      .then(res => {
        const data = res.data;
        this.setState({ listTipoP: data });
      })
      .catch(error => {
        alert(error);
      });
  }

  // Cargar lista de productos
  loadProducto() {
    const url = baseUrl + "/producto/list";
    axios
      .get(url)
      .then(res => {
        const data = res.data;
        this.setState({ listProducto: data });
      })
      .catch(error => {
        alert(error);
      });
  }

  render() {
    let userId = this.props.match.params.id;
    return (
      <div>
        {/* Sección para los tipos */}
        <div class="form-group col-md-6">
          <label for="mesa">MESA: {userId}</label>
        </div>

        <div class="form-group col-md-4 float-left">{this.loadFillData()}</div>

        <div className="float-right col-md-8">
          <table class="table table-hover table-striped table-bordered table-responsive">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Categoria</th>
                <th scope="col">Nombre</th>
                <th scope="col">Precio</th>
                <th scope="col">Pedido</th>
              </tr>
            </thead>
            <tbody>
              {/* Llenado de los productos por tipo */}
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

  // Carga de datos de tipos para mostrar
  loadFillData() {
    return this.state.listTipoP.map(data => {
      return (
        <tr>
          <th scope="col">
            <button
              className="btn btn-outline-info col-md-12"
              value={data.CodigoTipo}
              onClick={this.cambioId}
            >
              {data.NombreTipo}
            </button>
          </th>
        </tr>
      );
    });
  }

  // Carga de datos de productos para mostrar
  loadFillData2(id) {
    const valorfiltrado = this.state.listProducto.filter(inf => {
      return inf.TipoProducto == id;
    });
    return valorfiltrado.map(data => {
      return (
        <tr>
          <td>{data.TipoProducto}</td>
          <td>{data.Nombre}</td>
          <td>{data.Precio}</td>
          <td>
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                id={data.Codigo}
              />
              <label class="custom-control-label" for={data.Codigo}>
                 
              </label>
            </div>
          </td>
        </tr>
      );
    });
  }
}

export default EditComponent;
