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
import MyStore from "../../stores/MyStore";
import { dict} from '../Dict';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.logged_in = this.logged_in.bind(this);
    this.sign_up_fail = this.sign_up_fail.bind(this);
    this.getProvinces = this.getProvinces.bind(this);
    this.change = this.change.bind(this);

    this.state = {
      username: '',
      password: '',
      password_confirmation: '',
      name: '',
      provinces: [],
      province_id: 'b10feba7-367b-43b5-a31e-47aa5a4a8d13'
    };
  }


  componentWillMount() {
    UserStore.on("logged_in", this.logged_in);
    UserStore.on("sign_up_fail", this.sign_up_fail);
    MyStore.on("show_provinces", this.getProvinces);
  }

  componentWillUnmount() {
    UserStore.removeListener("logged_in", this.logged_in);
    UserStore.removeListener("sign_up_fail", this.sign_up_fail);
    MyStore.removeListener("show_provinces", this.getProvinces);
  }

  componentDidMount(){
    MyActions.getProvinces();
  }

  logged_in() {
    console.log('Logged In');
    const self = this;
    const router = self.$f7router;
    console.log(UserStore.getToken());
    localStorage.setItem('token', UserStore.getToken());
    router.navigate('/');
  }

  sign_up_fail() {
    var reason = UserStore.getReason();
    var str = '<ul>'
    for (var key in reason) {
      if (reason.hasOwnProperty(key)) {
        str = str + '<li>' + dict[key] + " " + reason[key] + '</li>'
      }
    }
    str = str + '</ul>'
    const self = this;
    const app = self.$f7;
    const router = self.$f7router;
    app.dialog.alert(str, dict.error, () => {
      //router.back();
    });
  }

  signIn() {
    MyActions.login(this.state);
  }

  signUp() {
    MyActions.sign_up(this.state);
  }

  getProvinces(){
    var provinces = MyStore.getProvinces();
    this.setState({provinces: provinces});
  }

  provinceItems(){
    var length = this.state.provinces.length;
    let items = []
    for (let i = 0; i < length; i++) {
      console.log(this.state.provinces[i].id);
      items.push(<option value={this.state.provinces[i].id} >{this.state.provinces[i].name}</option>);
    }
    return items
  }

  change(e){
    this.setState({province_id: e.target.value});
  }

  render() {
    return (
      <Page loginScreen>
        <Navbar title={dict.back} backLink="Back"></Navbar>
        <LoginScreenTitle>{dict.sign_up}</LoginScreenTitle>
        <List form>
          <ListInput
            label={dict.username}
            type="tel"
            placeholder=""
            value={this.state.username}
            onInput={(e) => {
              this.setState({ username: e.target.value});
            }}
            />
          <ListInput
            label={dict.name}
            type="text"
            placeholder=""
            value={this.state.name}
            onInput={(e) => {
              this.setState({ name: e.target.value});
            }}
            />
          <li class="">
            <span className="custom-label ">{dict.province}</span>
          </li>
          <ListItem>
            <select name="province_id" value={this.state.province_id} onChange={this.change} className='custom-select'>
              {this.provinceItems()}
            </select>
          </ListItem>
          <ListInput
            label={dict.password}
            type="password"
            placeholder=""
            value={this.state.password}
            onInput={(e) => {
              this.setState({ password: e.target.value});
            }}
            />
          <ListInput
            label={dict.password_confirmation}
            type="password"
            placeholder=""
            value={this.state.password_confirmation}
            onInput={(e) => {
              this.setState({ password_confirmation: e.target.value});
            }}
            />
        </List>
        <List>
          <Button raised big fill  onClick={this.signUp.bind(this)}>{dict.sign_up}</Button>
        </List>

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
