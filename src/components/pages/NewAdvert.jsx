import React, { Component } from 'react';
import { Page, Navbar, Block, Link, Toolbar, Swiper, SwiperSlide, BlockTitle, List, ListInput, Row, Button, Col } from 'framework7-react';

import * as MyActions from "../../actions/MyActions";
import MyStore from "../../stores/MyStore";
import { dict} from '../Dict';
import AdvertCard from './AdvertCard';
import logo from  "../../images/logo.png";
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const src = 'img/child.jpg';

export default class AdvertShow extends Component {

  constructor() {
    super();
    this.state = {
      src: [],
      cropResult: null,
    };
    this.cropImage = this.cropImage.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {

    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {

      files = e.target.files;
    }
    if (files[0].type == "image/jpeg" || files[0].type == "image/jpg" || files[0].type == "image/png"){
      const reader = new FileReader();
      reader.onload = () => {
        this.setState({ src: this.state.src.concat(reader.result) });
      };
      reader.readAsDataURL(files[0]);
    } else {
      alert('File type not accepted');
    }

  }

  cropImage() {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL(),
    });
  }

  submit(){

  }

  render() {
    return (
      <Page colorTheme="blue" className="gray" pageContent>
        <Navbar title={dict.back} backLink="Back" />

        <BlockTitle>{dict.new_advert}</BlockTitle>
        <List form>
          <ListInput
            label=""
            type="text"
            placeholder={dict.title}
            value={this.state.title}
            onInput={(e) => {
              this.setState({ title: e.target.value});
            }}
            />
          <ListInput
            label=""
            type="textarea"
            placeholder={dict.content}
            value={this.state.content}
            onInput={(e) => {
              this.setState({ content: e.target.value});
            }}
            />

          <Row>
            <Col width="33">
              <div class="image-upload">
                <label for="file-input">
                  {dict.upload} <i class="f7-icons icon-3">camera</i>
              </label>
              <input id="file-input" type="file"  onChange={this.onChange}/>
            </div>
          </Col>
        </Row>


        <div style={{ width: '100%' }}>
          <Cropper
            style={{ height: 200, width: '100%' }}
            aspectRatio={4 / 3}
            preview=".img-preview"
            guides={false}
            src={this.state.src}
            ref={cropper => { this.cropper = cropper; }}
            />
        </div>
      </List>

      <List>
        <Button raised big fill  onClick={this.submit.bind(this)}>{dict.submit}</Button>
      </List>


      <Toolbar tabbar labels color="blue" bottomMd={true}>

        <Link href="#tab-1"><i class="f7-icons">data</i></Link>
        <Link href="/"><i class="f7-icons">home</i></Link>
        <Link href="/login/"><i class="f7-icons">person_round</i></Link>
      </Toolbar>
    </Page>
  );
}
}
