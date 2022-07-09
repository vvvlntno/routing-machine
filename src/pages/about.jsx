import React from 'react';
import { Page, Navbar, Block, BlockTitle } from 'framework7-react';

const AboutPage = () => (
  <Page>
    <Navbar title="About this Application"/>
    <BlockTitle>Über diese App</BlockTitle>
    <Block strong>
      <p>Dies ist eine Navigations-Progressive-Web-Applikation, mit der Sie durch die Welt navigieren können.</p>
      <p>Es gibt verschiedene Möglichkeiten wie Sie dies machen können. Diese werden im Folgenden beschrieben mit weiteren neuen Informationen.</p>
    </Block>
    <BlockTitle>On Click</BlockTitle>
    <Block strong>
      <p>Sobald Sie auf die Karte drücken, sehen Sie 4 verschiedene Funktionen. Die ersten zwei sind für die Wegfindung interessant.</p>
      <p>Wenn Sie auf den ersten Knopf (Beginn der Route) klicken wird der Start der Route auf die Position gesetzt, auf die Sie geklickt haben.</p>
      <p>Wenn Sie auf den zweiten Knopf (Ziel der Route) klicken wird das Ziel der Route auf die Position gesetzt, auf die Sie geklickt haben.</p>
    </Block>
    <BlockTitle>Search Bar</BlockTitle>
    <Block strong>
      <p>Ebenfalls ist es möglich die Adresse direkt in die Suchfelder des Navigators einzutragen. Dies ermöglicht Ihnen eine genauere Eingabe durch eine Adresse.</p>
      <p>Bei dieser Funktion werden keine Informationen über das Ziel der Route unterhalb der Karte geladen.</p>
    </Block>
    <BlockTitle>Navigator</BlockTitle>
    <Block strong>
      <p>Der Navigator ist ein Objekt, mit dem Sie ihre Route anschauen und verfolgen können. Er bietet ebenfalls kleine Icons, auf denen Sie erkennen können in welche Richtung es als nächstes geht.</p>
      <p>Sie können den Navigator öffnen und schließen, je nach belieben dafür drücken Sie einfach auf das schwarze Kreuz oder auf das Icon des Navigators.</p>
    </Block>
    <BlockTitle>Zentrieren</BlockTitle>
    <Block strong>
      <p>Falls Sie die Geolocation aktiviert haben können Sie sich diese Funktion zu nutzen machen.</p>
      <p>Wenn Sie auf die Karte klicken und danach den dritten Knopf (Zentrieren) klicken wird die Karte an ihre aktuelle Position gebracht.</p>
    </Block>
    <BlockTitle>Zufälliger Ort</BlockTitle>
    <Block strong>
      <p>Dies ist eine Funktion, die Sie aus Lust und Laune ausprobieren können.</p>
      <p>Nachdem Sie auf die Karte geklickt haben und danach auf den vierten Knopf (Zufälliger Ort) geklickt haben, wird die Karte an einen Zufälligen Ort gebracht.</p>
    </Block>
    <BlockTitle>Über den Entwickler</BlockTitle>
    <Block strong>
      <p>Diese App habe ich entwickelt als Projekt an der DHBW Ravensburg im Modul Web-Engineering 2 als „Progressive-Web-Application“.</p>
      <p>Ich hoffe Sie haben Spaß diese App zu benutzen.</p>
    </Block>
  </Page>
);

export default AboutPage;
