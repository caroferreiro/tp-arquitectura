// App.js
import React, { Component } from "react";
import UserPage from "./UserPage";

class App extends Component {
  render() {
    return (
      <div style={{ height: '100vh', display: 'flex', overflowY: 'auto', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ margin: 'auto', display: 'flex', textAlign: 'center', align: 'center', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', maxWidth: '90%' }}>
          <UserPage />
        </div>
      </div>
    );
  }
}

export default App;