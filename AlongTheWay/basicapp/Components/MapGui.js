import React, {Component} from 'react';
import { Text, View, StyleSheet, Dimensions} from 'react-native';
import MapView from 'react-native-maps';
import Callout from 'react-native-maps';
import mapstyle1 from '../MapStyles/mapstyle1';
import mapstyle2 from '../MapStyles/mapstyle2';


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


  const MapGui = ({mapsType,styling,lat,long,markers,region,radius}) =>(

      <MapView.Animated


                 mapType = {mapsType}
                 provider = {'google'}
                 style = {styling}



                 initialRegion={
                  {
                  latitude: lat,
                  longitude: long,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                  }

                 }



                customMapStyle = {mapstyle1}

               >
               <MapView.Marker
                        coordinate = {{
                        latitude: lat,
                        longitude: long

                         }

                        }
                        description = {'Current Location'}


                       />
                         <MapView.Circle
                          center = {
                          {
                          latitude: lat,
                          longitude: long

                                  }

                           }
                          radius = {radius}
                         strokeColor = { '#1a66ff' }

                         fillColor = { 'rgba(230,238,255,0.5)' }



                                  />


           </MapView.Animated>

)

export default MapGui;