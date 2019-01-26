import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class ProfileStore extends EventEmitter {
  constructor() {
    super()
    this.id = '';
    this.phone_number = '';
    this.address = '';
    this.city = '';
    this.email = '';
    this.telegram_channel = '';
    this.instagram_page = '';
    this.website = '';
  }

  show_profile(profile){
    console.log(profile);
    this.id = profile.id;
    this.phone_number = profile.phone_number;
    this.address = profile.address;
    this.city = profile.city;
    this.email = profile.email;
    this.telegram_channel = profile.telegram_channel;
    this.instagram_page = profile.instagram_page;
    this.website = profile.website;
    this.emit("show_profile");
  }


  getProfile() {
    console.log(this);
    return this
  }

  getReason() {
    return this.reason
  }


  handleActions(action) {
    switch(action.type) {
      case "SHOW_PROFILE": {
        this.show_profile(action.profile);
        break;
      }
    }
  }

}

const profileStore = new ProfileStore;
dispatcher.register(profileStore.handleActions.bind(profileStore));

export default profileStore;
