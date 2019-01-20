import React, { Component } from 'react';
import { Page, Navbar, Block, Link, Toolbar, Swiper, SwiperSlide, NavTitle, BlockTitle, List, ListItem} from 'framework7-react';

import * as MyActions from "../../actions/MyActions";
import MyStore from "../../stores/MyStore";
import { dict} from '../Dict';
import AdvertCard from './AdvertCard';
import logo from  "../../images/logo.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class AdvertShow extends Component {
  constructor() {
    super();
    this.getAdvertisement = this.getAdvertisement.bind(this);
    this.swiperRef = React.createRef();
    this.state = {
      title: '',
      content: '',
      photos: '',
      id: '',
      phone_number:  '',
      city: '',
      address:  '',
      email:  '',
      telegram_channel: '',
      instagram_page: '',
      website: '',
      initSwiper: false
    };
  }


  componentWillMount() {
    MyStore.on("show_advertisement", this.getAdvertisement);
  }

  componentWillUnmount() {
    MyStore.removeListener("show_advertisement", this.getAdvertisement);
  }



  componentDidMount(){
    MyActions.getAdvertisement(this.$f7route.params['advertId']);
    const swiper = this.swiperRef.current.swiper;
    swiper.update();
  }

  getAdvertisement() {
    var advertisements = MyStore.getAll();
    console.log( advertisements[0]);
    this.setState({
      title: advertisements[0].title,
      content: advertisements[0].content,
      photos: advertisements[0].photos,
      id: advertisements[0].id,
      phone_number:  advertisements[0].phone_number,
      city:  advertisements[0].city,
      address:  advertisements[0].address,
      email:  advertisements[0].email,
      telegram_channel:  advertisements[0].telegram_channel,
      instagram_page:  advertisements[0].instagram_page,
      website:  advertisements[0].website,
      initSwiper: true
    });
  }

  createMarkup(string) {
    return {__html: string};
  }

  createSwipe() {
    var length = this.state.photos.length;
    var item = []
    for (let i = 0; i < length; i++) {
      var photo = this.state.photos[i]
      item.push(<SwiperSlide key={photo.id}><img src={photo.url}></img></SwiperSlide>)
    }
    const current = this.swiperRef.current;
    if (current != null){
      console.log(current);
      current.swiper.update();
    }
    return item
  }



  render() {
    return (
      <Page colorTheme="blue" className="gray">
        <Navbar>
          <NavTitle>
            <img src={logo} alt="Logo" className="logo" />
          </NavTitle>
        </Navbar>
        <Block>
          <Swiper ref={this.swiperRef} pagination navigation scrollbar params={{observer: true, observeParents: true}}>
            {this.createSwipe()}
          </Swiper>
        </Block>
        <Block >
          <b>{this.state.title}</b>
          <p>{this.state.content}</p>
        </Block>

        <BlockTitle>{dict.contact_information}</BlockTitle>
        <Block strong>
        <List simple-list>
          <ListItem title={dict.phone_number}><a class="link external" href={'tel://' + this.state.phone_number}>{this.state.phone_number}</a></ListItem>
          <ListItem title={dict.email}><span class="ltr"><a class="link external" href={'mailto:' + this.state.email}>{this.state.email}</a></span></ListItem>
          <ListItem title={dict.telegram_channel}><span class="ltr"><a class="link external" href={this.state.telegram_channel ? 'http://telegram.me/' + this.state.telegram_channel.replace('@', '') : '#'}>{this.state.telegram_channel}</a></span></ListItem>
          <ListItem title={dict.instagram_page}><span class="ltr"><a class="link external" href={this.state.instagram_page ? 'http://instagram.com/' + this.state.instagram_page.replace('@', '') : '#'}>{this.state.instagram_page}</a></span></ListItem>
          <ListItem title={dict.city}>{this.state.city}</ListItem>
          <ListItem title={dict.website}><span class="ltr"><a class="link external" href={this.state.website}>{this.state.website}</a></span></ListItem>
        </List>
      </Block>


        <Toolbar tabbar labels color="blue" bottomMd={true}>
          <Link href="#tab-1"><i class="f7-icons">data</i></Link>
          <Link href="/"><i class="f7-icons">home</i></Link>
          <Link href="/login/"><i class="f7-icons">person_round</i></Link>
        </Toolbar>
      </Page>
    );
  }
}
