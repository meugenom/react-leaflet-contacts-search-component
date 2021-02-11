import React, { Component } from 'react';
import "./App.css";
import "../ContactMap/Contactmap"
import ContactMap from '../ContactMap/Contactmap';

 
class App extends Component {
  render() {
    const greeting = 'Welcome to React';
    return (
      <ContactMap/>
    );
  }
}
 
export default App;
