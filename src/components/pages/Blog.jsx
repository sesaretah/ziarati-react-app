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
import BlogStore from "../../stores/BlogStore";
import MessageStore from "../../stores/MessageStore";
import CategoryStore from "../../stores/CategoryStore";
import { dict} from '../Dict';
import AdvertCard from './AdvertCard';
import logo from  "../../images/logo.png";
import Moment from 'react-moment';
import 'moment-timezone';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default class HomePage extends React.Component {

  constructor() {
    super();
    this.getBlogs = this.getBlogs.bind(this);
    if (window.cordova){
      var uuid = window.device.uuid
    } else {
      var uuid = ''
    }
    this.state = {
      blogs: '',
      token: window.localStorage.getItem('token'),
      unseens: 0,
      query: '',
      categories: [],
      uuid: uuid,
      allowInfinite: true,
      showPreloader: true,
      noResult: false,
      page: 1
    };
  }

  componentWillMount() {
    BlogStore.on("show_blogs", this.getBlogs);
    BlogStore.on("load", this.getBlogs);
  }

  componentWillUnmount() {
    BlogStore.removeListener("show_blogs", this.getBlogs);
    BlogStore.removeListener("load", this.getBlogs);
  }

  componentDidMount(){
    MyActions.getBlogs(this.state);
  }


  getBlogs() {
    var blogs = BlogStore.getAll()
    if (blogs.length > 0){
      this.setState({
        blogs: blogs,
        noResult: false,
        showPreloader: false
      });
    } else {
      this.setState({
        blogs: blogs,
        noResult: true,
        showPreloader: false
      });
    }

  }

  reloadAdvertisements(event, done) {
    this.setState({page: 1},  function() {
      MyActions.getTourPackages(this.state);
      done();
    });

  }

  loadMore() {
    const self = this;
    if (!self.state.allowInfinite) return;
    self.setState({ showPreloader: false });
    self.setState({ page: self.state.page + 1 });
    MyActions.loadAdvertisements(this.state);
  }

  searchads() {
    this.setState({query: this.search.value},  function() {
      MyActions.searchAdvertisements(this.state);
    });
  }

  createItem(){
    var length = this.state.blogs.length;
    let items = []
    for (let i = 0; i < length; i++) {
      items.push(<ListItem
        link={'/blog/' + this.state.blogs[i].id}
        title={this.state.blogs[i].title}
        after=""
        subtitle=""
        text={this.state.blogs[i].content}
        >
        <img slot="media" src={this.state.blogs[i].cover} width="80" />
        <span class="price text-muted"></span>
      </ListItem>);
    }
    return items
  }

  getUnseens() {
    this.setState({
      unseens: MessageStore.getUnseens(),
    });
  }

  blankResult() {
    if (this.state.noResult){
      return(<Block strong>{dict.no_result}</Block>);
    }
  }

  render() {

    return(
      <Page colorTheme="blue" className="gray" ptr onPtrRefresh={this.reloadAdvertisements.bind(this)}
        infinite
        infiniteDistance={10}
        infinitePreloader={this.state.showPreloader}
        onInfinite={this.loadMore.bind(this)}
        >
        <Navbar>
          <form class="searchbar">
            <div class="searchbar-inner">
              <div class="searchbar-input-wrap">
                <input type="search"
                  placeholder={dict.search}
                  ref={input => this.search = input}
                  onKeyUp={this.searchads.bind(this)}
                  />
                <i class="searchbar-icon"></i>
                <span class="input-clear-button"></span>
              </div>
              <span class="searchbar-disable-button"></span>
            </div>
          </form>
          <NavTitle>
            <img src={logo} alt="Logo" className="logo" />
          </NavTitle>
        </Navbar>

        <List mediaList>
          {this.createItem()}
        </List>

        <Toolbar tabbar labels color="blue" bottomMd={true}>
          <Link href="/blogs/"><i class="f7-icons">book</i></Link>
          <Link href="/"><i class="icon f7-icons">world</i></Link>
          <Link href="/login/">
            <i class="icon f7-icons ios-only">
              person_round
            </i>
          </Link>
        </Toolbar>
      </Page>

    );
  }
}
