import React, { Component } from 'react';
import "./App.css";
import ContactMap from '../ContactMap/Contactmap';
import SearchControl from '../SearchControl/SearchControl'

 
class App extends Component {
  constructor(props) {
    super(props);       
  }

  render() {
    const greeting = 'Welcome to React';
    return (
      <div>
        <SearchControl/>      
        <ContactMap/>
      </div>
    );
  }
}
 
export default App;
