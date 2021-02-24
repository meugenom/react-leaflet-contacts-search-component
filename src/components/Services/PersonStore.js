class PersonStore {
    constructor(){
     if(! PersonStore.instance){
       this._data = [];
       PersonStore.instance = this;
     }
  
     return PersonStore.instance;
    }

    get(){
        return this._data[0]; 
    }

    set(persons){
        this._data.push(persons)
    }

  
  }
  
  const instance = new PersonStore();
  Object.freeze(instance);
  
  export default instance;