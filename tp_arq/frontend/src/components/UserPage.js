import React, { Component } from "react";
import { Grid2 as Grid, Button, Typography, ButtonGroup } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MapViewUser from "./MapViewUser"; 
import MapViewAdmin from "./MapViewAdmin"; 
import CodigoAdminPage from "./CodigoAdminPage";
import AgregarPDIPage from "./AgregarPDIPage";
import AgregarEstablecimientoPage from "./AgregarEstablecimientoPage";
import AgregarEventoPage from "./AgregarEventoPage";
import RevisionPage from "./RevisionPage";
import EvaluarPDIsPage from "./EvaluarPDIsPage";
import InfoPDI from "./InfoPDI";
import backgroundImage from './images/fondo.jpg';

export default class UserPage extends Component {
  constructor(props) {
    super(props);
  }

  renderCreateButtons() {
    return (
      <Grid container spacing={15} direction="column" justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Typography
            variant="h1" 
            className="passion-one-black" 
            align="center"
            sx={{ fontWeight: 900, fontSize: '8rem' }}
          >
            #DescubríNQN
          </Typography>
        </Grid> 
        <Grid item xs={12}> 
          <ButtonGroup disableElevation variant="contained" orientation="vertical" sx={{ gap: 1 }}>
            <Button
              color="primary"
              variant="contained"
              size="large"
              component={Link}
              to="/mapa-usuario"
            >
              Soy usuario
            </Button>
            <Button
              color="secondary"
              variant="contained"
              size="large"
              component={Link}
              to="/validar-administrador"
            >
              Soy administrador
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
          <Route
            path="/"
            element={
              <div
                style={{
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "100vh",
                  width: "100vw",
                  position: "relative",
                  color: "white", 
                  display: "flex", 
                  justifyContent: "center", 
                  alignItems: "center", 
                }}
              >
                {/* Capa semi-transparente */}
                <div
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)", 
                    height: "100%",
                    width: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                  }}
                />
                
                {/* Contenido principal */}
                <div style={{ position: "relative", zIndex: 2, textAlign: 'center' }}>
                  {this.renderCreateButtons()}
                </div>
              </div>
            }
          />
          <Route path="/mapa-usuario" element={<MapViewUser />} />
          <Route path="/mapa-admin" element={<MapViewAdmin />} />
          <Route path="/validar-administrador" element={<CodigoAdminPage />} />
          <Route path="/agregarPDI" element={<AgregarPDIPage />} />
          <Route path="/agregarEvento" element={<AgregarEventoPage />} />
          <Route path="/agregarEstablecimiento" element={<AgregarEstablecimientoPage />} />
          <Route path="/revision" element={<RevisionPage />} />
          <Route path="/listar-pendientes" element={<EvaluarPDIsPage />} />
          <Route path="/pdi/:id" element={<InfoPDI />} />
        </Routes>
      </Router>
    ); 
  }
}

