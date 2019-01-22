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
import UserStore from "../../stores/UserStore";
import MyStore from "../../stores/MyStore";
import { dict} from '../Dict';
import logo from  "../../images/logo.png";

export default class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      advertisements: [],
      token: localStorage.getItem('token'),
      username: '',
      password: '',
    };
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  componentDidMount(){
    MyActions.groupedMessages(this.state.token);
  }




  render() {
    return (
      <Page loginScreen>
        <Navbar>
          <NavTitle>
            <img src={logo} alt="Logo" className="logo" />
          </NavTitle>
        </Navbar>

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
