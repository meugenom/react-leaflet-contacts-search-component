import React, { Component }  from 'react';
import Parser from '../Services/Parser'

var parser = new Parser();
var searchedList = []

export default class SearchControlList extends Component {
    
    
    constructor(props) {
        super(props);     
        this.state = {
            keys: "",
            activelist: "closed"
        };
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

    clickListItem(e){        
        
        const li = document.querySelectorAll('li[choosed]');
        if(li[0]){            
            var key = li[0].getAttribute('key');
            var l = parser.getAnyTokenByID(key);                                                                        
        }
        
        console.log('was clicked')
        
    }

    search(word){        
        searchedList = parser.search(word);
        
        if(searchedList[0]){
            
            //send list to props of the parent component 
            this.props.updateList(searchedList);

            const sectionList = document.getElementsByClassName('search-control-info-list');
            
            while (sectionList[0].firstChild) {
                sectionList[0].removeChild(sectionList[0].firstChild);
              }
            
              //console.log(searchedList)

              searchedList.forEach(token =>{
                var li = document.createElement('li');
                li.className = 'search-control-info-list-item' 
                li.setAttribute('key', token.getId())     
                li.innerHTML= `
                    <spane>
                        <img src="../../img/face.png"/>
                        <h3>${token.getFeature().properties.username}</h3>
                        <h3>from ${token.getFeature().properties.city}</h3>                    
                    </spane>
                    <spane>
                        <p>Skills: ${token.getFeature().properties.description}</p>                
                    </spane> `

                li.addEventListener("click", this.clickListItem, this.props);
                li.addEventListener("click", function(e){
                    if (e.target && e.target.matches("li.search-control-info-list-item")) {
                        e.target.setAttribute("choosed", "true"); // new attribute                        
                      }
                });

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
