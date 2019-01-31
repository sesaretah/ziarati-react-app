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

export default class MyAdverts extends React.Component {
  constructor(props) {
    super(props);
    this.getAdvertisements = this.getAdvertisements.bind(this);
    this.getUnseens = this.getUnseens.bind(this);
    this.state = {
      advertisements: [],
      token: localStorage.getItem('token'),
      unseens: 0,
      username: '',
      password: '',
    };
  }

  componentWillMount() {
    MyStore.on("change", this.getAdvertisements);
    MessageStore.on("unseens", this.getUnseens);
  }

  componentWillUnmount() {
    MyStore.removeListener("change", this.getAdvertisements);
    MessageStore.removeListener("unseens", this.getUnseens);
  }

  componentDidMount(){
    MyActions.getMyPins(this.state.token);
    MyActions.getAllUnseens(this.state.token);
  }

  getAdvertisements() {
    this.setState({
      advertisements: MyStore.getAll(),
    });
  }

  createItem(){
    var length = this.state.advertisements.length;
    let items = []
    for (let i = 0; i < length; i++) {
      items.push(<ListItem
        link={'/adsverts/' + this.state.advertisements[i].id}
        title={this.state.advertisements[i].title}
        after=""
        subtitle=""
        text=""
        >
      </ListItem>);
    }
    return items
  }


  getUnseens() {
    this.setState({
      unseens: MessageStore.getUnseens(),
    });
  }


  render() {
    return (
      <Page >
        <Navbar>
          <Link href='/login/'><i class="f7-icons color-white">chevron_right</i></Link>
          <NavTitle>
            <img src={logo} alt="Logo" className="logo" />
          </NavTitle>
        </Navbar>

          <List mediaList>
            {this.createItem()}
          </List>
  
        <Toolbar tabbar labels color="blue" bottomMd={true}>
          <Link href="#tab-1"><i class="f7-icons">data</i></Link>
          <Link href="/new_cam_advert/"><i class="f7-icons">add_round</i></Link>
          <Link href="/"><i class="f7-icons">home</i></Link>
            <Link href="/login/">
              <i class="icon f7-icons ios-only">
                person_round
                <span class="badge color-red">{this.state.unseens}</span>
              </i>
            </Link>
        </Toolbar>
      </Page>
    )
  }

}
