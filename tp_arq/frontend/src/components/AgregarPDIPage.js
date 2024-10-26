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
          className="passion-one-black"
          sx={{ marginBottom: 6, fontWeight: 900 }} 
        >
          Agregar un nuevo...
        </Typography>
        </Grid>  
        <Grid item xs={12} align="center"> 
          <ButtonGroup disableElevation variant="contained" sx={{ gap: 2 }}>
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
          </ButtonGroup>
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