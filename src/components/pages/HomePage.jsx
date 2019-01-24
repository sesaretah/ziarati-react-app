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
import MyStore from "../../stores/MyStore";
import MessageStore from "../../stores/MessageStore";
import { dict} from '../Dict';
import AdvertCard from './AdvertCard';
import logo from  "../../images/logo.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default class HomePage extends React.Component {

  constructor() {
    super();
    this.getAdvertisements = this.getAdvertisements.bind(this);
    this.getUnseens = this.getUnseens.bind(this);
    this.onBackKeyDown = this.onBackKeyDown.bind(this);
    this.state = {
      advertisements: MyStore.getAll(),
      token: localStorage.getItem('token'),
      unseens: 0,
      query: '',
      allowInfinite: true,
      showPreloader: true,
      page: 1
    };
  }

  componentWillMount() {
    MyStore.on("change", this.getAdvertisements);
    MyStore.on("load", this.getAdvertisements);
    MessageStore.on("unseens", this.getUnseens);
  }

  componentWillUnmount() {
    MyStore.removeListener("change", this.getAdvertisements);
    MyStore.removeListener("load", this.getAdvertisements);
    MessageStore.removeListener("unseens", this.getUnseens);
  }

  componentDidMount(){
    document.addEventListener('backbutton', this.onBackKeyDown, false);
    MyActions.getAdvertisements(this.state);
    MyActions.getAllUnseens(this.state.token);
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
      router.back();
    }
  }

  getAdvertisements() {
    this.setState({
      advertisements: MyStore.getAll(),
    });
  }

  reloadAdvertisements(event, done) {
    this.setState({page: 1},  function() {
      MyActions.getAdvertisements(this.state);
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
    var length = this.state.advertisements.length;
    var rows =  Math.floor(length/2);
    var remainder = length % 2;
    let item = []

    for (let i = 0; i < rows + 1; i++) {
      let children = []
      if ( i != rows){
        for (let j = 0; j < 2; j++) {
          var obj = this.state.advertisements[i*2+j]
          children.push(<Col width="50" className="col-center">{<AdvertCard obj={obj}></AdvertCard>}</Col>)
        }
      } else{
        for (let j = 0; j < remainder; j++) {
          var obj = this.state.advertisements[i*2+j]
          children.push(<Col width="50" className="col-center">{<AdvertCard obj={obj}></AdvertCard>}</Col>)
        }
      }
      item.push(<Row noGap>{children}</Row>)
    }
    return item
  }

  createItem(){
    var length = this.state.advertisements.length;
    let items = []
    for (let i = 0; i < length; i++) {
      items.push(<ListItem swipeout
        link={'/adverts/' + this.state.advertisements[i].id}
        title={this.state.advertisements[i].title}
        after=""
        subtitle=""
        text={this.state.advertisements[i].content}
        >
        <img slot="media" src={this.state.advertisements[i].cover} width="80" />
        <span class="price">{this.state.advertisements[i].price}</span>
      </ListItem>);
    }
    return items
  }

  getUnseens() {
    this.setState({
      unseens: MessageStore.getUnseens(),
    });
  }



  render() {
    console.log(this.$f7route);
    const { advertisements } = this.state;

    const AdvertisementsComponents = function () {
      return this.createCard();
    };
    // advertisements.map((todo) => {
    //  return <ListItem title={todo.id}></ListItem>;
    //  });

    return(
      <Page colorTheme="blue" className="gray" ptr onPtrRefresh={this.reloadAdvertisements.bind(this)}
        infinite
        infiniteDistance={10}
        infinitePreloader={this.state.showPreloader}
        onInfinite={this.loadMore.bind(this)}
        >
        <Navbar>
          <NavTitle>
            <img src={logo} alt="Logo" className="logo" />
          </NavTitle>
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
        </Navbar>
        <List mediaList>
          {this.createItem()}
        </List>

        <Toolbar tabbar labels color="blue" bottomMd={true}>
          <Link href="#tab-1"><i class="f7-icons">data</i></Link>
          <Link href="/new_cam_advert/"><i class="f7-icons">add_round</i></Link>
          <Link href="/"><i class="f7-icons">home</i></Link>
          <Link href="/login/">
            <i class="icon f7-icons ios-only">
              person_round
              <span class="badge color-red">{this.state.unseens}</span>
            </i>
          </Link>
        </Toolbar>
      </Page>

    );
  }
}
