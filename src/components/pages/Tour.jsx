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

export default class Tour extends Component {
  constructor() {
    super();
    this.getTour = this.getTour.bind(this);
    this.accomodationDetails = this.accomodationDetails.bind(this);
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
      price: dict.call,
      mobile: '',
      initSwiper: false
    };
  }


  componentWillMount() {
    TourPackageStore.on("show_tour", this.getTour);
    MyStore.on("liked", this.liked);
    MyStore.on("disliked", this.disliked);
    MyStore.on("pinned", this.pinned);
    MyStore.on("unpinned", this.unpinned);
    MessageStore.on("roomLink", this.getRoom);
  }

  componentWillUnmount() {
    TourPackageStore.removeListener("show_tour", this.getTour);
    MyStore.removeListener("liked", this.liked);
    MyStore.removeListener("disliked", this.disliked);
    MyStore.removeListener("pinned", this.pinned);
    MyStore.removeListener("unpinned", this.unpinned);
    MessageStore.removeListener("roomLink", this.getRoom);
  }



  componentDidMount(){
    MyActions.pinned(this.$f7route.params['advertId'], this.state.uuid, this.state.token);
    MyActions.liked(this.$f7route.params['advertId'], this.state.uuid, this.state.token);
    MyActions.getTour(this.$f7route.params['tourId']);
    //MyActions.getUserRooms(this.$f7route.params['advertId'], this.state.token);
    const swiper = this.swiperRef.current.swiper;
    swiper.update();
  }


  getTour() {
    var tours = TourPackageStore.getTours();
    console.log('tours', tours);
    this.setState({
      tours: tours[0],
      initSwiper: true
    });
  }

  createSwipe() {
    if (this.state.tours[0]) {
    var length = this.state.tours[0].photos.length;
    var item = []
    for (let i = 0; i < length; i++) {
      var photo = this.state.tours[0].photos[i]
      item.push(<SwiperSlide key={photo.id}><img src={photo.url}></img></SwiperSlide>)
    }
    const current = this.swiperRef.current;
    if (current != null){
      current.swiper.update();
    }
    return item
  }
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

  accomodationDetails(){
    var items = []
    if (this.state.tours[0]) {
      for (let j = 0; j < this.state.tours[0].accomodations.length; j++) {
        items.push(
          <tr>
            <td>{this.state.tours[0].accomodations[j].name}</td>
            <td>{this.state.tours[0].accomodations[j].stars}</td>
            <td>{this.state.tours[0].accomodations[j].city}</td>
            <td>{this.state.tours[0].accomodations[j].city}</td>
          </tr>);
        }
        return(items);
      }
    }
    tourPackageDetail() {
      if (this.state.tours[0]) {
      return(this.state.tours[0].title);
      }
    }
    tourDetail() {
      if (this.state.tours[0]) {
      return(this.state.tours[0].details);
      }
    }
    departureDate(){
      if (this.state.tours[0]) {
      return(this.state.tours[0].departure);
      }
    }

    arrivalDate(){
      if (this.state.tours[0]) {
      return(this.state.tours[0].arrival);
      }
    }

    reservationButton(){
      if (this.state.tours[0]) {
        if (this.state.tours[0].remained_capacity > 0) {
          return(<Button raised big fill color="green" href={this.link()} >{dict.reservation}</Button>)
        }

      }
    }

    priceDetails(){
      var items = []
      if (this.state.tours[0]) {
        for (let j = 0; j < this.state.tours[0].pricings.length; j++) {
          items.push(
            <tr>
              <td>{this.state.tours[0].pricings[j].title}</td>
              <td>{this.state.tours[0].pricings[j].value}</td>
            </tr>);
          }
          return(items);
        }
    }

    tourDeatils(){
      if(this.state.tours) {
        var items = []
        for (let i = 0; i < this.state.tours.length; i++) {
          items.push(
            <tr>
              <td><Button  href='/' fill color="green">{dict.view}</Button></td>
              <td>
                {this.state.tours[i].departure}<br />
              <span class="text-muted">{this.state.tours[i].departure_carrier}</span>
            </td>
            <td>
              {this.state.tours[i].arrival}<br />
            <span class="text-muted">{this.state.tours[i].arrival_carrier}</span>
          </td>
          <td></td>
          <td>
            {this.accomodationDetails(this.state.tours[i].accomodations)}
          </td>

        </tr>)
      }
      return(items)
    }
  }

  transportationDetails(){
    var items = []
    if (this.state.tours[0]) {
      for (let j = 0; j < this.state.tours[0].transportations.length; j++) {
        items.push(
          <tr>
            <td>{this.state.tours[0].transportations[j].type}</td>
            <td>{this.state.tours[0].transportations[j].name}</td>
            <td>{this.state.tours[0].transportations[j].leg}</td>
            <td></td>
            <td></td>
          </tr>);
        }
        return(items);
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
          <span class="price text-muted"><Moment fromNow ago>{this.state.tourPackages[i].updated_at}</Moment> {dict.ago}</span>
        </ListItem>);
      }
      return items
    }

    link(){
      if (this.state.tours[0]) {
      return('/reservation/' + this.state.tours[0].id);
      }
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

          <Block>
            <Swiper ref={this.swiperRef} pagination navigation scrollbar params={{observer: true, observeParents: true}}>
              {this.createSwipe()}
            </Swiper>
          </Block>


          <div class="block-title">{dict.tour_package}</div>
          <div class="block block-strong">
            <h4>{this.tourPackageDetail()}</h4>
          </div>

          <div class="block-title">{dict.tour_detail}</div>
          <div class="block block-strong">
            <h4>{this.tourDetail()}</h4>
          </div>

          <div class="block-title">{dict.departure}</div>
          <div class="block block-strong">
            <h3>{this.departureDate()}</h3>
          </div>

          <div class="block-title">{dict.arrival}</div>
            <div class="block block-strong">
              <h3>{this.arrivalDate()}</h3>
            </div>

            <div class="block-title">{dict.pricings}</div>
            <div class="data-table card">
              <table>
                <thead>
                  <tr>
                    <td>{dict.title}</td>
                    <td>{dict.price}</td>
                  </tr>
                </thead>
                <tbody>
                  {this.priceDetails()}
                </tbody>
              </table>
            </div>

          <div class="block-title">{dict.accomodation}</div>
          <div class="data-table card">
            <table>
              <thead>
                <tr>
                  <td>{dict.hotel_name}</td>
                  <td>{dict.stars}</td>
                  <td>{dict.city}</td>
                  <td>{dict.duration}</td>
                </tr>
              </thead>
              <tbody>
                {this.accomodationDetails()}
              </tbody>
            </table>
          </div>

          <div class="block-title">{dict.transportation}</div>
          <div class="data-table card">
            <table>
              <thead>
                <tr>
                  <td>{dict.transportation_type}</td>
                  <td>{dict.company}</td>
                  <td>{dict.leg}</td>
                  <td>{dict.date}</td>
                  <td>{dict.time}</td>
                </tr>
              </thead>
              <tbody>
                {this.transportationDetails()}
              </tbody>
            </table>
          </div>

          <Block>
            {this.reservationButton()}
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
