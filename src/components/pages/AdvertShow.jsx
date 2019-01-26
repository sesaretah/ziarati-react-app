import React, { Component } from 'react';
import { Page, Navbar, Block, Link, Toolbar, Swiper, SwiperSlide, NavTitle, BlockTitle, List, ListItem, Segmented, Button} from 'framework7-react';

import * as MyActions from "../../actions/MyActions";
import MyStore from "../../stores/MyStore";
import MessageStore from "../../stores/MessageStore";
import { dict} from '../Dict';
import AdvertCard from './AdvertCard';
import logo from  "../../images/logo.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class AdvertShow extends Component {
  constructor() {
    super();
    this.getAdvertisement = this.getAdvertisement.bind(this);
    this.pinned = this.pinned.bind(this);
    this.unpinned = this.unpinned.bind(this);
    this.liked = this.liked.bind(this);
    this.disliked = this.disliked.bind(this);
    this.getRoom = this.getRoom.bind(this);
    this.onBackKeyDown = this.onBackKeyDown.bind(this);
    this.swiperRef = React.createRef();
    if (window.cordova){
      var uuid = window.device.uuid
    } else {
      var uuid = ''
    }
    this.state = {
      token: window.localStorage.getItem('token'),
      uuid: uuid,
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
      pinned: false,
      liked: false,
      likes: 0,
      owner: false,
      room_id: 0,
      initSwiper: false
    };
  }


  componentWillMount() {
    MyStore.on("show_advertisement", this.getAdvertisement);
    MyStore.on("liked", this.liked);
    MyStore.on("disliked", this.disliked);
    MyStore.on("pinned", this.pinned);
    MyStore.on("unpinned", this.unpinned);
    MessageStore.on("roomLink", this.getRoom);
  }

  componentWillUnmount() {
    MyStore.removeListener("show_advertisement", this.getAdvertisement);
    MyStore.removeListener("liked", this.liked);
    MyStore.removeListener("disliked", this.disliked);
    MyStore.removeListener("pinned", this.pinned);
    MyStore.removeListener("unpinned", this.unpinned);
    MessageStore.removeListener("roomLink", this.getRoom);
  }



  componentDidMount(){
    MyActions.pinned(this.$f7route.params['advertId'], this.state.uuid, this.state.token);
    MyActions.liked(this.$f7route.params['advertId'], this.state.uuid, this.state.token);
    MyActions.getAdvertisement(this.$f7route.params['advertId'], this.state.token);
    MyActions.getUserRooms(this.$f7route.params['advertId'], this.state.token);
    document.addEventListener('backbutton', this.onBackKeyDown, false);
    const swiper = this.swiperRef.current.swiper;
    swiper.update();
  }

  onBackKeyDown() {
    const self = this;
    const app = self.$f7;
    const router = self.$f7router;
    if (router.url == '/') {
      console.log();
      router.navigate('/');
    } else {
      document.removeEventListener('backbutton', this.onBackKeyDown, false);
      router.navigate('/');
    }
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
      owner: advertisements[0].owner,
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
      current.swiper.update();
    }
    return item
  }

  pin(id){
    if (this.state.pinned){
      MyActions.unPin(id, this.state.uuid, this.state.token);
    } else {
      MyActions.makePin(id, this.state.uuid, this.state.token);
    }
  }

  like(id){
    if (this.state.liked){
      MyActions.dislike(id, this.state.uuid, this.state.token);
    } else {
      MyActions.like(id, this.state.uuid, this.state.token);
    }
  }

  liked(){
    var likes =
    this.setState({ liked: true, likes: MyStore.getLikes()})
  }

  disliked(){
    this.setState({ liked: false, likes: MyStore.getLikes()})
  }

  unpinned() {
    this.setState({ pinned: false})
  }

  pinned() {
    this.setState({ pinned: true})
  }

  getRoom(){
    console.log('getRoom');
    var room_id = MessageStore.getRoom();
    console.log(room_id);
    this.setState({ room_id: room_id })
  }

  bt(){
    if (this.state.owner) {
      return(
        <Segmented raised tag="p">
          <Button color="orange"><i class="f7-icons icon-5">bookmark</i></Button>
          <Button color="red" ><i class="f7-icons icon-5">heart</i> <span class>({this.state.likes})</span></Button>
        </Segmented>
      );
    } else {
      return(
        <Segmented raised tag="p">
          <Button color="orange" fill={this.state.pinned} onClick={() => {this.pin(this.state.id)}}><i class="f7-icons icon-5">bookmark</i> {this.state.pinned? dict.pinned : dict.pin}</Button>
          <Button color="red" fill={this.state.liked} onClick={() => {this.like(this.state.id)}}><i class="f7-icons icon-5">heart</i> <span class>({this.state.likes})</span></Button>
          <Button color="green" fill href={'/chat/'+this.state.id+'/room/'+this.state.room_id}><i class="f7-icons icon-5">email</i> {dict.message_to_seller}</Button>
        </Segmented>
      );
    }

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
          <p class='justify'>{this.state.content}</p>
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

        <Block>

          {this.bt()}

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
