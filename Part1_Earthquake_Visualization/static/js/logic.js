// import URL for GeoJSON
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson"

// determine the color for the markers based on depth of the earthquake
function chooseColor(depth){
    if(depth <10 ) return "green";
    else if (depth < 30) return "lightgreen";
    else if (depth < 50) return "yellow";
    else if (depth < 70) return "orange";
    else if (depth < 90) return "salmon";
    else return "red";
}

// initialize the map
var myMap = L.map("map", {
    center: [
                    37.09, -95.71,
                ],
                zoom: 4,
  });
// add the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// data promise
d3.json(url).then(function(data){
    // print data in console in case there is an issue
    console.log(data);
    // add the data to a layer based on the geoJSON file
    L.geoJSON(data,{
        // create new circle markers for each point
        pointToLayer: function(feature, latlng){
            return new L.CircleMarker(latlng,{
                // radius is based on the magnitude
                radius: 2*(feature.properties.mag),
                // color is based on the chooseColor function
                color:chooseColor(feature.geometry.coordinates[2]),
                // set fill opacity to 1 to eliminate the borders
                fillOpacity: 1
            })
        },
        // bind a popup with additional information about the earthquake
        onEachFeature: function(feature,layer){
            layer.bindPopup("<h3>"+ feature.properties.place + "</h3><hr><p> Magnitude: " + 
            feature.properties.mag + '&nbsp; &nbsp; &nbsp;' + "Depth: " + feature.geometry.coordinates[2] + "</br>" + (new Date (feature.properties.time)));
        }
    }).addTo(myMap);

    // set up legend on the map
    var legend = L.control({position: "bottomright"});
    // create the legend
    legend.onAdd = function(myMap){
        var div = L.DomUtil.create("div","info legend");
        limits = [-10, 10, 30, 50, 70,90];
        labels = [];
        // add the colors and information to an array for the legend    
        for (var i=0; i<limits.length; i++){
            labels.push(
            '<li style=\"background-color:' + chooseColor(limits[i] +1) + '"></li>' +
            " " + limits[i] + (limits[i+1]? '&ndash;' + limits[i+1] + '<br>' : '+'));
        }
        // push all the labels to the innerHTML of the legend
        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
    };
    // add legend to map
    legend.addTo(myMap)
});