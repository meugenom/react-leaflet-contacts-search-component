'use strict'

export default class Utils {

    constructor () {     
        this.document = document
    }

    Subscribe(event, element, func) {
        if (element.addEventListener) {
            element.addEventListener(event, func, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + event, func);
        } else {
            element['on' + event] = func;
        }
      }
    

}


