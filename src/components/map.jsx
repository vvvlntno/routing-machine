import React, { useEffect } from 'react';
import L from 'leaflet';
import Routing from 'leaflet-routing-machine'; // eslint-disable-line
// makes clean rendering of the map possible without lagging
import 'leaflet/dist/leaflet.css';
import '../css/map.css';
import 'leaflet-groupedlayercontrol/dist/leaflet.groupedlayercontrol.min.js';
import 'https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js';



// Creating Lat and Lon Array for Several Functions
let latlon = [0,0];


// Options that will be used if navigator.geolocation is allowed
var geoOptions = {
    enableHighAccuracy: true,     // Super-Präzisions-Modus
    timeout: 3000,                // Maximum Wartezeit
    maximumAge: 0                 // Maximum Cache-Alter
}


// Function that will be used if navigator.geolocation is allowed
function geoSuccess(pos) {
    var crd = pos.coords;
    var lon = crd.longitude;  // Längengrad
    var lat = crd.latitude;   // Breitengrad
    latlon = [lat,lon]
}


// Function that will be used if navigator.geolocation is not allowed
function geoError(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    alert("ACHTUNG: Ohne Deine Geolocation-Daten ist die Funktionalität dieses Services leider nur eingeschränkt möglich, bitte aktiviere Sie :)");
}

// Checks if navigator.geolocation is allowed
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
}


// Takes Lon and Lat and returns Name of the City
async function reverseGeocoding(lon, lat) {
    try {
        let response = await fetch('https://nominatim.openstreetmap.org/reverse?format=json&lon=' + lon + '&lat=' + lat)
        let json = await response.json()
        let add = await json.display_name.split(', ');
        return add[4]
    } catch {
        return undefined
    }
}


// Takes a Search Query and Returns Information about the Search Query
async function searchWikipedia(searchQuery) {
    const endpoint = `https://de.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
    const response = await fetch(endpoint);

    if (!response.ok) {
        throw Error(response.statusText);
    }

    const json = await response.json();
    return json;
}


// Trims the Wikipedia Search Results and returns the Snippet and Text into an Array
function trimResults(results) {
    let result = results.query.search[0]

    return [result.title,result.snippet]
}


// source: https://stackoverflow.com/questions/6878761/javascript-how-to-create-random-longitude-and-latitudes
// generates a Random int in Rang of from -> to, fixed are the decimal places
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

/**
 *
 * @return {JSX.Element} - Map Component
 * @constructor
 */
export default function MyMap({ setState }) {
    // Results that will be sent to Information Component
    let resultsJSON;

    // Map can only reder on Mount because, useEffect listens to [] dependencies
    useEffect(() => {

        // Creates Map on User Location with big Zoom in
        var map = L.map('map').setView(latlon, 16);

        // After 1 Second Map Zoom out that tiles can load afterwards
        setTimeout(() => {
            map.flyTo(latlon, 13, {
                animate: true,
                duration: 4
            });
        }, 1000)


        // Create the Tile Layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);


        // Create the Routing control with geocoder
        let control = L.Routing.control({
            routeWhileDragging: true,
            geocoder: L.Control.Geocoder.nominatim()
        }).addTo(map);


        // Functions for creating Buttons
        function createButton(label, container) {
            var btn = L.DomUtil.create('button', '', container);
            btn.setAttribute('type', 'button');
            btn.setAttribute('class', 'col button button-fill color-green');
            btn.setAttribute('style', 'margin-bottom: 10px; background-color: #bbd9b5 !important; color: black; font-size: 12px !important;')
            btn.innerHTML = label;
            return btn;
        }

        // Listening to the on Click event
        map.on('click', function(e) {
            // Creating Buttons
            var container = L.DomUtil.create('div'),
                startBtn = createButton('Beginn der Route', container),
                destBtn = createButton('Ziel der Route', container),
                centralizeBtn = createButton('Zentrieren', container),
                randomplaceBtn = createButton('Zufälliger Ort', container);

            // Creating a Popup
            L.popup()
                .setContent(container)
                .setLatLng(e.latlng)
                .openOn(map);

            // When startbtn Clicked Waypoints get Spliced
            L.DomEvent.on(startBtn, 'click', function() {
                control.spliceWaypoints(0, 1, e.latlng);
                map.closePopup();
            });     

            // When destbtn gets clicked a WikiAPI Call gets done and the Info About the Destination gets into Information Component
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

            // When centralizeBtn gets clicked the View of the Map gets set to user Lat and Lon Location
            L.DomEvent.on(centralizeBtn, 'click', function() {
                map.flyTo(latlon, 13, {
                    animate: true,
                    duration: 5
                });
                map.closePopup();
            });

            // When randomplaceBtn gets clicked the View of the Map will be changed into a Random Lat and Lon
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
