import React, { Component } from "react";
import { Grid2 as Grid, Button, Typography, ButtonGroup } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link  } from "react-router-dom";
import MapViewUser from "./MapViewUser"; 
import MapViewAdmin from "./MapViewAdmin"; 
import CodigoAdminPage from "./CodigoAdminPage";
import AgregarPDIPage from "./AgregarPDIPage";
import AgregarEstablecimientoPage from "./AgregarEstablecimientoPage";
import AgregarEventoPage from "./AgregarEventoPage";
import RevisionPage from "./RevisionPage";
import EvaluarPDIsPage from "./EvaluarPDIsPage";


export default class UserPage extends Component {
  constructor(props) {
    super(props);
  }

  renderCreateButtons() {
    return (
      <Grid container spacing={2} direction="column" justifyContent="center">
        <Grid item xs={12} align="center">
          <Typography variant="h2" compact="h2">
            Ingresar como...
          </Typography>
        </Grid>  
        <Grid item xs={12} align="center"> 
          <ButtonGroup disableElevation variant="contained" sx={{ gap: 2 }}>
            <Button
              color="primary"
              variant="contained"
              size="large"
              component={Link}
              to="/mapa-usuario"
            >
              Usuario
            </Button>
            <Button
              color="secondary"
              variant="contained"
              size="large"
              component={Link}
              to="/validar-administrador"
            >
              Administrador
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={this.renderCreateButtons()} />
          <Route path="/mapa-usuario" element={<MapViewUser />} />
          <Route path="/mapa-admin" element={<MapViewAdmin />} />
          <Route path="/validar-administrador" element={<CodigoAdminPage />} />
          <Route path="/agregarPDI" element={<AgregarPDIPage />} />
          <Route path="/agregarEvento" element={<AgregarEventoPage />} />
          <Route path="/agregarEstablecimiento" element={<AgregarEstablecimientoPage />} />
          <Route path="/revision" element={<RevisionPage />} />
          <Route path="/listar-pendientes" element={<EvaluarPDIsPage />} />
        </Routes>
      </Router>
    ); 
  }
}
