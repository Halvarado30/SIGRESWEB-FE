import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Link } from "react-router-dom";
import { Button, ButtonGroup, ButtonToolbar } from "reactstrap";
import * as globalUrl from "./variable";
import axios from "axios";
const baseUrl = globalUrl.url;
// var valorcito = 0;

class EditComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campId: "",
      campNombre: "",
      campPrecio: "",
      campCantidad: "",
      listTipoP: [],
      listProducto: [],
      listProductoS: [],
      valor: this.props.match.params.id,
      cambiar: 2
    };
    this.cambioId = this.cambioId.bind(this);
  }

  componentDidMount() {
    let areaId = this.state.valor;
    this.loadTipoP();
    this.loadProducto();
    this.loadProductoS();
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

  loadProductoS() {
    const url = baseUrl + "/pedido/list";
    axios
      .get(url)
      .then(res => {
        const data = res.data;
        this.setState({ listProductoS: data });
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
        <div class="form-group">
          <label for="mesa" hidden>
            MESA: {userId}
          </label>
          <Link
            className="btn btn-outline-warning col-md-3"
            to={"/pedidolist/" + userId}
            onClick={() => this.sendUpdate(userId)}
          >
            VER PEDIDO
          </Link>
        </div>

        <div class="form-group col-md-4 float-left">{this.loadFillData()}</div>

        <div className="float-right col-md-8">
          <table class="table table-hover table-striped table-bordered table-responsive">
            <thead class="thead-dark">
              <tr>
                <th scope="col" hidden>
                  Categoria
                </th>
                <th scope="col">Nombre</th>
                <th scope="col">Precio</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Acción</th>
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

  loadFillData2(id) {
    const valorfiltrado = this.state.listProducto.filter(inf => {
      return inf.TipoProducto == id;
    });
    return valorfiltrado.map(data => {
      var valorcito = data.Codigo + data.TipoProducto;
      return (
        <tr>
          <td hidden>
            <label
              type="text"
              value={data.Codigo}
              onChange={value => this.setState({ campId: value.target.value })}
            >
              {data.Codigo}
            </label>
          </td>

          <td>
            <label
              type="text"
              value={data.Nombre}
              onChange={value =>
                this.setState({ campNombre: value.target.value })
              }
            >
              {data.Nombre}
            </label>
          </td>
          <td>
            <label
              type="text"
              value={data.Precio}
              onChange={value =>
                this.setState({ campPrecio: value.target.value })
              }
            >
              {data.Precio}
            </label>
          </td>
          <td>
            <input class="col-md-10" id={valorcito} type="number" />
          </td>
          <td>
            <button
              type="submit"
              class="btn btn-primary"
              onClick={() =>
                this.sendSave(data.Codigo, data.Nombre, data.Precio, valorcito)
              }
            >
              Guardar
            </button>
          </td>
        </tr>
      );
    });
  }

  sendSave(a, b, c, d) {
    var valorinput = document.getElementById(d).value;
    var otrovalor = parseInt(valorinput);
    let userId = this.props.match.params.id;
    const Url = baseUrl + "/pedido/crear";
    const datapost = {
      IdProducto: a,
      NombreProducto: b,
      PrecioProducto: c,
      CantidadProducto: otrovalor,
      Mesa: userId
    };

    console.log(datapost);

    axios
      .post(Url, datapost)
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

  sendUpdate(id) {
    const Url = baseUrl + "/mesas/update/" + id;
    const datapost = {
      estado: "O"
    };

    console.log(datapost);

    axios
      .post(Url, datapost)
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

export default EditComponent;
