import React, { Component } from "react";
import { Grid2 as Grid, Button, Typography, TextField } from "@mui/material";
import { Link } from "react-router-dom";

export default class CodigoAdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      error: "",
      esAdmin: false,
    };
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.roomButtonPressed = this.roomButtonPressed.bind(this);
  }

  renderCreateButtons() {
    return (
      <Grid container spacing={2} direction="column" justifyContent="center">
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3">
            Ingresa el código para validarte como administrador
          </Typography>
        </Grid>  
        <Grid item xs={12} align="center"> 
          <TextField
            error={this.state.error}
            label="Código"
            placeholder="Ingresá el código"
            value={this.state.code}
            helperText={this.state.error}
            variant="outlined"
            onChange={this.handleTextFieldChange} 
          />
        </Grid>
        <Grid item spacing={1} xs={12} align="center">
          <Button variant="contained" color="primary" onClick={this.roomButtonPressed}>
            Ingresar
          </Button>
        </Grid>  
        <Grid item xs={12} align="center">  
          <Button variant="contained" color="secondary" component={Link} to="/">
            Atrás
          </Button>
        </Grid>
      </Grid>
    );
  }

  handleTextFieldChange(e) {
    this.setState({
      code: e.target.value,
    });
  }

  roomButtonPressed() {
    const { code } = this.state;

    if (code === "ABCD") {
      this.props.history.push("/agregarPDI");
      this.esAdmin = True
    } else {
      this.setState({ error: "Código inválido" });
    }
  }

  render() {
    return (
      <div>
        {this.renderCreateButtons()}
      </div>
    );
  }
}