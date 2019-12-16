import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";
import "../estilos/estilo.css";
import * as globalUrl from "../variable";
import { Link, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
const baseUrl = globalUrl.url;
var Moment = require("moment");
var fecha = Moment().format("YYYY-MM-DD HH:mm:ss");
var total = 0;
var mult = 0;

class PreFactura extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listComanda: [],
      valor: this.props.match.params.id
    };
  }

  componentWillMount() {
    this.loadComada();
  }

  loadComada() {
    const url = baseUrl + "/pedido/list";
    axios
      .get(url)
      .then(res => {
        const data = res.data;
        this.setState({ listComanda: data });
      })
      .catch(error => {});
  }

  render() {
    let mesaId = this.props.match.params.id;
    if (localStorage.getItem("token")) {
      // alert("MESA: " + mesaId);
      const variable = localStorage.token;
      const decoded = jwt_decode(variable);
      return (
        <div className="py-5 mx-auto">
          <div className="formFactura">
            <img
              className="prefactura"
              src="../img/logoFrites_Grill.png"
              alt="logo"
            ></img>
            <br />
            <br />
            <h5>Pre-Factura</h5>
            <h3>TOTAL: {total}</h3>
          </div>
          <label>Fue atendido por: {decoded.nombreEmpleado}</label>
          <br />
          <label>Fecha y hora: {fecha}</label>

          <div>
            <table className="table table-hover table-striped table-bordered table-responsive">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Mesa</th>
                  <th scope="col">Nombre producto</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Subtotal</th>
                </tr>
              </thead>
              <tbody>{this.loadFillData(mesaId)}</tbody>
            </table>
            <Link
              className="btn btn-outline-info"
              onClick={() => this.valoresInit()}
              to={"/pedidoList/" + mesaId}
            >
              REGRESAR
            </Link>
          </div>
        </div>
      );
    } else {
      return <Redirect to={{ pathname: "/" }} />;
    }
  }

  loadFillData(id) {
    const valorfiltrado = this.state.listComanda.filter(inf => {
      return inf.Mesa == id;
    });
    return valorfiltrado.map(data => {
      mult = data.CantidadProducto * data.PrecioProducto;
      total += mult;
      return (
        <tr>
          <td>{data.Mesa}</td>
          <td>{data.NombreProducto}</td>
          <td>{data.CantidadProducto}</td>
          <td>{data.PrecioProducto}</td>
          <td>{data.CantidadProducto * data.PrecioProducto}</td>
        </tr>
      );
    });
  }

  valoresInit() {
    total = 0;
    mult = 0;
  }
}

export default PreFactura;
