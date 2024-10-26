// App.js
import React, { Component } from "react";
import UserPage from "./UserPage";

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <div className="center">
          <UserPage />
        </div>
      </div>
    );
  }
}

export default App;