import React, { Component }  from 'react';
import Google from '../Services/Parser/Google'


export default class SearchControlList extends Component {
    
    
    constructor(props) {
        super(props);     
        this.state = {
            keys: "",
            activelist: "closed"
        };
        
        this.google = new Google();        
        
        this.searchedList = []

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

    clickListItem = ( props, token ) => ( event ) => {    
		
		console.log("choosed");
        var searchedList = [];
        const li = document.querySelectorAll('li[choosed]');
        const liSection = document.querySelectorAll('li[key]');
        if(li[0]){            
            searchedList.push(token);
            props.updateList(searchedList);
            
            for(var i=0; i < liSection.length; i++){
                if(liSection[i].getAttribute('choosed')==null){
                    liSection[i].remove();
                }
            }

        }
    }

    search(word){        
        this.searchedList = this.google.find(word)
        
        //console.log(this.searchedList)
        
        //if(this.searchedList[0]){
            
            //send list to props of the parent component 
            this.props.updateList(this.searchedList);

            const sectionList = document.getElementsByClassName('search-control-info-list');
            
            while (sectionList[0].firstChild) {
                sectionList[0].removeChild(sectionList[0].firstChild);
              }
            
              //console.log(this.searchedList)

              this.searchedList.forEach(token =>{
                var li = document.createElement('li');
                li.className = 'search-control-info-list-item'
                li.setAttribute('key', token.getId())     
                li.innerHTML= `
                    <div className = "left">
                        <img src="./img/programmer.png" alt="avatar"/>
                        <h3>${token.getFeature().properties.username}</h3>
                        <h3>${token.getFeature().properties.city}</h3>                    
                    </div>
                    <div className = "right">
                        <p>About: ${token.getFeature().properties.about}</p>                
                    </div> `
				
				li.addEventListener("click", function(e){
					console.log(e);
                    if (e.target && e.target.matches("li.search-control-info-list-item")) {
                        e.target.setAttribute("choosed", "true"); // new attribute                     
                      }
                }, true);

				li.addEventListener("click", this.clickListItem(this.props, token), true);
				

                sectionList[0].appendChild(li);
            })
            
        //}
    }


render() {

    return (
        <ul className="search-control-info-list">                         
        </ul>
    );
    }
}
