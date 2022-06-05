import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import L from 'leaflet';
import Routing from 'leaflet-routing-machine'; // eslint-disable-line
// makes clean rendering of the map possible without lagging
import 'leaflet/dist/leaflet.css';
import '../css/map.css';
import 'leaflet-groupedlayercontrol/dist/leaflet.groupedlayercontrol.min.js';
import 'https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js';



//geocoding
let latlon = [0,0];

var geoOptions = {
    enableHighAccuracy: true,     // Super-Präzisions-Modus
    timeout: 1000,                // Maximum Wartezeit
    maximumAge: 0                 // Maximum Cache-Alter
}
function geoSuccess(pos) {
    var crd = pos.coords;
    console.log("Längengrad: " + pos.coords.longitude);
    var lon = crd.longitude;  // Längengrad
    console.log("Breitengrad: " + pos.coords.latitude);
    var lat = crd.latitude;   // Breitengrad
    latlon = [lat,lon]
}

function geoError(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    alert("ACHTUNG: Ohne Deine Geolocation-Daten ist die Funktionalität von viaLinked nur eingeschränkt möglich! Um die Geolocation-Funktionalität von viaLinked besser einschätzen zu können, klicke auf das 'viaLinked-Logo' oben links und lese bitte unser Datenschutz- und Nutzungsrichtlinien nach.");
}
navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);




//map element
/**
 *
 * @return {JSX.Element} - Map Component
 * @constructor
 */
export default function MyMap() {
    useEffect((e) => {
        var map = L.map('map').setView([47.6500279, 9.4800858], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        let control = L.Routing.control({
            waypoints: [
                L.latLng(47.6500279, 9.4800858),
                L.latLng(47.78198, 9.61062)
            ],
            routeWhileDragging: true,
            geocoder: L.Control.Geocoder.nominatim()
            //nominatin doesnt have autocomplete
        }).addTo(map);

        //popup when click on map
        function createButton(label, container) {
            var btn = L.DomUtil.create('button', '', container);
            btn.setAttribute('type', 'button');
            btn.innerHTML = label;
            return btn;
        }

        map.on('click', function(e) {
            var container = L.DomUtil.create('div'),
                startBtn = createButton('Start from this location', container),
                destBtn = createButton('Go to this location', container);

            L.popup()
                .setContent(container)
                .setLatLng(e.latlng)
                .openOn(map);

            L.DomEvent.on(startBtn, 'click', function() {
                control.spliceWaypoints(0, 1, e.latlng);
                map.closePopup();
            });     

            L.DomEvent.on(destBtn, 'click', function() {
                control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
                map.closePopup();
            });

        });

        //add lat and lon of user location
        // L.marker(latlon).addTo(map)
        //     .bindPopup('Dein Standort.')
        //     .openPopup();

    })
    

    return <div id="map" className="map"/>;
}
