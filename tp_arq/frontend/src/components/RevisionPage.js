import React, { Component } from "react";
import { Grid2 as Grid, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default class CodigoAdminPage extends Component {
  constructor(props) {
    super(props);
  }

  renderCreateButtons() {
    return (
      <Grid container spacing={2} direction="column" justifyContent="center">
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3">
            Tu punto de interés está siendo revisado
          </Typography>
        </Grid>  
        <Grid item xs={12} align="center">  
          <Button variant="outlined" color="secondary" component={Link} to="/mapa-usuario">
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