/**
 *  this Store save token's stream for next using by search
 */

class StreamStore {
  constructor() {
    if (!StreamStore.instance) {
      this._data = [];
      StreamStore.instance = this;
    }

    return StreamStore.instance;
  }

  get() {
    return this._data[0];
  }

  set(stream) {
    this._data.push(stream)
  }


}

const instance = new StreamStore();
Object.freeze(instance);

export default instance;