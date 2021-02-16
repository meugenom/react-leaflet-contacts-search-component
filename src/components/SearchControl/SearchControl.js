import React, {Component} from 'react';
import SearchControlList from './SearchControlList'
import './search-control.css'

export default class SearchControl extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSearchVisible: false,
            isCloseButtonVisible: false,
            isWrapperList: "closed",
            inputValue: ""
        };


        //bind for callbacks
        this.clickOpenSearchButton = this.clickOpenSearchButton.bind(this);
        this.clickCloseButton = this.clickCloseButton.bind(this);
        this.pressKeyInput = this.pressKeyInput.bind(this);      
    }

    clickOpenSearchButton() {
        this.setState(state => ({
            isSearchVisible: !state.isSearchVisible,
            isWrapperList: "closed",
            inputValue: ""        
        }));
    }


    clickCloseButton() {
        this.setState(state => ({
            isCloseButtonVisible: !state.isCloseButtonVisible,
            isSearchVisible: false,
            isWrapperList: "closed",
            inputValue: ''
        }));
    }

    pressKeyInput(event) {
        
        //visible close button 
        this.setState(state => ({
            isCloseButtonVisible: true,
            isWrapperList: "opened"
        }));

        //TODO: if(event.keyCode == 13)        
    }

    //it's call from SearchControlList to this parent component
    updateList = (list) => {
        this.props.updateInfo(list);
      }

    render() {
      return (
      <div className="search-box">
        <article className="search-control-wrap">  
            <section className={this.state.isSearchVisible?"search-control search-control-active":"search-control"}>
                <button className="search-control-icon-button" 
                    onClick={this.clickOpenSearchButton}>                
                    <svg viewBox="0 0 50 50">
                        <line x1="35" y1="35" x2="46" y2="46"/>
                        <circle cx="23" cy="23" r="16" fill="none"></circle> 
                            Sorry, your browser does not support inline SVG.
                    </svg>                    
                </button>                
                <input 
                    type="text" 
                    className="search-input search-control-input" 
                    placeholder="custom placeholder" 
                    onKeyPress={this.pressKeyInput}
                    onChange={e => this.setState({ inputValue: e.target.value })} 
                    value={this.state.inputValue}/>                
                <button className={ this.state.isCloseButtonVisible ? "search-control-close-button search-control-close-button-active": "search-control-close-button"} onClick={this.clickCloseButton}>
                    <svg viewBox="0 0 50 50">
                        <path d="M5 5 L45 45 M45 5 L5 45"/>
                        Sorry, your browser does not support inline SVG.
                    </svg>
                </button>
            </section>
            <section className={this.state.isWrapperList=="opened"?"search-control-info-wrapper":"search-control-info-wrapper search-control-info-wrapper-close"} >
                <section className="search-control-info">            
                    <SearchControlList 

                        activelist={this.state.isWrapperList} 
                        keys={this.state.inputValue}
                        updateList = {this.updateList}
                    />
                </section>            
            </section>    
        </article>
     </div>
      );
    }
  }
