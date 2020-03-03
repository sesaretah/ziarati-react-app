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
      name: '',
      surename: '',
      ssn: '',
      fathername: '',
      place_of_birth: '',
      passport_no: '',
      en_name: '',
      en_surename: '',
      en_father_name: '',
      numberOfPassngers: 0,
      remained_capacity: 1,
    };
  }


  componentWillMount() {
    TourPackageStore.on("show_tour", this.getTour);
    TourPackageStore.on("reservation_created", this.getPassenger);
    TourPackageStore.on("reservations_verified", this.verified);

  }

  componentWillUnmount() {
    TourPackageStore.removeListener("show_tour", this.getTour);
    TourPackageStore.removeListener("reservation_created", this.getPassenger);
    TourPackageStore.removeListener("reservations_verified", this.verified);
  }



  componentDidMount(){


    if(this.state.token) {
      MyActions.getTour(this.$f7route.params['tourId']);
      MyActions.getReservations(this.$f7route.params['tourId'], this.state.token);
    } else {
      const self = this;
      const app = self.$f7;
      const router = self.$f7router;
      app.dialog.alert('برای رزرو باید وارد اپ شوید ', dict.error, () => {
        router.navigate('/login/');
      });

    }
  }

  getPassenger(){
    var passengers = TourPackageStore.getPassenger();
    var remained_capacity = TourPackageStore.getRemainedCapacity();
    console.log('passenger_remained');
    this.setState({
      passengers: passengers,
      remained_capacity: remained_capacity
    });
    this.setState({
      name: '',
      surename: '',
      ssn: '',
      fathername: '',
      place_of_birth: '',
      passport_no: '',
      en_name: '',
      en_surename: '',
      en_father_name: '',
    });
  }


  getTour() {
    var tours = TourPackageStore.getTours();
    console.log('reservation_tour', tours);
    this.setState({
      tours: tours[0],
      remained_capacity: tours[0][0].remained_capacity,
      passengers: [],
      initSwiper: true
    });

    const self = this;
    const app = self.$f7;
    //var now = new window.Date();
    //var today = new window.Date(now.getFullYear(), now.getMonth(), now.getDate());
    app.calendar.create({
      inputEl: '#demo-calendar-default',
      closeOnSelect : true,
      /*  events: [      {
      date: today,
      color: '#ff0000'
      },],*/
      firstDay : 6,
      weekendDays : [4, 5],
      monthNames : ['فروردين', 'ارديبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
      dayNames : ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'],
      dayNamesShort : ['یک', 'دو', 'سه ', 'چهار', 'پنج‌', 'جمعه', 'شنبه']
    });
  }

  deleteReservation(passenger_id, tour_id){
    MyActions.deleteReservation(passenger_id, tour_id, this.state.token);
  }

  passengers(){
    if(this.state.tours[0]) {
      var items = []
      for (let i = 0; i < this.state.passengers.length; i++) {
        items.push(
          <tr>
            <td><Button fill color="red" onClick={() => {if (window.confirm('آیا مطمئن هستید؟ ')) this.deleteReservation(this.state.passengers[i].id, this.state.tours[0].id)}}>{dict.delete}</Button></td>
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
      console.log(this.state.tours[0]);
      if(this.state.tours[0]) {
        MyActions.verfiyReservation(this.state.tours[0].id, this.state.token);
      }
    }

    tourRemainder(){
      if(this.state.tours[0]) {
        if(this.state.tours[0].remained_capacity < 5){
          return(<span class="badge color-orange">{dict.remained_capacity} <b>{this.state.remained_capacity}</b> {dict.person}</span>)
        }
      }
    }

    verified(){
      if(this.state.tours[0]) {
      const self = this;
      const router = self.$f7router;
      router.navigate('/verified_reservation/'+this.state.tours[0].id);
    }
    }

    submitButton(){
      if(this.state.tours[0]) {
        if(this.state.remained_capacity > 0){
            return(<Button raised big fill  onClick={this.submit.bind(this)}>{dict.submit}</Button>)
        }
      }
    }

    passengerForm(){
      console.log(this.state.remained_capacity);
      if(this.state.tours[0]) {
        if(this.state.remained_capacity > 0){
      return(
        <List form  className="pr-20 pb-10" >

          <ListInput
            label={dict.name}
            type="text"
            maxlength="70"
            placeholder= {dict.title_content}
            value={this.state.name}
            onInput={(e) => {
              this.setState({ name: e.target.value});
            }}
            />

          <ListInput
            label={dict.surename}
            type="text"
            maxlength="70"
            placeholder= {dict.title_content}
            value={this.state.surename}
            onInput={(e) => {
              this.setState({ surename: e.target.value});
            }}
            />

          <ListInput
            label={dict.ssn}
            type="text"
            maxlength="70"
            placeholder= {dict.title_content}
            value={this.state.ssn}
            onInput={(e) => {
              this.setState({ ssn: e.target.value});
            }}
            />

          { (this.state.tours[0] && this.state.tours[0].tour_package.father_name_field) ?
            <ListInput
              label={dict.fathername}
              type="text"
              maxlength="70"
              placeholder= {dict.title_content}
              value={this.state.fathername}
              onInput={(e) => {
                this.setState({ fathername: e.target.value});
              }}
              />: null
            }




            { (this.state.tours[0] && this.state.tours[0].tour_package.birthdate_field) ?
              <li class="mt-5">
                <span className="custom-label ">{dict.birthdate}</span>
              </li>: null
            }
            { (this.state.tours[0] && this.state.tours[0].tour_package.birthdate_field) ?
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-input-wrap">
                      <input type="text" placeholder="" readonly="readonly" id="demo-calendar-default"/>
                    </div>
                  </div>
                </div>
              </li>: null
            }

            { (this.state.tours[0] && this.state.tours[0].tour_package.place_of_birth_field) ?
              <ListInput
                label={dict.place_of_birth}
                type="text"
                maxlength="70"
                placeholder= {dict.title_content}
                value={this.state.place_of_birth}
                onInput={(e) => {
                  this.setState({ place_of_birth: e.target.value});
                }}
                />: null
              }

              { (this.state.tours[0] && this.state.tours[0].tour_package.passport_no_field) ?
                <ListInput
                  label={dict.passport_no}
                  type="text"
                  maxlength="70"
                  placeholder= {dict.title_content}
                  value={this.state.passport_no}
                  onInput={(e) => {
                    this.setState({ passport_no: e.target.value});
                  }}
                  />: null
                }

                { (this.state.tours[0] && this.state.tours[0].tour_package.en_name_field) ?
                  <ListInput
                    label={dict.en_name}
                    type="text"
                    maxlength="70"
                    placeholder= {dict.title_content}
                    value={this.state.en_name}
                    onInput={(e) => {
                      this.setState({ en_name: e.target.value});
                    }}
                    />: null
                  }

                  { (this.state.tours[0] && this.state.tours[0].tour_package.en_surename_field) ?
                    <ListInput
                      label={dict.en_surename}
                      type="text"
                      maxlength="70"
                      placeholder= {dict.title_content}
                      value={this.state.en_surename}
                      onInput={(e) => {
                        this.setState({ en_surename: e.target.value});
                      }}
                      />: null
                    }
                    { (this.state.tours[0] && this.state.tours[0].tour_package.en_father_name_field) ?
                      <ListInput
                        label={dict.en_father_name}
                        type="text"
                        maxlength="70"
                        placeholder= {dict.title_content}
                        value={this.state.en_father_name}
                        onInput={(e) => {
                          this.setState({ en_father_name: e.target.value});
                        }}
                        />: null
                      }
                      <li>
                        <div class="item-content item-input mh-30">
                        </div>
                      </li>
                    </List>
                  );
                }
              }
                }

                submit(){
                  MyActions.createReservation(this.state);
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
                      {this.tourRemainder()}
                      </Block>

                      {this.passengerForm()}


                      <Block>
                        <Row>
                          <Col></Col>
                          <Col>{this.submitButton()}</Col>
                          <Col></Col>
                        </Row>
                      </Block>


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

                      <Block>
                        <Button fill big color="green" onClick={this.confirm.bind(this)}>{dict.final_confirm}</Button>
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
