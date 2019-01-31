import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class CategoryStore extends EventEmitter {
  constructor() {
    super()
    this.categories = [];
  }

  showCategories(categories){
    this.categories = [];
    for (var i = 0, len = categories.length; i < len; ++i) {
      this.categories.push(categories[i]);
    }
    this.emit("show_categories");
  }

  showCategory(category){
    console.log(category.title);
    this.categories = [];
    this.categories.push(category);
    this.emit("show_category");
  }


  getAll() {
    return this.categories
  }



  handleActions(action) {
    switch(action.type) {
      case "SHOW_CATEGORIES": {
        console.log(action);
        this.showCategories(action.categories);
        break;
      }
      case "SHOW_CATEGORY": {
        console.log(action);
        this.showCategory(action.categories);
        break;
      }
    }
  }

}





const categoryStore = new CategoryStore;
dispatcher.register(categoryStore.handleActions.bind(categoryStore));

export default categoryStore;
