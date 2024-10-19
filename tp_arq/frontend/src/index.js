import App from "./components/App";
import React from "react";
import { createRoot } from "react-dom/client"; // Importar createRoot desde react-dom/client

const rootElement = document.getElementById("app");
const root = createRoot(rootElement); // Crear el root
root.render(<App />); // Renderizar la aplicación