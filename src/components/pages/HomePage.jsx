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
import TourPackageStore from "../../stores/TourPackageStore";
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
    this.getTourPackages = this.getTourPackages.bind(this);
    this.getUnseens = this.getUnseens.bind(this);
    this.getCategory = this.getCategory.bind(this);
    if (window.cordova){
      var uuid = window.device.uuid
    } else {
      var uuid = ''
    }
    this.state = {
      tourPackages: '',
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
    TourPackageStore.on("show_tour_packages", this.getTourPackages);
    TourPackageStore.on("load", this.getTourPackages);
    MessageStore.on("unseens", this.getUnseens);
    CategoryStore.on("show_category", this.getCategory);
  }

  componentWillUnmount() {
    TourPackageStore.removeListener("show_tour_packages", this.getTourPackages);
    TourPackageStore.removeListener("load", this.getTourPackages);
    MessageStore.removeListener("unseens", this.getUnseens);
    CategoryStore.removeListener("show_category", this.getCategory);
  }

  componentDidMount(){
    MyActions.getTourPackages(this.state);
    MyActions.getAllUnseens(this.state.token);
    if (window.cordova){
      MyActions.updateFCM(this.state.token, this.state.uuid);
    }

  }

  getCategory(){
    this.setState({
      categories: CategoryStore.getAll(),
    });
  }

  getTourPackages() {
    var tourPackages = TourPackageStore.getAll()
    if (tourPackages.length > 0){
      this.setState({
        tourPackages: tourPackages,
        noResult: false,
        showPreloader: false
      });
    } else {
      this.setState({
        tourPackages: tourPackages,
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

  createCard() {
    var length = this.state.tourPackages.length;
    var rows =  Math.floor(length/2);
    var remainder = length % 2;
    let item = []

    for (let i = 0; i < rows + 1; i++) {
      let children = []
      if ( i != rows){
        for (let j = 0; j < 2; j++) {
          var obj = this.state.tourPackages[i*2+j]
          children.push(<Col width="50" className="col-center">{<AdvertCard obj={obj}></AdvertCard>}</Col>)
        }
      } else{
        for (let j = 0; j < remainder; j++) {
          var obj = this.state.tourPackages[i*2+j]
          children.push(<Col width="50" className="col-center">{<AdvertCard obj={obj}></AdvertCard>}</Col>)
        }
      }
      item.push(<Row noGap>{children}</Row>)
    }
    return item
  }

  createItem(){
    var length = this.state.tourPackages.length;
    let items = []
    for (let i = 0; i < length; i++) {
      items.push(<ListItem
        link={'/tour_packages/' + this.state.tourPackages[i].id}
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

  getUnseens() {
    this.setState({
      unseens: MessageStore.getUnseens(),
    });
  }

  category(){
    if (this.state.categories && this.state.categories[0]){
      return(<div>
        <Link onClick={() => this.$f7router.navigate('/categories/' + this.state.categories[0].parent_id)}>
          <i class="f7-icons">chevron_right</i>
          <div class='custom-category'>{dict.back}</div>
      </Link>
        <div class='custom-category'>{dict.category}: {this.state.categories[0].title}</div>
      </div>);
    }
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
        <Block>
          {this.category()}
        </Block>
        {this.blankResult()}
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
