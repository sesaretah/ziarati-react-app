import React from 'react';
import {
  App,
  Panel,
  View,
  Statusbar,
  Popup,
  Page,
  Navbar,
  NavRight,
  Link,
  Block,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListInput,
  ListItem,
  Label,
  Input,
  ListButton,
  BlockFooter,
  Icon
} from 'framework7-react';

import routes from '../routes';


export default function (props) {

  // Framework7 parameters here
  const f7params = {
    id: 'io.framework7.testapp', // App bundle ID
    name: 'Framework7', // App name
    theme: 'ios', // Automatic theme detection
    // App routes
    routes,
  };

  return (
    <App params={f7params}>
      {/* Statusbar */}
      <Statusbar />

      {/* Right Panel */}
      <Panel right reveal colorTheme="green">
        <View url="/panel-right/"/>
      </Panel>


      {/* Main View */}
      <View id="main-view" url="/" main className="ios-edges"/>

    </App>
  );
};
