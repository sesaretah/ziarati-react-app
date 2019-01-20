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
  CardFooter
} from 'framework7-react';

import * as MyActions from "../../actions/MyActions";
import MyStore from "../../stores/MyStore";
import { dict} from '../Dict';


export default class AdvertCard extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    console.log(this.props.obj);
    return(
      <Link href={'/adverts/' + this.props.obj.id}>
        <Card className="demo-card-header-pic">
          <CardHeader
            className="no-border"
            valign="bottom"
            style={{ backgroundImage: "url('" + this.props.obj.cover +")" }}
            ></CardHeader>
          <CardContent>
            <p>{this.props.obj.title}</p>
          </CardContent>
        </Card>
      </Link>
    );
  }
}
