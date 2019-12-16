import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Elementos de diseño
import Nav from "./components/estilos/Navbar";
import Footer from "./components/estilos/Footer";

// Componentes

// Cliente
import FormCliente from "./components/cliente/formCliente";
import ListCliente from "./components/cliente/listCliente";
import EditCliente from "./components/cliente/editCliente";

// Mesas
import Areas from "./components/mesas/areas";
import mesasOcupadas from "./components/mesas/mesasOcupadas";

// Pedido
import Pedido from "./components/pedido/formPedido";
import PedidoList from "./components/pedido/pedidoList";

// Inicio de sesión
import Login from "./components/login";

// ERROR
import Pagina404 from "./components/pagina404";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />

        <div class="container py-4">
          <div class="row">
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/listCliente" component={ListCliente} />
              <Route path="/formCliente" component={FormCliente} />
              <Route path="/edit/:id" component={EditCliente} />
              <Route path="/areas" component={Areas} />
              <Route path="/formPedido/:id" component={Pedido} />
              <Route path="/pedidolist/:id" component={PedidoList} />
              <Route path="/MesasOcupadas" component={mesasOcupadas} />
              <Route path="*" component={Pagina404} />
            </Switch>
          </div>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
