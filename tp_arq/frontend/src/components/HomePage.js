import React, { Component } from "react";
import UserPage from "./UserPage";
import CodigoAdminPage from "./CodigoAdminPage";
import AgregarPDIPage from "./AgregarPDIPage";
import AgregarEstablecimientoPage from "./AgregarEstablecimientoPage";
import AgregarEventoPage from "./AgregarEventoPage";
import RevisionPage from "./RevisionPage";
import { Grid2 as Grid, Button, ButtonGroup, Typography } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
// import Info from "./Info";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Routes>
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