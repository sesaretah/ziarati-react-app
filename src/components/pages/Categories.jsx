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
  Searchbar
} from 'framework7-react';

import * as MyActions from "../../actions/MyActions";
import CategoryStore from "../../stores/CategoryStore";
import { dict} from '../Dict';
import AdvertCard from './AdvertCard';
import logo from  "../../images/logo.png";
import Moment from 'react-moment';
import 'moment-timezone';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default class Categories extends React.Component {

  constructor() {
    super();
    this.getCategories = this.getCategories.bind(this);
    if (window.cordova){
      var uuid = window.device.uuid
    } else {
      var uuid = ''
    }
    this.state = {
      categories: [],
      token: window.localStorage.getItem('token'),
      unseens: 0,
      query: '',
      uuid: uuid,
      allowInfinite: true,
      showPreloader: true,
      page: 1
    };
  }

  componentWillMount() {
    CategoryStore.on("show_categories", this.getCategories);
  }

  componentWillUnmount() {
    CategoryStore.removeListener("show_categories", this.getCategories);
  }

  componentDidMount(){
    MyActions.getCategories(this.$f7route.params['categoryId']);
  }

  getCategories() {
    this.setState({
      categories: CategoryStore.getAll(),
    });
  }


  createItem(){
    var length = this.state.categories.length;
    let items = []
    for (let i = 0; i < length; i++) {
      items.push(<ListItem
        link={'/categories/' + this.state.categories[i].id}
        title={this.state.categories[i].title}
        after=""
        subtitle=""
        text={this.state.categories[i].content}
        >
      </ListItem>);
    }
    return items
  }


  render() {
    return(
      <Page>
        <Navbar>
          <NavTitle>
            <img src={logo} alt="Logo" className="logo" />
          </NavTitle>
          <Link onClick={() => this.$f7router.back()}>Go Back</Link>
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

    );
  }
}
