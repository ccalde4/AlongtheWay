import React, {Component} from 'react';
import { Text, View, StyleSheet, Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Callout from 'react-native-maps';
import mapstyle1 from '../MapStyles/mapstyle1';
import mapstyle2 from '../MapStyles/mapstyle2';
import mapstyle3 from '../MapStyles/mapstyle3';
import FilterButton from '../Buttons/FilterButton';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


  const MapGui = ({mapsType,styling,lat,long,markers,region,radius,onRegionChange}) =>(

      <MapView.Animated
                  ref = {(map)=>{this.map = map}}
                  mapType = {mapsType}
                  provider = {'google'}
                  customMapStyle = {mapstyle1}
                  style = {styling}
                  initialRegion={{
                  latitude: lat,
                  longitude: long,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                  }}
                  region = {region}
                  onRegionChangeComplete = {onRegionChange}
      >

      <Marker
         coordinate = {{latitude: lat,longitude: long}}
                        title = {'Current Location'}

      />

         <MapView.Circle
           center = {{ latitude: lat, longitude: long }}
           radius = {radius}
           strokeColor = { '#1a66ff' }
           fillColor = { 'rgba(230,238,255,0.5)' }

          />

         {
          markers.venues ? markers.venues.map(marker => (
           <Marker
              key = {marker.id}
              coordinate={ {latitude: marker.location.lat,longitude: marker.location.lng} }
              title={marker.name}
              description={marker.location.address}
            />
            ))
           : console.log("no markers")
         }

      </MapView.Animated>
  )
export default MapGui;