import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import { MapContainer,  useMap} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import SearchControl from '../SearchControl/SearchControl';
import 'leaflet-boundary-canvas';

import Utils from '../Utils/Utilits';
import boundaries from "../../data/boundaries.json";
import persons from "../../data/persons.json";

export default function ContactMap(props) {

  /**
   * hook for changing component
   * is called only from function and not from class
   */

  useEffect(() => {
    console.log('This is called when the component is mounted!');
  }, []);

  const center = [51.5167, 9.917];
  const boundariesColor = {
    color: "orange",
    fill: false
  };
  const zoom = 6;
  
  //name ContactMapComponent is important to doing with hook and define map from useMap();
  function ContactMapComponent() {
    const map = useMap()
    //console.log('map center:', map.getCenter())

    var latLngGeom = boundaries.geometry; //Define real geometry here
    var osmUrl = 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';
    var osmAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    var osm = L.TileLayer.boundaryCanvas(osmUrl, {
      boundary: latLngGeom,
      attribution: osmAttribution
    }).addTo(map);


    var activeIcon = L.icon({
      iconUrl: './img/marker-icon.png',
      iconSize: [25, 41]
    });

    var inactiveIcon = L.icon({
      iconUrl: './img/marker-icon-gray.png',
      iconSize: [25, 41]
    });


    var ActivePeoples = L.geoJson(persons, {
      pointToLayer: function (feature, latlng) {
        // if (feature.isActive){

        var marker = L.marker(latlng, {
          icon: activeIcon
        });

        marker.bindPopup("Name: " + feature.properties.name +
          '<br/>' + "Surname: " + feature.properties.username +
          '<br/>' + "Age: " + feature.properties.age +
          '<br/>' + "Company: " + feature.properties.company +
          '<br/>' + "Address: " + feature.properties.address +
          '<br/>' + feature.properties.description + ' '
        );

        //marker.openPopup() doesnt work in Safari
        //this is some hook             
        function func() {
          marker.openPopup();
        }        
        var utils = new Utils();
        utils.Subscribe('click', marker, func);
        
        return marker;
      }

    });

    var boundariesLayer = L.geoJSON(boundaries, {
      style: function (feature) {
        return boundariesColor;
      }
    });


    var clusters = L.markerClusterGroup();
    clusters.addLayer(ActivePeoples);
    // clusters.addLayer(inactivePeoples);
    clusters.addLayer(boundariesLayer);
    map.addLayer(clusters);
    
    return null
  }

  
  return (
    <div>
      <SearchControl l="test"/>
      <MapContainer className="markercluster-map" center={center} zoom={zoom} maxZoom={18}>
        <ContactMapComponent />         
        <MarkerClusterGroup/>        
      </MapContainer>
    </div>
  );
}