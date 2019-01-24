import React from 'react';
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavRight,
  Link,
  Toolbar,
  Block,
  BlockTitle,
  List,
  ListInput,
  ListItem,
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Icon,
  F7Icon,
  Searchbar,
  Message,
  Messagebar,
  MessagebarAttachments,
  MessagebarAttachment,
  MessagebarSheet,
  Messages,
  MessagesTitle,
  MessagebarSheetImage
} from 'framework7-react';

import * as MyActions from "../../actions/MyActions";
import MessageStore from "../../stores/MessageStore";
import { dict} from '../Dict';
import AdvertCard from './AdvertCard';
import logo from  "../../images/logo.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default class Chat extends React.Component {
  constructor(props) {
      super(props);
      this.getMessage = this.getMessage.bind(this)
      this.sendMessage = this.sendMessage.bind(this)
      this.getAll = this.getAll.bind(this)
      this.onBackKeyDown = this.onBackKeyDown.bind(this);
      this.state = {
        token: localStorage.getItem('token'),
        advertId: this.$f7route.params['advertId'],
        room_id: this.$f7route.params['roomId'],
        attachments: [],
        sheetVisible: false,
        typingMessage: null,
        messagesData: [],
        images: [],
        page: 1,
        people: [
          {
            name: 'Kate Johnson',
            avatar: 'http://lorempixel.com/100/100/people/9',
          },
          {
            name: 'Blue Ninja',
            avatar: 'http://lorempixel.com/100/100/people/7',
          },
        ],
        answers: [],
        responseInProgress: false,
      }
    }

    componentWillMount() {
      MessageStore.on("new_message", this.getMessage);
      MessageStore.on("messages", this.getAll);
    }

    componentWillUnmount() {
      MessageStore.removeListener("messages", this.getAll);
    }

    getMessage() {
      var messages = MessageStore.getAll();
      this.setState({messagesData: this.state.messagesData.concat(messages[0])});
    }

    getAll(){
      var messages = MessageStore.getAll();
      var room_id = MessageStore.getRoom();
      this.setState({messagesData: messages.reverse()});
      this.setState({room_id: room_id});
    }

    render() {
      return (
        <Page>
          <Navbar>
            <NavTitle>
              <img src={logo} alt="Logo" className="logo" />
            </NavTitle>
          </Navbar>

          <Messagebar
            placeholder={dict.send_message}
            ref={(el) => {this.messagebarComponent = el}}
            attachmentsVisible={this.attachmentsVisible}
            sheetVisible={this.state.sheetVisible}
          >
            <Link
              iconIos="f7:camera_fill"
              iconMd="material:camera_alt"
              slot="inner-start"
              onClick={() => {this.setState({sheetVisible: !this.state.sheetVisible})}}
            ></Link>
            <Link
              iconIos="f7:arrow_up_fill"
              iconMd="material:send"
              slot="inner-end"
              onClick={this.sendMessage.bind(this)}
            ></Link>
          </Messagebar>

          <Messages ref={(el) => {this.messagesComponent = el}}>
            <MessagesTitle></MessagesTitle>

            {this.state.messagesData.map((message, index) => (
              <Message
                key={index}
                type={message.type}
                image={message.image}
                name={message.name}
                avatar={message.avatar}
                first={this.isFirstMessage(message, index)}
                last={this.isLastMessage(message, index)}
                tail={this.isTailMessage(message, index)}
              >
                {message.text && (
                  <span slot="text" dangerouslySetInnerHTML={{__html: message.text}} />
                )}
              </Message>
            ))}
            {this.state.typingMessage && (
              <Message
                type="received"
                typing={true}
                first={true}
                last={true}
                tail={true}
                header={`${this.state.typingMessage.name} is typing`}
                avatar={this.state.typingMessage.avatar}
              ></Message>
            )}
          </Messages>
          <Toolbar tabbar labels color="blue" bottomMd={true}>
            <Link href="#tab-1"><i class="f7-icons">data</i></Link>
            <Link href="/new_cam_advert/"><i class="f7-icons">add_round</i></Link>
            <Link href="/"><i class="f7-icons">home</i></Link>
            <Link href="/login/"><i class="f7-icons">person_round</i></Link>
          </Toolbar>
        </Page>
      )
    }

    get attachmentsVisible() {
      const self = this;
      return self.state.attachments.length > 0;
    }
    get placeholder() {
      const self = this;
      return self.state.attachments.length > 0 ? 'Add comment or Send' : 'Message';
    }
    componentDidMount() {
      //console.log(this.state);
      MyActions.getMessages(this.state.advertId, this.state.token, this.state.room_id ,this.state.page);
      MyActions.roomSeen(this.state.room_id, this.state.token);
      document.addEventListener('backbutton', this.onBackKeyDown, false);
      const self = this;
      self.$f7ready(() => {
        self.messagebar = self.messagebarComponent.f7Messagebar;
        self.messages = self.messagesComponent.f7Messages;
      });
    }
    onBackKeyDown() {
      const self = this;
      const app = self.$f7;
      const router = self.$f7router;
      if (router.url == '/') {
        router.navigate('/');
      } else {
        document.removeEventListener('backbutton', this.onBackKeyDown, false);
        router.back();
      }
    }
    isFirstMessage(message, index) {
      const self = this;
      const previousMessage = self.state.messagesData[index - 1];
      if (message.isTitle) return false;
      if (!previousMessage || previousMessage.type !== message.type || previousMessage.name !== message.name) return true;
      return false;
    }
    isLastMessage(message, index) {
      const self = this;
      const nextMessage = self.state.messagesData[index + 1];
      if (message.isTitle) return false;
      if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name) return true;
      return false;
    }
    isTailMessage(message, index) {
      const self = this;
      const nextMessage = self.state.messagesData[index + 1];
      if (message.isTitle) return false;
      if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name) return true;
      return false;
    }
    deleteAttachment(image) {
      const self = this;
      const attachments = self.state.attachments;
      const index = attachments.indexOf(image);
      attachments.splice(index, 1);
      self.setState({ attachments });
    }
    handleAttachment(e) {
      const self = this;
      const attachments = self.state.attachments;
      const index = self.$$(e.target).parents('label.checkbox').index();
      const image = self.state.images[index];
      if (e.target.checked) {
        // Add to attachments
        attachments.unshift(image);
      } else {
        // Remove from attachments
        attachments.splice(attachments.indexOf(image), 1);
      }
      self.setState({ attachments });
    }
    sendMessage() {
      const self = this;
      const text = self.messagebar.getValue().replace(/\n/g, '<br>').trim();
      MyActions.createMessage(text, this.state.advertId, this.state.token, this.state.room_id);
      self.messagebar.clear();

      // Focus area
      if (text.length) self.messagebar.focus();
    }
}
