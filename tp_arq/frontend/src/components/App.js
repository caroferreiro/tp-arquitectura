import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import AgregarPDIPage from "./AgregarPDIPage";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="center">
        <AgregarPDIPage />
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);