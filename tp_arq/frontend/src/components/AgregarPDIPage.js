import React, { Component } from "react";
import { Grid2 as Grid, Button, Typography, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";

export default class AgregarPDIPage extends Component {
  constructor(props) {
    super(props);
    };

  renderCreateButtons() {
    return (
      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={12} align="center">
          <Typography variant="h2" compact="h2">
            Agregar un nuevo...
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
              Evento
            </Button>
            <Button
              color="secondary"
              variant="contained"
              size="large"
              onClick={() => {}}
            >
              Establecimiento
            </Button>
          </ButtonGroup>
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