'use strict'

import CONFIG from './Config'

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

  async getData(){
     return this.getCall();
  }

  async getCall() {
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
        try {
          const response = await fetch(this.host, options)
          const json = await response.json()
          return json

        } catch (err) {            
            console.log('Error getting documents', err)

        }
  }   
      
}
