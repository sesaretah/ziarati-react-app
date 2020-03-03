import React, { Component } from 'react';
import { Page, Navbar, Block, Link, Toolbar, Swiper, SwiperSlide, NavTitle, BlockTitle, List, ListItem, Segmented, Button} from 'framework7-react';

import * as MyActions from "../../actions/MyActions";
import MyStore from "../../stores/MyStore";
import BlogStore from "../../stores/BlogStore";
import MessageStore from "../../stores/MessageStore";
import { dict} from '../Dict';
import AdvertCard from './AdvertCard';
import logo from  "../../images/logo.png";
import Moment from 'react-moment';
import 'moment-timezone';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Tour extends Component {
  constructor() {
    super();
    this.getBlog = this.getBlog.bind(this);
    if (window.cordova){
      var uuid = window.device.uuid
    } else {
      var uuid = ''
    }
    this.state = {
      token: window.localStorage.getItem('token'),
      blogs: [],
    };
  }


  componentWillMount() {
    BlogStore.on("show_blog", this.getBlog);
  }

  componentWillUnmount() {
    BlogStore.removeListener("show_blog", this.getBlog);
  }



  componentDidMount(){
    MyActions.getBlog(this.$f7route.params['blogId']);
  }


  getBlog() {
    var blogs = BlogStore.getAll();
    console.log(blogs);
    this.setState({
      blogs: blogs[0]
    });
  }

  blogTitle(){
    if (this.state.blogs) {
      return(this.state.blogs.title)
    }
  }

  blogContent(){
    if (this.state.blogs) {
      return(this.state.blogs.content)
    }
  }



    render() {
      return (
        <Page colorTheme="blue" className="gray">
          <Navbar>
            <Link href='/blogs/'>
              <i class="f7-icons color-white">chevron_right</i>
              <div class='custom-category color-white'>{dict.back}</div>
            </Link>
            <NavTitle>
              <img src={logo} alt="Logo" className="logo" />
            </NavTitle>
          </Navbar>

          <Block strong>{this.blogTitle()}</Block>

          <Block strong>
            <div dangerouslySetInnerHTML={{__html: this.blogContent()}}></div>
          </Block>

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
