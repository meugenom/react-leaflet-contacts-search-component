import React, { useEffect, useRef, useState} from 'react';
import L from 'leaflet';
import 'leaflet.markercluster'
import SearchControl from '../SearchControl/SearchControl';
import 'leaflet-boundary-canvas';
import Utils from '../Utils/Utilits';
import boundaries from "../../data/boundaries.json";
import './ContactMap.css'

import Service from '../Services/Service'
import Lexer from '../Services/Parser/Lexer'
import Parser from '../Services/Parser/Parser'
import personStore from '../Services/PersonStore'
import streamStore from '../Services/StreamStore'
import examplePersons from '../../data/demo.json'



export default function ContactMap(props) {

  const boundariesColor = { color: "orange", fill: false};
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


  /**
   * loading data from dev server
   * with error we show clear map in the browser
   */

  async function onLoading(){

    var action = await new Service().getData().then((persons)=>{      
      if(persons != undefined && persons.features){
        personStore.set(persons)      
        var stream = new Lexer(persons).getStream();     
        streamStore.set(stream);
        new Parser(stream).prepare();
        updateInfo(persons);    
      }else{

        console.error('Error connection with dev server, we use example data from /data/persons.json')        
        personStore.set(examplePersons)      
        var stream = new Lexer(examplePersons).getStream();     
        streamStore.set(stream);
        new Parser(stream).prepare();
        updateInfo(examplePersons);    

      }     
    });      
  }


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
    iconUrl: './img/marker-icon-blue.png',
    iconSize: [25, 41],
    iconAnchor: [12,41]
  });

  const inactiveIcon = L.icon({
    iconUrl: './img/marker-icon-gray.png',
    iconSize: [25, 41],
    iconAnchor: [12,41]
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



  /** null markers block begin
   * it's very important for first initialzation of the map
  */
  var ActivePeoples = L.geoJson(examplePersons, {
    pointToLayer: function (feature, latlng) {
      
      var marker = L.marker(latlng, { 
        icon: (feature.properties.username?activeIcon:inactiveIcon)
      });

      //for making right position to fit all markers to the map
      group.push(marker);    
    }

  });
  
    clusters.addLayer(boundariesLayer);
    clusters.addLayer(ActivePeoples);

  useEffect(() => {    
    mapRef.current.addLayer(clusters)           

  }, [clusters])
  /** null markers block end*/
  



/**
 * this is callback from SearchControlList component
 * @param list  returns the list of tokens to updating of our markers
 * @return new person.json object 
 */

function updateInfo(data){
  
  clusters.removeLayer(ActivePeoples);        
    
  ActivePeoples = L.geoJson(data, {
    pointToLayer: function (feature, latlng) { 

      
      var marker = L.marker(latlng, { 
          icon: (feature.properties.username?activeIcon:inactiveIcon)
        });

      marker.bindPopup(
        '<div class="popups-widget-top">'+
          '<img src="./img/programmer.png" alt="avatar"/>'+
            '<div class="popups-top-right-section">'+            
            '<p>' + (feature.properties.username?'<a href="https://t.me/'+feature.properties.username+'">@'+feature.properties.username+'  </a>':'<i>hidden </i>')
                +'('+feature.properties.name + ')'+
            '</p>'+
            '<p class="city-name"> from <b>'+feature.properties.city+'</b></p>' +       
            '</div>'+
         '</div>'+
         '<div class="popups-widget-bottom">'+
            '<b>About:</b> ' + feature.properties.about +
         '</div>'+
         (feature.properties.username
            ?''
              :'<div class="popups-widget-bottom-error">'+
                  '<i class="error-info">He/She needs to indicate a username</i></br>'+
                  '<i class="error-info">for communication</i>'+
                  '</div>'
         )
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
    //console.log(data.features)
    //console.log(data.features[0].geometry.coordinates)
    
    mapRef.current.flyTo([
      data.features[0].geometry.coordinates[1],
      data.features[0].geometry.coordinates[0]], 
      maxZoom)
  }
  if(data.features && data.features.length > 1 && group!=null && mapRef.current!=null){

    //we fly to all clusters and set zoom to fit    
    var markersGroup = new L.featureGroup(group);
    mapRef.current.fitBounds(markersGroup.getBounds())
  }
}

//props callback
 function closeSearch(event){
   if(event == 'closed'){    
      updateInfo(examplePersons);
   }
 }

 onLoading();

return <div>
          <SearchControl updateInfo={updateInfo} closeSearch={closeSearch}/>
          <div id='map'></div>
        </div>

}