import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class MyStore extends EventEmitter {
  constructor() {
    super()
    this.advertisements = [];
    this.photos= [];
    this.likes = '';
    this.provinces = [];
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

  editAdvertisement(advertisement){
    this.advertisements = [];
    this.advertisements.push(advertisement);
    this.emit("edit_advertisement");
  }

  deletePhoto(photos){
    this.advertisements = [];
    this.photos = [];
    for (var i = 0, len = photos.length; i < len; ++i) {
      this.photos.push(photos[i]);
    }
    this.emit("change_photos");
  }

  showProvinces(provinces){
    this.provinces = [];
    for (var i = 0, len = provinces.length; i < len; ++i) {
      this.provinces.push(provinces[i]);
    }
    this.emit("show_provinces");
  }

  unpinned(pin) {
    this.emit("unpinned");
  }

  liked(likes) {
    this.likes = likes
    this.emit("liked");
  }

  disliked(likes) {
    this.likes = likes
    this.emit("disliked");
  }

  createPin(pin){
    this.emit("pinned");
  }

  getLikes() {
    return this.likes
  }

  getPhotos() {
    return this.photos;
  }

  getProvinces() {
    return this.provinces;
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

      case "EDIT_ADVERTISEMENT": {
        this.editAdvertisement(action.advertisement);
        break;
      }

      case "CREATE_PIN": {
        this.createPin(action.pin);
        break;
      }

      case "UNPINNED": {
        this.unpinned(action.pin);
        break;
      }

      case "LIKE": {
        this.liked(action.likes);
        break;
      }

      case "DISLIKE": {
        this.disliked(action.likes);
        break;
      }

      case "DELETE_PHOTO": {
        this.deletePhoto(action.photos);
        break;
      }
      case "SHOW_PROVINCES": {
        this.showProvinces(action.provinces);
        break;
      }
    }
  }


}

const myStore = new MyStore;
dispatcher.register(myStore.handleActions.bind(myStore));

export default myStore;
