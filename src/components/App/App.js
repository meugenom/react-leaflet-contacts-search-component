import React, { Component } from 'react';
import "./App.css";
import ContactMap from '../ContactMap/Contactmap';
// import SearchControl from '../SearchControl/SearchControl'

 
class App extends Component {
  constructor(props) {
    super(props);       
  }

  render() {
    return (
      <div>
        <ContactMap/>
      </div>
    );
  }
}
 
export default App;
