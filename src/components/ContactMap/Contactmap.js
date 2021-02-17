import React, { useEffect, useRef, useState} from 'react';
import L from 'leaflet';
import 'leaflet.markercluster'
import SearchControl from '../SearchControl/SearchControl';
import 'leaflet-boundary-canvas';
import Utils from '../Utils/Utilits';
import boundaries from "../../data/boundaries.json";
import persons from "../../data/persons.json";


export default function ContactMap(props) {

  /**
  * set new map and add boundared layer
  */

 const boundariesColor = {
    color: "orange",
    fill: false 
  };

  const center = [51.5167, 9.917];
  const zoom = 6;
  const latLngGeom = boundaries.geometry; //Define real geometry here
  const osmUrl = 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';
  const osmAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    

  const mapRef = useRef(null)

  useEffect(() => {

    var osm = L.TileLayer.boundaryCanvas(osmUrl, {
      boundary: latLngGeom,
        attribution: osmAttribution
    })
    
    mapRef.current = L.map('map', {
        center: center,
        zoom: zoom,
        layers: osm
    })
        
  }, [center, zoom])

  /**
   *  Set markers and position 
   */
  
  //set new icon image for markers
  const activeIcon = L.icon({
    iconUrl: './img/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12,41]
  });


  var ActivePeoples = L.geoJson(persons, {
    pointToLayer: function (feature, latlng) {
      
      var marker = L.marker(latlng, {
        icon: activeIcon
      });

      marker.bindPopup(
        '<img src="../../img/face.png"/>'+
         '<br/>'+feature.properties.username + ' from '+feature.properties.city +        
        '<br/>' + "Skills: " + feature.properties.description
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


  const boundariesLayer = L.geoJSON(boundaries, {
    style: function (feature) {
      return boundariesColor;
    }
  });


  var clusters = L.markerClusterGroup();    
    clusters.addLayer(boundariesLayer);
    clusters.addLayer(ActivePeoples);

  useEffect(() => {
    
    mapRef.current.addLayer(clusters)             

  }, [clusters])



/**
 * this is callback from SearchControlList component
 * @param list  returns the list of tokens to updating of our markers
 * @return new person.json object 
 */
function updateInfo(persons){   

  clusters.removeLayer(ActivePeoples);

  ActivePeoples = L.geoJson(persons, {
    pointToLayer: function (feature, latlng) {      
      var marker = L.marker(latlng, { icon: activeIcon});
      marker.bindPopup(
        '<img src="../../img/face.png"/>'+
         '<br/>'+feature.properties.username + ' from '+feature.properties.city +        
        '<br/>' + "Skills: " + feature.properties.description
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

  clusters.addLayer(ActivePeoples);

}

/**
 * 
 */

 function closeSearch(event){
   if(event == 'closed'){    
      updateInfo(persons);
   }
 }

return <div>
          <SearchControl updateInfo={updateInfo} closeSearch={closeSearch}/>
          <div id='map'></div>
        </div>

}