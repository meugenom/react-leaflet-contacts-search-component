'use strict'
//import { useHistory } from 'react-router-dom';
import CONFIG from './Config'
import persons from '../../data/persons.json'

/**
 *
 * @async GET call to the server 
 * @param {string: 'json' || 'text'} dataType  
 * @param {string: name of host} host 
 * @return {data in format json or text} 
 * @return {callback} - for 404 page with Usehistory from React
 */

export default class Service {
  
  constructor(){
    this.dataType = CONFIG.dataType;
    this.host = CONFIG.host != '' ? CONFIG.host : null;  
    this.data = {}; 
  }

  getData(){
    if(this.host == null){
      this.data = {data: persons};
    }else{
      this.data = this.getCall();
    }

    return this.data.data
  }

  async getCall() {
      const response = await fetch(
        this.host, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
        .catch((error) => {
          console.log(error)          
          /**
           * need to correct for your environment 
           */
          //const history = useHistory()
          //history.push('/error404') 
        })
      
      this.data = (this.dataType === 'json' ? await response.json() : await response.text())
    
    return this.data.data
  }

}
