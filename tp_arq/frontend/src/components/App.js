import React, { Component } from "react";
import { render } from "react-dom";
import UserPage from "./UserPage";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="center">
        <UserPage />
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);