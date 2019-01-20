import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class MyStore extends EventEmitter {
  constructor() {
    super()
    this.advertisements = [];
  }

  createTourPackage(tourPackage) {
    this.advertisements.push(tourPackage);
    this.emit("change");
  }

  createAdvertisement(advertisement) {
    this.advertisements = [];
    this.advertisements.push(advertisement);
    this.emit("advertisement_created");
  }

  showAdvertisements(advertisements){
    this.advertisements = [];
    for (var i = 0, len = advertisements.length; i < len; ++i) {
      this.advertisements.push(advertisements[i]);
    }
  //  console.log(this.advertisements);
    this.emit("change");
  }

  loadAdvertisements(advertisements){
    for (var i = 0, len = advertisements.length; i < len; ++i) {
      this.advertisements.push(advertisements[i]);
    }
  //  console.log(this.advertisements);
    this.emit("load");
  }

  deleteAdvertisement(advertisements){
    this.advertisements = [];
    for (var i = 0, len = advertisements.length; i < len; ++i) {
      this.advertisements.push(advertisements[i]);
    }
    this.emit("change");
  }

  showAdvertisement(advertisement){
    this.advertisements = [];
    this.advertisements.push(advertisement);
    this.emit("show_advertisement");
  }

    getAll() {
    return this.advertisements;
  }

  handleActions(action) {
    switch(action.type) {
      case "CREATE_ADVERTISEMENT": {
        this.createAdvertisement(action.tourPackage);
        break;
      }
      case "CREATE_TOURPACKAGE": {
        this.createTourPackage(action.tourPackage);
        break;
      }
      case "SHOW_ADVERTISEMENTS": {
        this.showAdvertisements(action.advertisements);
        break;
      }
      case "LOAD_ADVERTISEMENTS": {
        this.loadAdvertisements(action.advertisements);
        break;
      }
      case "SHOW_ADVERTISEMENT": {
        this.showAdvertisement(action.advertisement);
        break;
      }

      case "DELETE_ADVERTISEMENT": {
        this.deleteAdvertisement(action.advertisements);
        break;
      }
    }
  }

DELETE_ADVERTISEMENT
}

const myStore = new MyStore;
dispatcher.register(myStore.handleActions.bind(myStore));

export default myStore;
