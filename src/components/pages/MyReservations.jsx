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
  ListButton,
  Segmented
} from 'framework7-react';

import * as MyActions from "../../actions/MyActions";
import TourPackageStore from "../../stores/TourPackageStore";
import { dict} from '../Dict';
import logo from  "../../images/logo.png";

export default class MyReservations extends React.Component {
  constructor(props) {
    super(props);
    this.getTour = this.getTour.bind(this);
    this.state = {
      token: localStorage.getItem('token'),
      tours: [],
      tour_packages: []
    };
  }

  componentWillMount() {
    TourPackageStore.on("my_reservations", this.getTour);
  }

  componentWillUnmount() {
    TourPackageStore.removeListener("my_reservations", this.getTour);
  }

  componentDidMount(){
    MyActions.getMyReservations(this.state.token);
  }


  getTour(){
    var tours = TourPackageStore.getTours();
    var tour_packages = TourPackageStore.getAll();
    console.log(tours);
    this.setState({
      tours: tours,
      tour_packages: tour_packages
    });
  }

  createItem(){
    var length = this.state.tours.length;
    let items = []
    for (let i = 0; i < length; i++) {
      items.push(<ListItem
        link={'/verified_reservation/' + this.state.tours[i].id}
        title={this.state.tour_packages[i].title+ ' (' + this.state.tours[i].arrival + '-'+ this.state.tours[i].departure + ')'}
        after=""
        subtitle=""
        text=""
        >
      </ListItem>);
    }
    return items
  }

  render() {
    return (
      <Page >
        <Navbar>
          <Link href='/login/'><i class="f7-icons color-white">chevron_right</i>
          <div class='custom-category color-white'>{dict.back}</div>
        </Link>
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
  )
}

}
