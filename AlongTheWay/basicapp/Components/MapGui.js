import React, {Component} from 'react';
import { Text, View, StyleSheet, Dimensions} from 'react-native';
import MapView from 'react-native-maps';
import mapstyle1 from '../MapStyles/mapstyle1';
import mapstyle2 from '../MapStyles/mapstyle2';


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


  const MapGui = ({mapsType,styling,lat,long}) =>(

      <MapView.Animated


                 mapType = {mapsType}
                 provider = {'google'}
                 style = {styling}

                 region={
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

                       />
           </MapView.Animated>

)

export default MapGui;