import React, { Component, useEffect } from 'react';
import L from 'leaflet';
import { MapContainer,  useMap} from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Utils from '../Utils/Utilits';

import boundaries from "../../data/boundaries.json"
import persons from "../../data/persons.json"


export default function ContactMap() {
  
  /**
   * hook for changing component
   */
  useEffect(() => {
    console.log('This is called when the component is mounted!');
  }, []);

  const center = [51.5167, 9.917];      
  const boundariesColor = { color: "orange", fill: false};
  const zoom = 4;

 function MyComponent() {
  const map = useMap()
  //console.log('map center:', map.getCenter())

  /**
   * start Layer without boundaries
   */

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);


  /*
  var withBoundary = function(providerName) {
     return L.TileLayer.BoundaryCanvas.createFromLayer(      
        L.tileLayer.provider(providerName),
        {boundary: boundaries, trackAttribution: true}
    )
}

  L.control.layers({
  'OpenStreetMap.DE': withBoundary('OpenStreetMap.DE').addTo(map)
  //'Stamen.Watercolor': withBoundary('Stamen.Watercolor'),
  //'Esri.WorldStreetMap': withBoundary('Esri.WorldStreetMap'),
  //'MapQuestOpen.Aerial': withBoundary('MapQuestOpen.Aerial')
  }, null, {collapsed: false}).addTo(map);
  */



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
        if (feature.isActive){
        
          var marker = L.marker(latlng,{icon: activeIcon});        
                  
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

    /*
      var groupColors = L.geoJson( persons, {
        style: function(feature){
          var fillColor,
              density = feature.properties.density;
          if ( density > 80 ) fillColor = "#006837";
          else if ( density > 40 ) fillColor = "#31a354";
          else if ( density > 20 ) fillColor = "#78c679";
          else if ( density > 10 ) fillColor = "#c2e699";
          else if ( density > 0 ) fillColor = "#ffffcc";
          else fillColor = "#f7f7f7";  // no data
          return { color: "#999", weight: 1, fillColor: fillColor, fillOpacity: .6 };
        },
        onEachFeature: function( feature, layer ){
          layer.bindPopup( "<strong>" + feature.properties.name + "</strong><br/>" + feature.properties.density + " rats per square mile" )
        }
      }) 
      */

     var boundariesLayer = L.geoJSON(boundaries, {
      style: function(feature) {
          return boundariesColor;          
          }
      });  


    var clusters = L.markerClusterGroup();
    clusters.addLayer(ActivePeoples);
    clusters.addLayer(inactivePeoples);
    clusters.addLayer(boundariesLayer);
    map.addLayer(clusters);

  
  return null
}

  /**
   * <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  />
   */

  return (
  
  <MapContainer className="markercluster-map" center={center} zoom={zoom} maxZoom={18}>
  <MyComponent />
    
  <MarkerClusterGroup/>
</MapContainer>

  );
}