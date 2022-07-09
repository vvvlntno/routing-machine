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
    timeout: 3000,                // Maximum Wartezeit
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
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
} else {
    alert('Geolocation ist nur eingeschränkt möglich, wenn Sie alle Funktionen der Seite benutzen wollen geben sie dieser Webseite Standortzugriff')
}

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


// source: https://stackoverflow.com/questions/6878761/javascript-how-to-create-random-longitude-and-latitudes
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

/**
 *
 * @return {JSX.Element} - Map Component
 * @constructor
 */
export default function MyMap({ setState }) {
    let resultsJSON;
    useEffect(() => {
        var map = L.map('map').setView(latlon, 16);
        setTimeout(() => {
            map.flyTo(latlon, 13, {
                animate: true,
                duration: 4
            });
        }, 1000)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        let control = L.Routing.control({
            routeWhileDragging: true,
            geocoder: L.Control.Geocoder.nominatim()
            //nominatin doesnt have autocomplete
        }).addTo(map);

        //popup when click on map
        function createButton(label, container) {
            var btn = L.DomUtil.create('button', '', container);
            btn.setAttribute('type', 'button');
            btn.setAttribute('class', 'col button button-fill color-green');
            btn.setAttribute('style', 'margin-bottom: 10px; background-color: #bbd9b5 !important; color: black; font-size: 12px !important;')
            btn.innerHTML = label;
            return btn;
        }

        map.on('click', function(e) {
            var container = L.DomUtil.create('div'),
                startBtn = createButton('Beginn der Route', container),
                destBtn = createButton('Ziel der Route', container),
                centralizeBtn = createButton('Zentrieren', container),
                randomplaceBtn = createButton('Zufälliger Ort', container);

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

                let cityname = await reverseGeocoding(e.latlng.lng,e.latlng.lat)
                if (cityname != undefined) {
                    resultsJSON = await searchWikipedia(cityname)
                    resultsJSON = trimResults(resultsJSON)
                    setState(resultsJSON)
                }
                map.closePopup();
            });

            L.DomEvent.on(centralizeBtn, 'click', function() {
                map.flyTo(latlon, 13, {
                    animate: true,
                    duration: 5
                });
                map.closePopup();
            });

            L.DomEvent.on(randomplaceBtn, 'click', function() {
                map.flyTo([getRandomInRange(-90, 90, 6),getRandomInRange(-180, 180, 6)], 13, {
                    animate: true,
                    duration: 5
                });
                map.closePopup();

            });
        });
    }, [])
    return <div id="map" className="map"></div>;
}
