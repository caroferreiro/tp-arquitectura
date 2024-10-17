import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserPage from "./UserPage";
import CodigoAdminPage from "./CodigoAdminPage";
import AgregarPDIPage from "./AgregarPDIPage";
import AgregarEstablecimientoPage from "./AgregarEstablecimientoPage";
import AgregarEventoPage from "./AgregarEventoPage";
import RevisionPage from "./RevisionPage";


export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ingresar" element={<UserPage />} />
          <Route path="/validar-administrador" element={<CodigoAdminPage />} />
          <Route path="/agregarPDI" element={<AgregarPDIPage />} />
          <Route path="/agregarEvento" element={<AgregarEventoPage />} />
          <Route path="/agregarEstablecimiento" element={<AgregarEstablecimientoPage />} />
          <Route path="/revision" element={<RevisionPage />} />
        </Routes>
      </Router>
    );
  }
}