import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class CategoryStore extends EventEmitter {
  constructor() {
    super()
    this.categories = [];
  }

  showCategoies(categories){
    this.categories = [];
    for (var i = 0, len = categories.length; i < len; ++i) {
      this.categories.push(categories[i]);
    }
    this.emit("show_categories");
  }


  getAll() {
    return this.categories
  }



  handleActions(action) {
    switch(action.type) {
      case "SHOW_CATEGORIES": {
        console.log(action);
        this.showCategoies(action.categories);
        break;
      }
    }
  }

}




const categoryStore = new CategoryStore;
dispatcher.register(categoryStore.handleActions.bind(categoryStore));

export default categoryStore;
