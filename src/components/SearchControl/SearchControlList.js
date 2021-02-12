import L from 'leaflet';
import React, { Component }  from 'react';
import { MapContainer,  useMap} from 'react-leaflet';


export default class SearchControlList extends Component {
    
    constructor(props) {
        super(props);     
        this.state = {
            //date: new Date(),
            keys: "",
            activelist: "closed"
        };   
    }

    
    
    componentDidUpdate(){
        if(this.state.activelist != this.props.activelist){
            this.showList();
        }
    }

    showList(){
        this.setState({
            activelist: this.props.activelist
          });
    }

render() {
    return (
        <ul className="search-control-info-list">             
            <li className="search-control-info-list-item">keys: {this.props.keys} visible: {this.props.activelist}</li>          
            <li className="search-control-info-list-item">keys: {this.props.keys} visible: {this.props.activelist}</li>          
            <li className="search-control-info-list-item">keys: {this.props.keys} visible: {this.props.activelist}</li>          
            <li className="search-control-info-list-item">keys: {this.props.keys} visible: {this.props.activelist}</li>          
        </ul>
    );
    }
}
