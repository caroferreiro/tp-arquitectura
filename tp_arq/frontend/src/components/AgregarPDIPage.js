import React, { Component } from "react";
import { Grid2 as Grid, Button, Typography, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";

export default class AgregarPDIPage extends Component {
  constructor(props) {
    super(props);
    }

  renderCreateButtons() {
    return (
      <Grid container spacing={2} direction="column" justifyContent="center">
        <Grid item xs={12} align="center">
        <Typography
          variant="h3"
          compact="h3"
          sx={{ marginBottom: 6, fontWeight: 900 }} 
        >
          ¿Qué deseás añadir?
        </Typography>
        </Grid>  
        <Grid item xs={12} align="center">
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                size="large"
                component={Link}
                to="/agregarEvento"
                sx={{ padding: '16px 32px', fontSize: '1.5rem' }}
              >
                Evento
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                size="large"
                component={Link}
                to="/agregarEstablecimiento"
                sx={{ padding: '16px 32px', fontSize: '1.5rem' }}
              >
                Establecimiento
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} align="center">  
          <Button 
            variant="outlined" 
            color="secondary" 
            component={Link} 
            to="/mapa-usuario"
            sx={{ marginTop: 4 }} 
            >
            Volver al inicio
          </Button>
        </Grid>
      </Grid>
    );
  }

  render() {
    return (
      <div>
        {this.renderCreateButtons()}
      </div>
    ); 
  }
}