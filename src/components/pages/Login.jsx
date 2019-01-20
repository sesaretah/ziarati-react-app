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
  ListButton
} from 'framework7-react';

import * as MyActions from "../../actions/MyActions";
import UserStore from "../../stores/UserStore";
import { dict} from '../Dict';
import logo from  "../../images/logo.png";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.logged_in = this.logged_in.bind(this);
    this.not_logged_in = this.not_logged_in.bind(this);
    this.state = {
      token: localStorage.getItem('token'),
      username: '',
      password: '',
    };
  }

  componentWillMount() {
    UserStore.on("logged_in", this.logged_in);
    UserStore.on("not_logged_in", this.not_logged_in);
  }

  componentWillUnmount() {
    UserStore.removeListener("logged_in", this.logged_in);
    UserStore.removeListener("not_logged_in", this.not_logged_in);
  }

  logged_in() {
    const self = this;
    const app = self.$f7;
    const router = self.$f7router;
    console.log(UserStore.getToken());
    localStorage.setItem('token', UserStore.getToken());
    router.back();
    window.plugins.toast.showWithOptions({
      message: 'خوش آمدید ',
      duration: "short", // 2000 ms
      position: "bottom",
      styling: {
        opacity: 0.75, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
        textSize: 20.5, // Default is approx. 13.
        cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
        horizontalPadding: 20, // iOS default 16, Android default 50
        verticalPadding: 16 // iOS default 12, Android default 30
      }
    });
  }

  not_logged_in() {
    var reason = UserStore.getReason();
    const self = this;
    const app = self.$f7;
    const router = self.$f7router;
    app.dialog.alert(reason, dict.error, () => {
      //router.back();
    });
  }

  signIn() {
    MyActions.login(this.state);
  }

  signOut() {
    const self = this;
    const app = self.$f7;
    const router = self.$f7router;
    this.setState({ token: null});
    localStorage.removeItem('token');
    /*
    window.plugins.toast.showWithOptions({
      message: 'خروج موفق',
      duration: "short", // 2000 ms
      position: "bottom",
      styling: {
        opacity: 0.75, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
        textSize: 20.5, // Default is approx. 13.
        cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
        horizontalPadding: 20, // iOS default 16, Android default 50
        verticalPadding: 16 // iOS default 12, Android default 30
      }
    });*/
  }

  LoginContent() {
    return (
      <React.Fragment>
    <LoginScreenTitle>{dict.login}</LoginScreenTitle>
    <List form>
      <ListInput
        label=''
        type="text"
        placeholder={dict.username}
        value={this.state.username}
        onInput={(e) => {
          this.setState({ username: e.target.value});
        }}
        />
      <ListInput
        label=''
        type="password"
        placeholder={dict.password}
        value={this.state.password}
        onInput={(e) => {
          this.setState({ password: e.target.value});
        }}
        />
    </List>
    <List>
      <Block>
        <Button raised big fill  onClick={this.signIn.bind(this)}>{dict.sign_in}</Button>
      </Block>
      <br />
      <span> {dict.signed_up_already} </span>
      <Link href="/sign_up/">{dict.sign_up}</Link>
    </List>
  </React.Fragment>
  );
  }

  SignOutContent() {
    return (
    <List>
      <Block>
      <Button raised big fill color="red" onClick={this.signOut.bind(this)}>{dict.sign_out}</Button>
      </Block>
    </List>);
  }

  UserContent() {

    if (this.state.token) {
      return (this.SignOutContent());
    } else {
      return (this.LoginContent());
    }

  }


  render() {
    return (
      <Page loginScreen>
        <Navbar>
          <NavTitle>
            <img src={logo} alt="Logo" className="logo" />
          </NavTitle>
        </Navbar>
        {this.UserContent()}

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
