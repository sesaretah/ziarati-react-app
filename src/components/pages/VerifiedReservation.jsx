import React, { Component } from 'react';
import { Page, Navbar, Block, Link, Toolbar, Swiper, SwiperSlide, NavTitle, BlockTitle, List, ListItem, Segmented, Button, ListInput, Row, Col} from 'framework7-react';

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
    this.getTour = this.getTour.bind(this);
    this.getPassenger = this.getPassenger.bind(this);
    this.verified = this.verified.bind(this);

    if (window.cordova){
      var uuid = window.device.uuid
    } else {
      var uuid = ''
    }
    this.state = {
      token: window.localStorage.getItem('token'),
      uuid: uuid,
      tours: [],
      passengers: [],
      numberOfPassngers: 0
    };
  }


  componentWillMount() {
    TourPackageStore.on("show_tour", this.getTour);
    TourPackageStore.on("reservation_created", this.getPassenger);
  }

  componentWillUnmount() {
    TourPackageStore.removeListener("show_tour", this.getTour);
    TourPackageStore.removeListener("reservation_created", this.getPassenger);
  }



  componentDidMount(){
    MyActions.getTour(this.$f7route.params['tourId']);
    MyActions.getVerifiedReservations(this.$f7route.params['tourId'], this.state.token);
  }

  getPassenger(){
    var passengers = TourPackageStore.getPassenger();
    this.setState({
      passengers: passengers
    });
  }


  getTour() {
    var tours = TourPackageStore.getTours();
    this.setState({
      tours: tours[0]
    });
  }

  passengers(){
    if(this.state.passengers[0]) {
      var items = []
      for (let i = 0; i < this.state.passengers.length; i++) {
        items.push(
          <tr>
            <td>{i+1}</td>
            <td>
              {this.state.passengers[i].name}
            </td>
            <td>
              {this.state.passengers[i].surename}
            </td>
            <td>
              {this.state.passengers[i].ssn}
            </td>
          </tr>)
        }
        return(items)
      }
    }

    confirm(){
      if(this.state.tours[0]) {
        MyActions.verfiyReservation(this.state.tours[0].id, this.state.token);
      }
    }

    verified(){
      if(this.state.tours[0]) {
        const self = this;
        const router = self.$f7router;
        router.navigate('/VerifiedReservation/'+this.state.tours[0].id);
      }
    }

    tourPackageDetail() {
      if (this.state.tours[0]) {
      return(this.state.tours[0].title);
      }
    }


    accomodationDetails(accomodations){
      var items = []
      for (let j = 0; j < accomodations.length; j++) {
        items.push(<div><span>{accomodations[j].name}</span><br /><span class="text-muted">{accomodations[j].stars} {dict.stars}</span></div>);
      }
      return(items);
    }


    tourDeatils(){
      if(this.state.tours) {
        var items = []
        for (let i = 0; i < this.state.tours.length; i++) {
          items.push(
            <tr>
              <td>
                {this.state.tours[i].departure}<br />
              <span class="text-muted">{this.state.tours[i].departure_carrier}</span>
            </td>
            <td>
              {this.state.tours[i].arrival}<br />
            <span class="text-muted">{this.state.tours[i].arrival_carrier}</span>
          </td>
          <td>{this.state.tours[i].price}</td>
          <td>
            {this.accomodationDetails(this.state.tours[i].accomodations)}
          </td>

        </tr>)
      }
      return(items)
    }
  }

    submit(){
      MyActions.createReservation(this.state);
    }

    render() {
      return (
        <Page colorTheme="blue" className="gray">
          <Navbar>
            <Link href='/my_reservations/'>
              <i class="f7-icons color-white">chevron_right</i>
              <div class='custom-category color-white'>{dict.back}</div>
            </Link>
            <NavTitle>
              <img src={logo} alt="Logo" className="logo" />
            </NavTitle>
          </Navbar>

            <div class="block-title">{dict.tour_package}</div>
            <div class="block block-strong">
              <h4>{this.tourPackageDetail()}</h4>
            </div>

            <div class="data-table card">
              <table>
                <thead>
                  <tr>
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

          <Block>
            <div class="data-table card">
              <table>
                <thead>
                  <tr>
                    <td></td>
                    <td>{dict.name}</td>
                    <td>{dict.surename}</td>
                    <td>{dict.ssn}</td>
                  </tr>
                </thead>
                <tbody>
                  {this.passengers()}
                </tbody>
              </table>
            </div>
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
