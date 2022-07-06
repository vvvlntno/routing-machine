import React, { useState }from 'react';
import MyMap from '../components/map';
import Information from '../components/information';
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavTitleLarge,
  NavRight,
  Link,
  Toolbar,
  Block,
  BlockTitle,
  List,
  ListItem,
  Row,
  Col,
  Button
} from 'framework7-react';

// function handleCallback(childData) {
//   setState({data: childData})
// }


const HomePage = () => (
  <Page name="home">
    {/* Top Navbar */}
    <Navbar large sliding={false}>
      <NavTitle sliding>location-based-service</NavTitle>
      <NavRight>
        <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="right" />
      </NavRight>
      <NavTitleLarge>Reverse Geo Coding Maps</NavTitleLarge>
    </Navbar>
    {/* <MyMap/> */}
    <Information/>
  </Page>
);
export default HomePage;