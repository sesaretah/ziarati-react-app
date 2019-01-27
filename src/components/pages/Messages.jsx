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
    this.getGroups = this.getGroups.bind(this)
    this.getAdminGroups = this.getAdminGroups.bind(this)
    this.state = {
      groups: [],
      adminGroups: [],
      token: localStorage.getItem('token'),
    };
  }

  componentWillMount() {
    MessageStore.on("groups", this.getGroups);
    MessageStore.on("admin_groups", this.getAdminGroups);
  }

  componentWillUnmount() {
    MessageStore.removeListener("groups", this.getGroups);
    MessageStore.removeListener("admin_groups", this.getAdminGroups);
  }

  componentDidMount(){
    MyActions.groupedMessages(this.state.token);
    MyActions.adminGroupedMessages(this.state.token);
  }


  getGroups(){
    var groups = MessageStore.getGroups();
    this.setState({groups: groups});
  }

  getAdminGroups(){
    var adminGroups = MessageStore.getAdminGroups();
    this.setState({adminGroups: adminGroups});
  }

  createOtherItem(){
    var length = this.state.groups.length;
    let items = []
    for (let i = 0; i < length; i++) {
      items.push(<ListItem
        link={'/chat/' + this.state.groups[i].id+'/room/'+this.state.groups[i].rooms[0].id}
        title={this.state.groups[i].title}
        after=""
        subtitle=""
        text=""
        badge={this.state.groups[i].count}
        badgeColor="red"
        >
      </ListItem>);
    }
    return items
  }

  createYourItem(){
    var length = this.state.adminGroups.length;
    let items = []
    for (let i = 0; i < length; i++) {
      items.push(<ListItem
        link={'/rooms/' + this.state.adminGroups[i].id}
        title={this.state.adminGroups[i].title}
        after=""
        subtitle=""
        text=""
        badge={this.state.adminGroups[i].count}
        badgeColor="red"
        >
      </ListItem>);
    }
    return items
  }

  render() {
    return (
      <Page >
        <Navbar>
          <NavTitle>
            <img src={logo} alt="Logo" className="logo" />
          </NavTitle>
        </Navbar>

        <BlockTitle>{dict.conversations_on_other_ads}</BlockTitle>
        <Block>
        <List  simple-list>
          {this.createOtherItem()}
        </List>
        </Block>

        <BlockTitle>{dict.conversations_on_your_ads}</BlockTitle>
        <Block>
        <List  simple-list>
          {this.createYourItem()}
        </List>
        </Block>

        <Toolbar tabbar labels color="blue" bottomMd={true}>
          <Link href="#tab-1"><i class="f7-icons">data</i></Link>
          <Link href="/new_cam_advert/"><i class="f7-icons">add_round</i></Link>
          <Link href="/"><i class="f7-icons">home</i></Link>
          <Link href="/login/"><i class="f7-icons">person_round</i></Link>
        </Toolbar>
      </Page>
    )
  }

}
