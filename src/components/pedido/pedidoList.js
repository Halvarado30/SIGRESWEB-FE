import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Link, Redirect } from "react-router-dom";
import * as globalUrl from "../variable";
import axios from "axios";
const baseUrl = globalUrl.url;

class ListaPedido extends React.Component {
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
      .catch(error => {});
  }

  render() {
    if (localStorage.getItem("token")) {
      let userId = this.props.match.params.id;
      return (
        <div className="py-5 mx-auto">
          <div className="form-group col-md-10">
            <label for="mesa">MESA: {userId}</label>
            {/* sección para el nombre del cliente */}
            <div>
              <label for="inputPassword4">Nombre cliente</label>
              <input
                type="text"
                className="form-control"
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
            <table className="table table-hover table-striped table-bordered table-responsive">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Mesa</th>
                  <th scope="col">Nombre producto</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Precio</th>
                </tr>
              </thead>
              <tbody>{this.loadFillData(userId)}</tbody>
            </table>
            <Link className="btn btn-outline-info" to={"/formPedido/" + userId}>
              REGRESAR
            </Link>
            <Link className="btn btn-outline-info" to={"/prefactura/" + userId}>
              VER PREFACTURA
            </Link>

            <Link
              className="btn btn-outline-info"
              onClick={() => this.sendSave(userId)}
              to={"/areas"}
            >
              ENVIAR COMANDA
            </Link>
          </div>
        </div>
      );
    } else {
      return <Redirect to={{ pathname: "/" }} />;
    }
  }

  loadFillData(id) {
    const valorfiltrado = this.state.listProductoS.filter(inf => {
      return inf.Mesa == id;
    });
    return valorfiltrado.map(data => {
      return (
        <tr>
          <td>{data.Mesa}</td>
          <td>{data.NombreProducto}</td>
          <td>{data.CantidadProducto}</td>
          <td>{data.PrecioProducto}</td>
        </tr>
      );
    });
  }

  sendSave(a) {
    const Url = baseUrl + "/pedidomesas/crear";
    const datapost = {
      idmesa: a,
      nombrecuenta: this.state.campNombre
    };

    axios
      .post(Url, datapost)
      .then(response => {})
      .catch(error => {
        console.log("Error 34 " + error);
      });
  }
}

export default ListaPedido;
