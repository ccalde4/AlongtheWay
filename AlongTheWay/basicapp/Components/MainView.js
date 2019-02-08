import React, {Component} from 'react';
import { Text, View, StyleSheet, Dimensions} from 'react-native';
import MapView from 'react-native-maps';
import MapGui from    '../Components/MapGui';
import mapstyle1 from '../MapStyles/mapstyle1.js';
import mapstyle2 from '../MapStyles/mapstyle2.js';


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 30.414175;
const LONGITUDE = -91.186256;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;



// This was just an experiment on how to call mapView
//This isnt used in the demo I made but if you call it it will work but buttons wont work. you can try replacing <MapGui /> with this.

export default class MainView extends Component {
constructor(props){
         super(props);

     }
  render() {
    return (

         <View style={styles.mapWindow} >

                 <MapView.Animated

                                 provider={'google'}
                                 style={styles.map}
                                 initialRegion={{
                                 latitude: LATITUDE,
                                 longitude: LONGITUDE,
                                 latitudeDelta: LATITUDE_DELTA,
                                 longitudeDelta: LONGITUDE_DELTA,
                               }}
                               customMapStyle={mapstyle2}
                               mapType = {'standard'}


                               />

         </View>



    );
  }
}







const styles = StyleSheet.create({

  map: {

      ...StyleSheet.absoluteFillObject,

    },
    mapWindow:{

    width: 400,
    height: 470,
    backgroundColor: 'green',
    padding: 10
    },
    Gui: {
       flexDirection: 'column',
      padding: 10,
      flex:1,
      backgroundColor: "pink",
      justifyContent: "space-around",
      alignItems: "center",
      },

});







