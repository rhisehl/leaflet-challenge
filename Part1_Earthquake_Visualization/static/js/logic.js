// import URL for GeoJSON
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson"

// Populate all functions into the data promise
d3.json(url).then(function (data){
    gatherData(data.features)
});


function gatherData (eqData) {
    // loop through features to add popups with place, time, and magnitude of earthquake
    function featureLoop(feature, layer){
        layer.bindPopup('<h3>${feature.properties.place}</h3><hr><p> Magnitude: ${feature.properties.mag} </br>${new Dat(feature.properties.time)}');
    }
    // add geoJSON layer with all features in eqData
    // run featureLoop on each data point
    var earthquakes = L.geoJSON(eqData, {
        featureLoop: featureLoop
    });
    // run the mapInit function
    mapInit(earthquakes);
}

function mapInit(earthquakes) {
    // base layers
    var Stadia_OSMBright = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    });
    var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    // baseMaps object
    var baseMaps = {
        "Street Map": Stadia_OSMBright,
        "Topographic Map": OpenTopoMap
    }
    // Create Overlay
    var overlayMaps = {
        "Earthquakes" : earthquakes
    }
    // Create Map
    var earthquakeMap = L.map("map",{
        center: [
            37.09, -95.71
        ],
        layers: [Stadia_OSMBright,earthquakes]
    });
    // Create Layer Controls
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(earthquakeMap);
}
