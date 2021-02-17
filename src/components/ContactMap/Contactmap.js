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

  const markerRef = useRef(null)
  
  //set new icon image for markers
  const activeIcon = L.icon({
    iconUrl: './img/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12,41]
  });

  const [markerPosition, setMarkerPosition] =  useState({ lat:42.6944, lng:23.3328  })
  
  var ActivePeoples = L.geoJson(persons, {
    pointToLayer: function (feature, latlng) {
      
      var marker = L.marker(latlng, {
        icon: activeIcon
      });

      marker.bindPopup("Name: " + feature.properties.name +
        '<br/>' + "Surname: " + feature.properties.username +
        '<br/>' + "Age: " + feature.properties.age +
        '<br/>' + "Company: " + feature.properties.company +
        '<br/>' + "About: " + feature.properties.about +
        '<br/>'+
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
function updateInfo(list){      
  const newPersons = { "type": "FeatureCollection", "features": [] }  
  list.forEach(token =>{
    newPersons.features.push(token.getFeature())
  })        
  console.log(newPersons);

  clusters.removeLayer(ActivePeoples);

  ActivePeoples = L.geoJson(newPersons, {
    pointToLayer: function (feature, latlng) {
      
      var marker = L.marker(latlng, {
        icon: activeIcon
      });

      marker.bindPopup("Name: " + feature.properties.name +
        '<br/>' + "Surname: " + feature.properties.username +
        '<br/>' + "Age: " + feature.properties.age +
        '<br/>' + "Company: " + feature.properties.company +
        '<br/>' + "About: " + feature.properties.about +
        '<br/>'+
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

  clusters.addLayer(ActivePeoples);

}

return <div>
          <SearchControl updateInfo={updateInfo}/>
          <div id='map'></div>
        </div>

}