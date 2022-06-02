import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import L from 'leaflet';
import Routing from 'leaflet-routing-machine'; // eslint-disable-line
// makes clean rendering of the map possible without lagging
import 'leaflet/dist/leaflet.css';
import '../css/map.css';
import 'leaflet-groupedlayercontrol/dist/leaflet.groupedlayercontrol.min.js';



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

        L.Routing.control({
            waypoints: [
                L.latLng(57.74, 11.94),
                L.latLng(57.6792, 11.949)
            ],
            routeWhileDragging: true
        }).addTo(map);

        L.marker([47.6500279 , 9.4800858]).addTo(map)
            .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            .openPopup();
    })

    return <div id="map" className="map"/>;
}
