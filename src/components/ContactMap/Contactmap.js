import React, { Component, useEffect } from 'react';
import L from 'leaflet';
import { MapContainer,  useMap} from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Utils from '../Utils/Utilits';

import boundaries from "../../data/boundaries.json"
import persons from "../../data/persons.json"

import 'leaflet-boundary-canvas';


export default function ContactMap() {
  
  /**
   * hook for changing component
   */
  useEffect(() => {
    console.log('This is called when the component is mounted!');
  }, []);

  const center = [51.5167, 9.917];      
  const boundariesColor = { color: "orange", fill: false};
  const zoom = 6;

 function MyComponent() {
  
  const map = useMap()
  //console.log('map center:', map.getCenter())
  
    /**
    * start Layer without boundaries
    */

    //L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
    //  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //}).addTo(map);

    var latLngGeom = boundaries.geometry; //Define real geometry here
    // var map = L.map('map').setView(center, zoom),
    var osmUrl = 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';
    var osmAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    var osm = L.TileLayer.boundaryCanvas(osmUrl, {
    boundary: latLngGeom, 
    attribution: osmAttribution
    }).addTo(map);



  var activeIcon = L.icon({
    iconUrl: './img/marker-icon.png',
    iconSize: [25,41]
  });
  
  var inactiveIcon = L.icon({
    iconUrl: './img/marker-icon-gray.png',
    iconSize: [25,41]
  });

  //L.marker([51.5167, 9,917]).addTo(map)
  //  .bindPopup('Center of Germany')
  //  .openPopup();

    var ActivePeoples = L.geoJson(persons,{
      pointToLayer: function(feature,latlng){
        // if (feature.isActive){
        
          var marker = L.marker(latlng,{icon: activeIcon});        
                  
          marker.bindPopup("Name: "+ feature.properties.name + 
            '<br/>' + "Surname: " + feature.properties.username +
            '<br/>' + "Age: " + feature.properties.age +
            '<br/>' + "Company: " + feature.properties.company +
            '<br/>' + "Address: " + feature.properties.address + 
            '<br/>' + feature.properties.description + ' '
            );

            
            //marker.openPopup() doesnt work in Safari
            //this is some hook             
            function func () {
                marker.openPopup();
            }          
            var utils = new Utils();
            utils.Subscribe('click', marker, func);          

          
          //}        
          
          return marker;
      }

    });

    /*
    var inactivePeoples = L.geoJson(persons,{      
      pointToLayer: function(feature,latlng){
        if (!feature.isActive){
        var marker = L.marker(latlng,{icon: inactiveIcon});        
        marker.bindPopup("Name: "+ feature.properties.name + 
          '<br/>' + "Surname" + feature.properties.username +
          '<br/>' + "Age: " + feature.properties.age +
          '<br/>' + "Company: " + feature.properties.company +
          '<br/>' + "Address: " + feature.properties.address + 
          '<br/>' + feature.properties.description + ' '
          );
        
        //marker.openPopup() doesnt work in Safari
            //this is some hook             
            function func () {
              marker.openPopup();
          }          
          var utils = new Utils();
          utils.Subscribe('click', marker, func);          

         
        }
        return marker;
      }
    });
    */

     var boundariesLayer = L.geoJSON(boundaries, {
      style: function(feature) {
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
  
  <MapContainer className="markercluster-map" center={center} zoom={zoom} maxZoom={18}>
  <MyComponent />
    
  <MarkerClusterGroup/>
</MapContainer>

  );
}