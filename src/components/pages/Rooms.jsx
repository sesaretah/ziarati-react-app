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
  BlockFooter,
  LoginScreenTitle,
  ListButton,
  Segmented
} from 'framework7-react';

import * as MyActions from "../../actions/MyActions";
import MessageStore from "../../stores/MessageStore";
import MyStore from "../../stores/MyStore";
import { dict} from '../Dict';
import logo from  "../../images/logo.png";

export default class Message extends React.Component {

  constructor(props) {
    super(props);
    this.getRooms = this.getRooms.bind(this)

    this.state = {
      rooms: [],
      advertId: this.$f7route.params['advertId'],
      token: localStorage.getItem('token'),
    };
  }

  componentWillMount() {
    MessageStore.on("rooms", this.getRooms);
  }

  componentWillUnmount() {
    MessageStore.removeListener("rooms", this.getRooms);
  }

  componentDidMount(){
    MyActions.getRooms(this.state.advertId, this.state.token);
  }


  getRooms(){
    var rooms = MessageStore.getRooms();
    console.log(rooms);
    this.setState({rooms: rooms});
  }

  createItem(){
    var length = this.state.rooms.length;
    let items = []
    for (let i = 0; i < length; i++) {
      items.push(<ListItem
        link={'/chat/' + this.state.rooms[i].advert_id + '/room/'+this.state.rooms[i].id}
        title={this.state.rooms[i].title}
        after=""
        subtitle=""
        text=""
        badge=""
        >
      </ListItem>);
    }
    return items
  }

  render() {
    return (
      <Page loginScreen>
        <Navbar>
          <NavTitle>
            <img src={logo} alt="Logo" className="logo" />
          </NavTitle>
        </Navbar>

        <List  simple-list>
          {this.createItem()}
        </List>

        <Toolbar tabbar labels color="blue" bottomMd={true}>
          <Link href="#tab-1"><i class="f7-icons">data</i></Link>
          <Link href="/new_cam_advert/"><i class="f7-icons">add_round</i></Link>
          <Link href="/"><i class="f7-icons">home</i></Link>
          <Link href="/login/">
            <i class="icon f7-icons ios-only">
              person_round
              <span class="badge color-red"></span>
            </i>
          </Link>
        </Toolbar>
      </Page>
    )
  }

}
