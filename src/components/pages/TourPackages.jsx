import React, { Component } from 'react';
import { Page, Navbar, Block, Link, Toolbar, Swiper, SwiperSlide, NavTitle, BlockTitle, List, ListItem, Segmented, Button} from 'framework7-react';

import * as MyActions from "../../actions/MyActions";
import MyStore from "../../stores/MyStore";
import TourPackageStore from "../../stores/TourPackageStore";
import MessageStore from "../../stores/MessageStore";
import { dict} from '../Dict';
import AdvertCard from './AdvertCard';
import logo from  "../../images/logo.png";
import Moment from 'react-moment';
import 'moment-timezone';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class TourPackages extends Component {
  constructor() {
    super();
    this.getTourPackage = this.getTourPackage.bind(this);
    this.pinned = this.pinned.bind(this);
    this.unpinned = this.unpinned.bind(this);
    this.liked = this.liked.bind(this);
    this.disliked = this.disliked.bind(this);
    this.getRoom = this.getRoom.bind(this);
    this.swiperRef = React.createRef();
    if (window.cordova){
      var uuid = window.device.uuid
    } else {
      var uuid = ''
    }
    this.state = {
      token: window.localStorage.getItem('token'),
      uuid: uuid,
      tourPackages: [],
      tours: [],
      pinned: false,
      liked: false,
      likes: 0,
      owner: false,
      room_id: 0,
      mobile: '',
      initSwiper: false
    };
  }


  componentWillMount() {
    TourPackageStore.on("show_tour_package", this.getTourPackage);
    MyStore.on("liked", this.liked);
    MyStore.on("disliked", this.disliked);
    MyStore.on("pinned", this.pinned);
    MyStore.on("unpinned", this.unpinned);
    MessageStore.on("roomLink", this.getRoom);
  }

  componentWillUnmount() {
    TourPackageStore.removeListener("show_tour_package", this.getTourPackage);
    MyStore.removeListener("liked", this.liked);
    MyStore.removeListener("disliked", this.disliked);
    MyStore.removeListener("pinned", this.pinned);
    MyStore.removeListener("unpinned", this.unpinned);
    MessageStore.removeListener("roomLink", this.getRoom);
  }



  componentDidMount(){
    MyActions.pinned(this.$f7route.params['advertId'], this.state.uuid, this.state.token);
    MyActions.liked(this.$f7route.params['advertId'], this.state.uuid, this.state.token);
    MyActions.getTourPackage(this.$f7route.params['tourPackageId']);
    //MyActions.getUserRooms(this.$f7route.params['advertId'], this.state.token);
    //const swiper = this.swiperRef.current.swiper;
    //swiper.update();
  }


  getTourPackage() {
    var tourPackages = TourPackageStore.getAll();
    var tours = TourPackageStore.getTours();
    console.log(tours);
    this.setState({
      tourPackages: tourPackages,
      tours: tours[0],
      initSwiper: true
    });
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
    var room_id = MessageStore.getRoom();
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

  accomodationDetails(accomodations){
    var items = []
    for (let j = 0; j < accomodations.length; j++) {
      items.push(<div><span>{accomodations[j].name}</span><br /><span class="text-muted"><div class='nowrp'>{accomodations[j].stars} {dict.stars}</div></span></div>);
    }
    return(items);
  }

  tourDeatils(){
    if(this.state.tours) {
      var items = []
      for (let i = 0; i < this.state.tours.length; i++) {
        items.push(
          <tr>
            <td><Button  href={'/tour/'+this.state.tours[i].id} fill color="green">{dict.view}</Button></td>
            <td>
              {this.state.tours[i].departure}<br />
            <span class="text-muted"><div class='nowrp'>{this.state.tours[i].departure_carrier}</div></span>
          </td>
          <td>
            {this.state.tours[i].arrival}<br />
          <span class="text-muted"><div class='nowrp'>{this.state.tours[i].arrival_carrier}</div></span>
        </td>
        <td><div class='nowrp'>{this.state.tours[i].price}</div></td>
        <td>
          {this.accomodationDetails(this.state.tours[i].accomodations)}
        </td>

      </tr>)
    }
    return(items)
  }
}

createItem(){
  var length = this.state.tourPackages.length;
  let items = []
  for (let i = 0; i < length; i++) {
    items.push(<ListItem
      title={this.state.tourPackages[i].title}
      after=""
      subtitle=""
      text={this.state.tourPackages[i].content}
      >
      <img slot="media" src={this.state.tourPackages[i].cover} width="80" />
      <span class="price text-muted"></span>
    </ListItem>);
  }
  return items
}


render() {
  return (
    <Page colorTheme="blue" className="gray">
      <Navbar>
          <Link href='/'>
            <i class="f7-icons color-white">chevron_right</i>
            <div class='custom-category color-white'>{dict.back}</div>
          </Link>
        <NavTitle>
          <img src={logo} alt="Logo" className="logo" />
        </NavTitle>
      </Navbar>

      <List mediaList>
        {this.createItem()}
      </List>

      <div class="data-table card">
        <table>
          <thead>
            <tr>
              <td></td>
              <td>{dict.departure}</td>
              <td>{dict.arrival}</td>
              <td>{dict.price_range}</td>
              <td>{dict.accomodation}</td>
            </tr>
          </thead>
          <tbody>
            {this.tourDeatils()}
          </tbody>
        </table>
      </div>


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
