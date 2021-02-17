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
            //send list to props of the parent component 
            this.props.updateList(this.list);

            const sectionList = document.getElementsByClassName('search-control-info-list');
            
            while (sectionList[0].firstChild) {
                sectionList[0].removeChild(sectionList[0].firstChild);
              }
      

            this.list.forEach(token =>{
                var li = document.createElement('li');
                li.className = 'search-control-info-list-item' 
                li.setAttribute('key', token.getId())     
                li.innerHTML= `
                <span>
                    <img src="../../img/face.png"/>
                    <h3>${token.getFeature().properties.name} from Frankfurt</h3>
                </span>
                <span>                
                    <p>${token.getFeature().properties.about}</p>                
                <span>
                `
                sectionList[0].appendChild(li);
            })
            
        }
    }


render() {

    return (
        <ul className="search-control-info-list">                         
        </ul>
    );
    }
}

/**
 *  <li className="search-control-info-list-item">
        debug row| keys: {this.props.keys} |  visible: {this.props.activelist}
    </li>            
 */
