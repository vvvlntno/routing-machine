import React, { useEffect } from 'react';
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
    var lon = crd.longitude;  // Längengrad
    var lat = crd.latitude;   // Breitengrad
    latlon = [lat,lon]
}

function geoError(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    alert("ACHTUNG: Ohne Deine Geolocation-Daten ist die Funktionalität von viaLinked nur eingeschränkt möglich! Um die Geolocation-Funktionalität von viaLinked besser einschätzen zu können, klicke auf das 'viaLinked-Logo' oben links und lese bitte unser Datenschutz- und Nutzungsrichtlinien nach.");
}

navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);

async function reverseGeocoding(lon, lat) {
    //takes lon and lat and returns city name.
    try {
        let response = await fetch('https://nominatim.openstreetmap.org/reverse?format=json&lon=' + lon + '&lat=' + lat)
        let json = await response.json()
        let add = await json.display_name.split(', ');
        return add[4]
    } catch {
        return undefined
    }
}

async function searchWikipedia(searchQuery) {
    const endpoint = `https://de.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
    const response = await fetch(endpoint);

    if (!response.ok) {
        throw Error(response.statusText);
    }

    const json = await response.json();
    return json;
}

function trimResults(results) {
    let result = results.query.search[0]

    return [result.title,result.snippet]
}


/**
 *
 * @return {JSX.Element} - Map Component
 * @constructor
 */
export default function MyMap({ setState }) {
    let resultsJSON;
    useEffect(() => {
        var map = L.map('map').setView([47.6500279, 9.4800858], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        let control = L.Routing.control({
            /**  Example: From Friedrichshafen to Ravensburg
            waypoints: [ 
                 L.latLng(47.6500279, 9.4800858),
                 L.latLng(47.78198, 9.61062)
            ], */
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

            L.DomEvent.on(destBtn, 'click', async function() {
                control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);

                // let lnglat = [e.latlng.lng,e.latlng.lat]
                //hier informationen in information.jsx übertragen

                let cityname = await reverseGeocoding(e.latlng.lng,e.latlng.lat)
                if (cityname != undefined) {
                    //crasht hier lol
                    resultsJSON = await searchWikipedia(cityname)
                    resultsJSON = trimResults(resultsJSON)
                    setState(resultsJSON)
                }
                map.closePopup();
            });
        });
    }, [])
    return <div id="map" className="map"></div>;
}
