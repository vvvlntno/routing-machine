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

          document.writeln("<h2>Geo-Koordinaten - Koordinaten zu Ort</h2>");
          document.writeln("<table cellspacing=2 cellpadding=5 width='400px' bgcolor='#ccffff'>");
              document.writeln("<tr>"); 
                  document.writeln("<td width='250px'>Latitude [Grad-Dez]:</td>");
                  document.writeln("<td width='150px'>" + lat + "</td>");
              document.writeln("</tr><tr>");
                  document.writeln("<td width='250px'>Longitude [Grad-Dez]: </td>");
                  document.writeln("<td width='150px'>" + lon + "</td>");
              document.writeln("</tr><tr>");
                  document.writeln("<td width='250px'>Höhe über Meerespiegel [m]: </td>");
                  document.writeln("<td width='150px'>" + crd.altitude + "</td>");
              document.writeln("</tr><tr>");
                  document.writeln("<td width='250px'>Genauigkeit [m]: </td>");
                  document.writeln("<td width='150px'>" + crd.accuracy + "</td>");	
              document.writeln("</tr>");
          document.writeln("</table>");

          reverseGeocoding(lon, lat);
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

              document.writeln("<h2>Reverse Geocoding</h2>");
              document.writeln("<table cellspacing=2 cellpadding=5 width='400px' bgcolor='#ccffff'>");
                  document.writeln("<tr>"); 
                      document.writeln("<td width='70px'>Strasse Nr.:</td>");
                      document.writeln("<td width='330px'>" + pos.street + " " + pos.streetNo + "</td>");
                  document.writeln("</tr><tr>");
                      document.writeln("<td width='70px'>Plz Ort: </td>");
                      document.writeln("<td width='330px'>" + pos.zip + " " + pos.city + " (" + pos.town + ")</td>");
                  document.writeln("</tr><tr>");	
                      document.writeln("<td width='70px'>Landkreis: </td>");
                      document.writeln("<td width='330px'>" + pos.district + "</td>");
                  document.writeln("</tr><tr>");
                      document.writeln("<td width='70px'>Bundesland: </td>");
                      document.writeln("<td width='330px'>" + pos.federalState + "</td>");
                  document.writeln("</tr><tr>");		
                      document.writeln("<td width='70px'>Land: </td>");
                      document.writeln("<td width='330px'>" + pos.country + "</td>");	
                  document.writeln("</tr>");
              document.writeln("</table>");
              
          })
      }