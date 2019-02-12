import React, {Component} from 'react';
import { Text, View, StyleSheet, Dimensions} from 'react-native';
import MapView from 'react-native-maps';
import mapstyle1 from '../MapStyles/mapstyle1';
import mapstyle2 from '../MapStyles/mapstyle2';


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 30.414175;
const LONGITUDE = -91.186256;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


  const MapGui = ({mapsType,styling}) =>(

      <MapView.Animated


                 mapType = {mapsType}
                 provider = {'google'}
                 style = {styling}
                 initialRegion={
                  {
                  latitude: LATITUDE,
                  longitude: LONGITUDE,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                  }
                 }
                customMapStyle = {mapstyle2}

               />

)

export default MapGui;