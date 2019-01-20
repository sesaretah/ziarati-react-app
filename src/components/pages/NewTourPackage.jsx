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
import Dropzone from "react-dropzone";
import request from "superagent";

import * as MyActions from "../../actions/MyActions";
import MyStore from "../../stores/MyStore";

import { dict} from '../Dict';
export default class NewTourPackage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      days: '',
      nights: '',
      details: '',
      files: []
    };
  }

  onDrop = (files) => {
    // POST to a test endpoint for demo purposes
    const req = request.post('https://httpbin.org/post');
    files.forEach(file => {
      console.log(file);
      req.attach(file.name, file);
    });
    req.end();
  }


  onCancel() {
    this.setState({
      files: []
    });
  }


  handleSubmit(event) {
    const self = this;
    const app = self.$f7;
    const router = self.$f7router;
    MyActions.createTourPackage(this.state);
    router.back();
  }

  render() {
    const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ))
    return(
      <Page>
        <Navbar title="Form" backLink="Back" />
        <BlockTitle>Form Example</BlockTitle>
        <List form>
          <ListInput
            label="Title"
            type="text"
            placeholder="Title"
            value={this.state.title}
            onInput={(e) => {
              this.setState({ title: e.target.value});
            }}
            />
          <ListInput
            label="days"
            type="text"
            placeholder="Days"
            value={this.state.days}
            onInput={(e) => {
              this.setState({ days: e.target.value});
            }}
            />
          <ListInput
            label="nights"
            type="text"
            placeholder="Nights"
            value={this.state.nights}
            onInput={(e) => {
              this.setState({ nights: e.target.value});
            }}
            />
          <ListInput
            label="details"
            type="text"
            placeholder="details"
            value={this.state.details}
            onInput={(e) => {
              this.setState({ details: e.target.value});
            }}
            />

          <section>
            <Dropzone
              onDrop={this.onDrop.bind(this)}
              onFileDialogCancel={this.onCancel.bind(this)}
              >
              {({getRootProps, getInputProps}) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drop files here, or click to select files</p>
                </div>
              )}
            </Dropzone>
            <aside>
              <h4>Files</h4>
              <ul>{files}</ul>
            </aside>
          </section>
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
