import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class TourPackageStore extends EventEmitter {
  constructor() {
    super()
    this.tourPackages = [];
    this.tours = [];
    this.passengers = [];
    this.remained_capacity = 1;
  }

  showTourPackages(tourPackages){
    this.tourPackages = [];
    for (var i = 0, len = tourPackages.length; i < len; ++i) {
      this.tourPackages.push(tourPackages[i]);
    }
    this.emit("show_tour_packages");
  }

  showTourPackage(data){
    this.tourPackages = [];
    this.tours = [];
    this.tourPackages.push(data.tour_package);
    this.tours.push(data.tours);
    this.emit("show_tour_package");
  }

  showTour(data){
    this.tourPackages = [];
    this.tours = [];
    this.tours.push(data.result);
    this.remained_capacity = data.remained_capacity
    this.emit("show_tour");
  }

  showReservation(data){
    this.tourPackages = [];
    this.tours = [];
    this.tours.push(data.tour);
    this.passengers.push(data.passenger);
    this.remained_capacity = data.remained_capacity
    this.emit("reservation_created");
  }

  allReservations(data){
    this.tourPackages = [];
    this.tours = [];
    this.passengers = [];
    this.tours.push(data.tour);
    this.remained_capacity = data.remained_capacity
    for (var i = 0, len = data.passengers.length; i < len; ++i) {
      this.passengers.push(data.passengers[i]);
    }
    this.emit("reservation_created");
  }

  verifiedReservations(data){
    this.tourPackages = [];
    this.tours = [];
    this.passengers = [];
    this.tours.push(data.tour);
    for (var i = 0, len = data.passengers.length; i < len; ++i) {
      this.passengers.push(data.passengers[i]);
    }
    this.emit("reservations_verified");
  }

  myReservations(data){
    console.log(data);
    this.tourPackages = [];
    this.tours = [];
    for (var i = 0, len = data.result.length; i < len; ++i) {
      this.tours.push(data.result[i].tour);
      this.tourPackages.push(data.result[i].tour_package)
    }

    this.emit("my_reservations");
  }

  getRemainedCapacity(){
    return this.remained_capacity
  }


  getPassenger(){
    return this.passengers
  }


  getAll() {
    return this.tourPackages
  }

  getTours() {
    return this.tours
  }


  handleActions(action) {
    switch(action.type) {
      case "SHOW_TOURPACKAGES": {
        this.showTourPackages(action.tourPackages);
        break;
      }
      case "SHOW_TOURPACKAGE": {
        this.showTourPackage(action.tourPackage);
        break;
      }
      case "SHOW_TOUR": {
        this.showTour(action.tour);
        break;
      }
      case "CREATE_RESERVATION": {
        this.showReservation(action.result);
        break;
      }

      case "ALL_RESERVATIONS": {
        this.allReservations(action.result);
        break;
      }

      case "RESERVATIONS_VERIFIED": {
        this.verifiedReservations(action.result);
        break;
      }

      case "MY_RESERVATIONS": {
        this.myReservations(action.result);
        break;
      }
    }
  }

}






const tourPackageStore = new TourPackageStore;
dispatcher.register(tourPackageStore.handleActions.bind(tourPackageStore));

export default tourPackageStore;
