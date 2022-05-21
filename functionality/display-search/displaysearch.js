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


  reverseGeocoding(lon, lat);
  displaydynamicmap(lon, lat);
}

function geoError(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  alert("ACHTUNG: Ohne Deine Geolocation-Daten ist die Funktionalität von viaLinked nur eingeschränkt möglich! Um die Geolocation-Funktionalität von viaLinked besser einschätzen zu können, klicke auf das 'viaLinked-Logo' oben links und lese bitte unser Datenschutz- und Nutzungsrichtlinien nach.");
}

function reverseGeocoding(lon, lat) {
  fetch('https://nominatim.openstreetmap.org/reverse?format=json&lon=' + lon + '&lat=' + lat).
  then(function(response) {
    return response.json();
  }).
  then(function(json) {
    console.log(json.display_name);
    //document.getElementById('location').innerHTML = json.display_name;

    const add = json.display_name.split(', ');
    //wenn straße gefunden wird dann soll alles außer streetno eins aufsteigen!
    const pos = {streetNo: add[0], street: add[0], town: add[1], city: add[2], suburb: add[3], district: add[4], federalState: add[5], zip: add[6], country: add[7]};
  })
}

function displaydynamicmap(lon, lat) {
  const mapwrapper = document.querySelector('.map-wrapper');
  mapwrapper.innerHTML = `<iframe width="500" height="300" src="https://api.maptiler.com/maps/openstreetmap/?key=Ah5Nrpqbp5QDMPM7F2wg#10.7/`+ lat +`/`+ lon +`"></iframe>` 
  //document.writeln(`<iframe width="500" height="300" src="https://api.maptiler.com/maps/openstreetmap/?key=Ah5Nrpqbp5QDMPM7F2wg#10.7/`+ lat +`/`+ lon +`"></iframe>`)
}

async function handleSubmit(event) {
  event.preventDefault();
  const inputValue = document.querySelector('.search-input').value;
  console.log(inputValue)
  const searchQuery = inputValue.trim();
  fetch(`https://nominatim.openstreetmap.org/?format=json&city=`+searchQuery).
  then(function(response) {
    return response.json();
  }).then(function(json) {
    // let newboundingbox = json.boundingbox; this is the lat and lon for osm
    let newlat = json[0].lat;
    let newlon = json[0].lon;
    console.log(`New Lat: ${newlat} \nNew Lon: ${newlon}`);
    displaydynamicmap(newlon,newlat);
  })
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
} else {
  alert("ACHTUNG: Geolocation wird von diesem System/Device nicht unterstützt! Die Funktionalität von viaLinked ist daher nur eingeschränkt möglich!");
}

const form = document.querySelector('.search-wrapper');
form.addEventListener('submit', handleSubmit);
