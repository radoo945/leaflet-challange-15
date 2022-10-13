var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

d3.json(queryUrl, function(data) {
  createFeatures(data.features);
  //console.log(data.features)
});



//features function
function createFeatures(earthquakeData) {
  
  //make colors based on the magnitude
 function FindColor(mag){
   if (mag < 2.5) {
     return "green"
   }
   else if (mag < 3.5) {
     return "yellow"
   }
   else if (mag < 4.5) {
     return "blue"
   }
   else if (mag < 5.5) {
     return "black"
   }
   else if (mag < 6.5) {
    return "orange"
  }
   else if (mag < 7.5) {
     return "red"
   }
   else {
     return "white"
   }


   var legend = L.control({position: 'bottomleft'});
   legend.onAdd = function (map) {

   var div = L.DomUtil.create('div', 'info legend');
   labels = ['<strong>Categories</strong>'],
   categories = ['earthquakes'];

   for (var i = 0; i < categories.length; i++) {
           div.innerHTML += 
           labels.push(
               '<i style="background:' + FindColor(categories[i] + 1) + '"></i> ' +
               (categories[i] ? categories[i] : '+'));
       }

       div.innerHTML = labels.join('<br>');
   return div;
};

legend.addTo(map);   
 }
 
 // fucntion for feture and pop-ups
 function onEachFeature(feature, layer) {
   layer.bindPopup("<h3>" + feature.properties.place +
     "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
 }
 
 //geoJson layers
 var earthquakes = L.geoJSON(earthquakeData, {
   pointToLayer: function(earthquakeData, latlng) {
     return L.circle(latlng, {
       radius: earthquakeData.properties.mag * 10000,
       color: FindColor(earthquakeData.properties.mag),
       fillOpacity: .75
     });
   },
   onEachFeature: onEachFeature
 });
 
 
 createMap(earthquakes);
 }
 

 function createMap(earthquakes) {

  // Create the base layers.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay.
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  var myMap = L.map("map", {
    center: [
      51.505, -0.09
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}




















































 
 
 
 
 
 
 
 
 
 
 
 










































































 
	
	

   
     
     
     
     
     
    
  
    
    
    
    
     
    
  
  

  

  

  
  
  

  
  
  
  
  
  
    
  
  






    
    
    
    
    


    

    

  
  
  

  
  
  
  
  

  
  
  
  









