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
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
  } else {
    alert("ACHTUNG: Geolocation wird von diesem System/Device nicht unterstützt! Die Funktionalität von viaLinked ist daher nur eingeschränkt möglich!");
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
              const pos = {streetNo: add[0], street: add[1], suburb: add[2], town: add[3], city: add[4], district: add[5], federalState: add[6], zip: add[7], country: add[8] };
          })
      }

function displaydynamicmap(lon, lat) {
    document.writeln(`<iframe width="500" height="300" src="https://api.maptiler.com/maps/openstreetmap/?key=Ah5Nrpqbp5QDMPM7F2wg#10.7/`+ lat +`/`+ lon +`"></iframe>`)
}