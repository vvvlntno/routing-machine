import React, { useState } from 'react';
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

const HomePage = () => (
  <Page name="home">
    {/* Top Navbar */}
    <Navbar middle sliding={false}>
      {/* <NavTitle sliding>location-based-service</NavTitle> */}
      <NavLeft>
        <NavTitle>location-based-service</NavTitle>
      </NavLeft>
      <NavRight>
        <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="right" />
      </NavRight>
      {/* <NavTitleLarge>Reverse Geo Coding Maps</NavTitleLarge> */}
    </Navbar>
    <Information/>
  </Page>
);
export default HomePage;