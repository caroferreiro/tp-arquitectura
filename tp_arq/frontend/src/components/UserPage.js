import React, { Component } from "react";
import { Grid2 as Grid, Button, Typography, ButtonGroup } from "@mui/material";
import CodigoAdminPage from "./CodigoAdminPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default class UserPage extends Component {
  constructor(props) {
    super(props);
  }

  renderCreateButtons() {
    return (
      <Grid container spacing={1} justifyContent="center">
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
              onClick={() => {}}
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
          <Route
            path="/"
            element={
              <div>
                {this.renderCreateButtons()}
              </div>
            }
          />
          <Route path="/validar-administrador" element={<CodigoAdminPage />} />
        </Routes>
      </Router> 
    ); 
  }
}
