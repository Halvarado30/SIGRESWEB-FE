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
      campNombre: "",
      listProductoS: [],
      valor: this.props.match.params.id
    };
  }

  componentDidMount() {
    this.loadProductoS();
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
        <div class="form-group col-md-10">
          <label for="mesa">MESA: {userId}</label>
          {/* sección para el nombre del cliente */}
          <div>
            <label for="inputPassword4">Nombre cliente</label>
            <input
              type="text"
              class="form-control"
              placeholder="Nombre del Cliente"
              value={this.state.campNombre}
              onChange={value =>
                this.setState({ campNombre: value.target.value })
              }
              required
            />
          </div>
        </div>
        <div>
          <table class="table table-hover table-striped table-bordered table-responsive">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Mesa</th>
                <th scope="col">Nombre producto</th>
                <th scope="col">Precio</th>
                <th scope="col">Cantidad</th>
              </tr>
            </thead>
            <tbody>{this.loadFillData(userId)}</tbody>
          </table>
          <Link class="btn btn-outline-info" to={"/formPedido/" + userId}>
            REGRESAR
          </Link>

          <Link
            class="btn btn-outline-info"
            onClick={() => this.sendSave(userId)}
            to={"/"}
          >
            Realizar comanda
          </Link>
        </div>
      </div>
    );
  }

  loadFillData(id) {
    console.log("ESTA ES LA MESA: " + id);
    const valorfiltrado = this.state.listProductoS.filter(inf => {
      return inf.Mesa == id;
    });
    return valorfiltrado.map(data => {
      return (
        <tr>
          <td>{data.Mesa}</td>
          <td>{data.NombreProducto}</td>
          <td>{data.PrecioProducto}</td>
          <td>{data.CantidadProducto}</td>
        </tr>
      );
    });
  }

  sendSave(a) {
    alert("ESTE ES EL CLIENTE: " + this.state.campNombre);
    const Url = baseUrl + "/pedidomesas/crear";
    const datapost = {
      idmesa: a,
      nombrecuenta: this.state.campNombre
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
