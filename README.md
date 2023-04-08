# Visualizing Earthquakes M2.5+ Over Last 30 Days

Data was pulled from earthquake.usgs.gov for earthquakes of 2.5+ magnitude over the last 30 days and then added to a map based on a variety of specific features.

## Creating the map

First, the map is initialized and a tile layer is created using an OSM file

![image](https://user-images.githubusercontent.com/116215793/230732299-6b086b12-c38c-4236-9867-0f77135d0dd6.png)

Next, the data was pulled into the file using a data promise to ensure the site waits until the data is loaded before proceeding

![image](https://user-images.githubusercontent.com/116215793/230732317-0d38537c-eaa5-4484-b18f-0677bbaf279e.png)

Each data point in the dataset is converted into a circle on the map based on the latitude and longitude. The radius is set based on the magnitude of the earthquake, and the color is set based on the following function showing the depth of the earthquake.

![image](https://user-images.githubusercontent.com/116215793/230732291-b29c2bd1-38aa-4d47-aedf-0d22994f9ad6.png)

Each datapoint is then bound to a popup showing the place name, magnitude, depth, and time of the earthquake.

![image](https://user-images.githubusercontent.com/116215793/230732425-081f7a26-be64-4260-bd04-c54504dd5577.png)

Finally, a legend is created to visualize the color code of the circles.

![image](https://user-images.githubusercontent.com/116215793/230732456-3917c208-a361-4c7e-b362-fe2d8d645508.png)

## The finished map

The finished map looks something like the photo below. It could change on a daily basis as the underlying earthquake data is updated.

![image](https://user-images.githubusercontent.com/116215793/230732491-25963f47-ab63-450a-baf1-9af2629acb7a.png)


## Contributors
Earthquake.usgs.gov provided the underlying dataset
Leaflet's official documentation provided assistance with creating the legend within the Javascript file, as well as the CSS style file
OpenStreetMap.org provided the map tile
