import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class MessageStore extends EventEmitter {
  constructor() {
    super()
    this.messages = [];
    this.room_id = '';
    this.groups = [];
    this.adminGroups = [];
    this.rooms = [];
    this.unseens = 0;
  }

  newMessage(message){
    this.messages = [];
    this.messages.push(message);
    console.log(message);
    this.emit('new_message');
  }

  roomMessages(data){
    this.room_id = data.room_id;
    this.messages = [];
    for (var i = 0, len = data.messages.length; i < len; ++i) {
      this.messages.push(data.messages[i]);
    }
    this.emit("messages");
  }

  roomsCollect(data){
    this.rooms = [];
    for (var i = 0, len = data.result.length; i < len; ++i) {
      console.log(data.result[i]);
      this.rooms.push(data.result[i]);
    }
    this.emit("rooms");
  }

  groupMessages(data){
    this.groups = [];
    for (var i = 0, len = data.result.length; i < len; ++i) {
      this.groups.push(data.result[i]);
    }
    this.emit("groups");
  }

  adminGroupMessages(data){
    this.adminGroups = [];
    for (var i = 0, len = data.result.length; i < len; ++i) {
      this.adminGroups.push(data.result[i]);
    }
    this.emit("admin_groups");
  }

  roomLink(data){
    console.log(data);
    this.room_id = data.room.id;
    this.emit("roomLink");
  }

  allUnseens(data){
    this.unseens = data.count;
    this.emit("unseens");
  }

  getGroups() {
    return this.groups
  }

  getAdminGroups() {
    return this.adminGroups
  }

  getRooms() {
    return this.rooms
  }

  getAll() {
    return this.messages
  }

  getRoom() {
    return this.room_id
  }

  getUnseens() {
    return this.unseens
  }


  handleActions(action) {
    switch(action.type) {
      case "NEW_MESSAGE": {
        this.newMessage(action.message);
        break;
      }
      case "ROOM_MESSAGES": {
        this.roomMessages(action.data);
        break;
      }
      case "ROOMS": {
        this.roomsCollect(action.data);
        break;
      }
      case "GROUP_MESSAGES": {
        this.groupMessages(action.data);
        break;
      }

      case "ADMIN_GROUP_MESSAGES": {
        this.adminGroupMessages(action.data);
        break;
      }

      case "ADVERT_ROOM": {
        this.roomLink(action.data);
        break;
      }

      case "ALL_UNSEENS": {
        this.allUnseens(action.data);
        break;
      }
    }
  }

}




const messageStore = new MessageStore;
dispatcher.register(messageStore.handleActions.bind(messageStore));

export default messageStore;
