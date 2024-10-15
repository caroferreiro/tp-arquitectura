import React, { Component } from "react";
import { Grid2 as Grid, Button, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import RevisionPage from "./RevisionPage";

export default class AgregarEstablecimientoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        nombre: "",
        ciudad: "",
        direccion: "",
        categoria: "",
        descripcion: "",
        latitud: 0.0,
        longitud: 0.0,
      };
    this.handleCategoriaChange = this.handleCategoriaChange.bind(this);
    this.solicitarEstablecimientoButton = this.solicitarEstablecimientoButton.bind(this);
  }

  render() {
    return (
      <Grid container spacing={1} direction="column" justifyContent="center">
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
              Agregar nuevo establecimiento
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
              name="nombre"
              label="Nombre"
              placeholder="Ingresa el nombre del establecimiento"
              value={this.state.nombre}
              variant="outlined"
              onChange={(e) => this.setState({ nombre: e.target.value })}  
            />
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
              name="ciudad"
              label="Ciudad"
              placeholder="Ingresa la ciudad del establecimiento"
              value={this.state.ciudad}
              variant="outlined"
              onChange={(e) => this.setState({ ciudad: e.target.value })} 
            />
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
              name="direccion"
              label="Dirección"
              placeholder="Ingresa la dirección del establecimiento"
              value={this.state.direccion}
              variant="outlined"
              onChange={(e) => this.setState({ direccion: e.target.value })}
            />
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl fullWidth variant="outlined">
            <InputLabel id="categoria-label">Categoría</InputLabel>
            <Select
              labelId="categoria-label"
              value={this.state.categoria}
              onChange={this.handleCategoriaChange}
              label="Categoría"
            >
              <MenuItem value="G">Gastronomía</MenuItem>
              <MenuItem value="E">Entretenimiento</MenuItem>
              <MenuItem value="AL">Aire libre</MenuItem>
              <MenuItem value="M">Música</MenuItem>
              <MenuItem value="C">Cine</MenuItem>
              <MenuItem value="A">Artesanías</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
              name="descripcion"
              label="Descripcion"
              placeholder="Ingresa una descripción del establecimiento"
              value={this.state.descripcion}
              variant="outlined"
              onChange={(e) => this.setState({ descripcion: e.target.value })}
            />
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
              name="latitud"
              label="Latitud"
              placeholder="Ingresa la latitud del establecimiento con decimales"
              value={this.state.latitud}
              variant="outlined"
              onChange={(e) => this.setState({ latitud: e.target.value })}
            />
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
              name="longitud"
              label="Longitud"
              placeholder="Ingresa la longitud del establecimiento con decimales"
              value={this.state.longitud}
              variant="outlined"
              onChange={(e) => this.setState({ longitud: e.target.value })}
            />
        </Grid>
        <Grid item spacing={1} xs={12} align="center">
          <Button variant="contained" color="primary" onClick={this.solicitarEstablecimientoButton}>
            Solicitar nuevo establecimiento
          </Button>
        </Grid>  
        <Grid item xs={12} align="center">  
          <Button variant="contained" color="secondary" to="/" component={Link}>
            Atrás
          </Button>
        </Grid>
      </Grid>
    );
  }

  handleCategoriaChange = (event) => {
    this.setState({ categoria: event.target.value });
  };

  solicitarEstablecimientoButton() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: this.state.nombre,
        ciudad: this.state.ciudad,
        direccion: this.state.direccion,
        categoria: this.state.categoria,
        descripcion: this.state.descripcion,
        latitud: this.state.latitud,
        longitud: this.state.longitud,
      }),
    };
    console.log("Datos a enviar:", requestOptions); // Imprime los datos

    fetch("/api/agregar-establecimiento", requestOptions)
      .then((response) => {
        if (response.ok) {
          console.log("Establecimiento agregado correctamente");
        } else {
          // Muestra el código de error y el mensaje
          console.log(`Error: ${response.status} - ${response.statusText}`);
          return response.json().then((data) => {
          console.log("Detalles del error:", data);
          });
        }
      })
      .catch((error) => {
        console.log("Error de red o de servidor:", error);
      });
  }  
}