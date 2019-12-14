import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Form from "./module/form";
import FormCliente from "./module/formCliente";
import List from "./module/list";
import ListCliente from "./module/listCliente";
import Edit from "./module/edit";
import EditCliente from "./module/editCliente";
import Areas from "./module/areas";
import Pedido from "./module/formPedido";
import Login from "./module/login";
import PedidoList from "./module/pedidoList";
import mesasOcupadas from "./module/mesasOcupadas";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a
            class="navbar-brand"
            href="https://www.facebook.com/"
            style={{ color: "orange", fontWeight: "bold" }}
          >
            Frites and Grill
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <Link class="nav-link" to="/listCliente">
                  {" "}
                  Lista Clientes{" "}
                </Link>
              </li>
            </ul>
            <Link class="btn btn-info " to="/login">
              Login
            </Link>
          </div>
        </nav> */}

        <div class="container py-4">
          <div class="row">
            <Route path="/" exact component={Areas} />
            <Route path="/listCliente" component={ListCliente} />
            <Route path="/form" component={Form} />
            <Route path="/formCliente" component={FormCliente} />
            <Route path="/edit/:id" component={EditCliente} />
            <Route path="/listM/:id" component={Areas} />
            <Route path="/login" component={Login} />
            <Route path="/formPedido/:id" component={Pedido} />
            <Route path="/pedidolist/:id" component={PedidoList} />
            <Route path="/MesasOcupadas" component={mesasOcupadas} />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
