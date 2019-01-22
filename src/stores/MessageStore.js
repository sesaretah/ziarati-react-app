import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class MessageStore extends EventEmitter {
  constructor() {
    super()
    this.messages = []
    this.room_id = ''
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

  groupMessages(data){
    console.log(data);
  }


  getAll() {
    return this.messages
  }

  getRoom() {
    return this.room_id
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
      case "GROUP_MESSAGES": {
        this.groupMessages(action.data);
        break;
      }
    }
  }

}




const messageStore = new MessageStore;
dispatcher.register(messageStore.handleActions.bind(messageStore));

export default messageStore;
