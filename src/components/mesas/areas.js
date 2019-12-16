import React from "react";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Link, Redirect } from "react-router-dom";
import * as globalUrl from "../variable";
import { MDBIcon } from "mdbreact";
import axios from "axios";
import jwt_decode from "jwt-decode";

const baseUrl = globalUrl.url;

class AreaComponent extends React.Component {
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
    if (localStorage.getItem("token")) {
      return (
        <div className="mx-auto">
          {/* Sección para las áreas */}
          <div className="form-group float-left col-lg-4">
            <MDBIcon icon="globe" />
            &nbsp;
            <label for="inputState">Areas: </label>
            <select
              value={this.state.value}
              id="inputState"
              className="form-control"
              onChange={this.cambioId}
            >
              <option value="" disabled selected>
                {" "}
                Seleccione un área
              </option>
              {/* Llenado de las áreas */}
              {this.loadFillData()}
            </select>
            <Link className="btn btn-outline-info" to={"/MesasOcupadas"}>
              <MDBIcon icon="stroopwafel" size="1x" />
              &nbsp; mesas ocupadas
            </Link>
          </div>

          {/* <div className="form-group col-md-6">
            
          </div> */}
          <div className="float-right">
            <table className="table table-hover table-striped table-responsive">
              <thead className="thead-dark">
                <tr>
                  <th scope="col" hidden>
                    Area
                  </th>
                  <th scope="col">Número</th>
                  <th scope="col">Nombre de la mesa</th>
                  <th scope="col" hidden>
                    estado
                  </th>
                  <th colspan="2">Acción a realizar</th>
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
    } else {
      return <Redirect to={{ pathname: "/" }} />;
    }
  }

  cambioId(e) {
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
      return inf.codigoArea == id && inf.estado == "L";
    });
    return valorfiltrado.map(data => {
      return (
        <tr>
          <th hidden>{data.codigoArea}</th>
          <td>{data.idregistro}</td>
          <td>{data.mesa}</td>
          <td hidden>{data.estado}</td>
          <td>
            <Link
              class="btn btn-outline-info"
              to={"/formPedido/" + data.idregistro}
              onClick={() => this.sendSave()}
            >
              <MDBIcon icon="clipboard-list" size="2x" />
              &nbsp; Pedido
            </Link>
          </td>
        </tr>
      );
    });
  }

  sendSave() {
    if (localStorage.getItem("token")) {
      const variable = localStorage.token;
      const decoded = jwt_decode(variable);
      const Url = baseUrl + "/pedidomesa/crear";
      console.log("USUARIO: " + decoded.idregistro);
      const datapost = {
        idMesero: decoded.idregistro
      };

      axios
        .post(Url, datapost)
        .then(response => {})
        .catch(error => {
          alert("Error 34 " + error);
        });
    }
  }
}

export default AreaComponent;
