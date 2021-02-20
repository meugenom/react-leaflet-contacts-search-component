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


  const center = [51.0, 10.917];
  const zoom = 6;
  const minZoom = 4;
  const maxZoom = 9;
  const zoomSnap = 0.25
  const latLngGeom = boundaries.geometry; //Define real geometry here
  const osmUrl = 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';
  const osmAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  var group = [];
  const mapRef = useRef(null)


  useEffect(() => {

    var osm = L.TileLayer.boundaryCanvas(osmUrl, {
      boundary: latLngGeom,
        attribution: osmAttribution
    })
    
    mapRef.current = L.map('map', {
        center: center,
        zoom: zoom,
        layers: osm,
        minZoom: minZoom,
        maxZoom: maxZoom,
        zoomSnap: zoomSnap
    })
        
  }, [center, zoom, minZoom, maxZoom, zoomSnap])

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
        '<img src="./img/face.png"/>'+
         '<br/>'+feature.properties.username + ' from '+feature.properties.city +        
        '<br/>' + "Skills: " + feature.properties.description
      );

      //marker.openPopup() doesnt work in Safari
      //this is some hook             
      function func() {
        marker.openPopup();
      }        

      //for making right position to fit all markers to the map
      group.push(marker);


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


  var clusters = L.markerClusterGroup({
      spiderfyOnMaxZoom: true,
	    showCoverageOnHover: true,
	    zoomToBoundsOnClick: true,
      chunkedLoading: true
    });    
    
    clusters.addLayer(boundariesLayer);
    clusters.addLayer(ActivePeoples);

  useEffect(() => {
    
    mapRef.current.addLayer(clusters)           

    //we fly to all clusters and set zoom to fit
    var markersGroup = new L.featureGroup(group);
    mapRef.current.fitBounds(markersGroup.getBounds())


  }, [clusters])



/**
 * this is callback from SearchControlList component
 * @param list  returns the list of tokens to updating of our markers
 * @return new person.json object 
 */
function updateInfo(data){


  clusters.removeLayer(ActivePeoples);

  ActivePeoples = L.geoJson(data, {
    pointToLayer: function (feature, latlng) {      
      var marker = L.marker(latlng, { icon: activeIcon});
      marker.bindPopup(
        '<img src="./img/face.png"/>'+
         '<br/>'+feature.properties.username + ' from '+feature.properties.city +        
        '<br/>' + "Skills: " + feature.properties.description
      );
      //marker.openPopup() doesnt work in Safari
      //this is some hook             
      function func() {
        marker.openPopup();
      }        
      
      //for making right position to fit all markers to the map
      group.push(marker);

      var utils = new Utils();
      utils.Subscribe('click', marker, func);        
      return marker;

    }

  });

  clusters.addLayer(ActivePeoples);


  /**
     * if we have 1 person to view 
     * we fly to this person and see the map with maxZoom
     */

  if( data.features && data.features.length == 1){
    //console.log(data.features[0].geometry.coordinates)
    mapRef.current.flyTo([
      data.features[0].geometry.coordinates[1],
      data.features[0].geometry.coordinates[0]], 
      maxZoom)
  } else {

  //we fly to all clusters and set zoom to fit
  var markersGroup = new L.featureGroup(group);
  mapRef.current.fitBounds(markersGroup.getBounds())
  }
}

//props callback
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