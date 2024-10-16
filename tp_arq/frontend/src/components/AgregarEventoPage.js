import React, { Component } from "react";
import { Grid2 as Grid, Button, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";


export default class AgregarEventoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        nombre: "",
        ciudad: "",
        direccion: "",
        categoria: "",
        descripcion: "",
        latitud: "",
        longitud: "",
        dia: "",
        mes: "",
        ano: "",
        horaInicio: "",
        minutoInicio: "",
        duracion: "",
      };
    this.handleCategoriaChange = this.handleCategoriaChange.bind(this);
    this.solicitarEstablecimientoButton = this.solicitarEstablecimientoButton.bind(this);
  }

  render() {
    return (
      <Grid container spacing={1} direction="column" justifyContent="center">
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
              Agregar nuevo evento
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
              name="nombre"
              label="Nombre"
              placeholder="Ingresa el nombre del evento"
              value={this.state.nombre}
              variant="outlined"
              onChange={(e) => this.setState({ nombre: e.target.value })}  
            />
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
              name="ciudad"
              label="Ciudad"
              placeholder="Ingresa la ciudad del evento"
              value={this.state.ciudad}
              variant="outlined"
              onChange={(e) => this.setState({ ciudad: e.target.value })} 
            />
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
              name="direccion"
              label="Dirección"
              placeholder="Ingresa la dirección del evento"
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
              placeholder="Ingresa una descripción del evento"
              value={this.state.descripcion}
              variant="outlined"
              onChange={(e) => this.setState({ descripcion: e.target.value })}
            />
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
              name="latitud"
              label="Latitud"
              type="number"
              placeholder="Ingresa la latitud del evento con decimales"
              value={this.state.latitud}
              variant="outlined"
              onChange={(e) => this.setState({ latitud: e.target.value })}
            />
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
              name="longitud"
              label="Longitud"
              type="number"
              placeholder="Ingresa la longitud del evento con decimales"
              value={this.state.longitud}
              variant="outlined"
              onChange={(e) => this.setState({ longitud: e.target.value })}
            />
        </Grid>
        <Grid container spacing={1} justifyContent="center">
            <Grid item xs={4}>
                <TextField
                name="fecha"
                label="Fecha"
                type="date"
                value={`${this.state.ano}-${this.state.mes}-${this.state.dia}`}
                variant="outlined"
                onChange={(e) => {
                    const dateValue = e.target.value;
                    const [year, month, day] = dateValue.split("-");
                    this.setState({ dia: day, mes: month, ano: year });
                }}
                slotProps={{
                    input: {},
                    inputLabel: {
                    shrink: true, // Esto asegura que la etiqueta se mantenga arriba
                    },
                }}
                />
            </Grid>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
              name="horaInicio"
              label="Hora Inicio"
              placeholder="Ingresa la hora de inicio del evento"
              type="number"
              value={this.state.horaInicio}
              variant="outlined"
              onChange={(e) => this.setState({ horaInicio: e.target.value })}
            />
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
              name="minutoInicio"
              label="Minuto Inicio"
              placeholder="Ingresa el minuto de inicio del evento"
              type="number"
              value={this.state.minutoInicio}
              variant="outlined"
              onChange={(e) => this.setState({ minutoInicio: e.target.value })}
            />
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
              name="duracion"
              label="Duración"
              placeholder="Ingresa lla duración del evento"
              type="number"
              value={this.state.duracion}
              variant="outlined"
              onChange={(e) => this.setState({ duracion: e.target.value })}
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