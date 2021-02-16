import React, { Component }  from 'react';
import Parser from '../Services/Parser'


export default class SearchControlList extends Component {
    
    constructor(props) {
        super(props);     
        this.state = {
            keys: "",
            activelist: "closed"
        };

        this.parser = new Parser();
        this.list = []; 
    }

    componentDidUpdate(){
        if(this.state.activelist != this.props.activelist){
            this.showList();
        }
        
        this.search(this.props.keys);
    }

    showList(){
        this.setState({
            activelist: this.props.activelist
          });          
    }

    search(word){
        this.list = this.parser.search(word);     
        if(this.list[0]){
            //send list tp props to the parent component
        this.props.updateList(this.list);
        }
    }


render() {


    var listItems = this.list.map((token) =>
        
    <li key={token.getId()} 
            className="search-control-info-list-item">
                Name: {token.getFeature().properties.name}
                <br/>Username: {token.getFeature().properties.username}
                <br/>Company: {token.getFeature().properties.company}
                
        </li>
    );


    return (
        <ul className="search-control-info-list">             
            <li className="search-control-info-list-item">
                debug row| keys: {this.props.keys} |  visible: {this.props.activelist}
            </li>            
            {listItems}
        </ul>
    );
    }
}
