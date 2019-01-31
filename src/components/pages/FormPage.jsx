import React from 'react';
import {
  Page,
  Navbar,
  List,
  ListItem,
  ListInput,
  Input,
  Label,
  Toggle,
  BlockTitle,
  Row,
  Button,
  Range,
  Block
} from 'framework7-react';
import * as MyActions from "../../actions/MyActions";
import MyStore from "../../stores/MyStore";

import { dict} from '../Dict';
export default class FormPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      subdomain: ''
    };
  }

  handleSubmit(event) {
    console.log(this.state);
    //MyActions.createAgency(this.state);
  }

  render() {
    return(
      <Page>
        <Navbar title="Form" backLink="Back" />
        <BlockTitle>Form Example</BlockTitle>
        <List form>
          <ListInput
            label="Name"
            type="text"
            placeholder="Your username"
            value={this.state.username}
            onInput={(e) => {
              this.setState({ name: e.target.value});
            }}
            />
            <ListInput
              label="subdomain"
              type="text"
              placeholder="subdomain"
              value={this.state.subdomain}
              onInput={(e) => {
                this.setState({ subdomain: e.target.value});
              }}
              />

          <Block strong>
            <Row tag="p">
              <Button className="col" big fill raised color="green" onClick={this.handleSubmit.bind(this)}>Big Red</Button>
            </Row>
          </Block>
        </List>


      </Page>
    );
  }
}
