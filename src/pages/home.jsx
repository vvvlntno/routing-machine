import React from 'react';
import Information from '../components/information';
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavRight,
  Link
} from 'framework7-react';

const HomePage = () => (
  <Page name="home" id="information">
    <Navbar middle sliding={false}>
      <NavLeft>
        <NavTitle>location-based-service</NavTitle>
      </NavLeft>
      <NavRight>
        <Link iconIos="f7:help" iconAurora="f7:help" iconMd="material:help" panelOpen="right" />
      </NavRight>
    </Navbar>
    <Information/>
  </Page>
);
export default HomePage;