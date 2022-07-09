import React from 'react';
import { Page, Navbar, Block, BlockTitle } from 'framework7-react';

const AboutPage = () => (
  <Page>
    <Navbar title="About this Application"/>
    <BlockTitle>How to use</BlockTitle>
    <Block strong>
      <p>Es gibt zwei Wege diesen "Location-based-service" zu benutzen.</p>
      <p>Zum einen können sie je nach belieben auf die Karte klicken und dann auswählen was sie an diesem Punkt unternehmen wollen. Sie können die Navigation von dort beginnen oder dort enden lassen.</p>
      <p>Zum anderen können Sie auch eine genaue Adresse in die Suchfelder eingeben. Außerdem können Sie einen zwischenstopp hinzufügen sobald sie auf das Plus in der Routenbeschreibung klicken.</p>
      <p>Falls Sie die Karte auf ihre Position zurück bewegen möchten klicken Sie einfach auf die Karte und dann auf Centralize.</p>
    </Block>
    {/* <BlockTitle>Information</BlockTitle>
    <Block strong>
      <p>TBD</p>
    </Block> */}
  </Page>
);

export default AboutPage;
