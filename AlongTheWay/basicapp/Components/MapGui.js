import React, {Component} from 'react';
import { Text, View, StyleSheet, Dimensions,TouchableOpacity} from 'react-native';
import MapView, {Marker,Circle, Animated,Callout} from 'react-native-maps';
import mapstyle1 from '../MapStyles/mapstyle1';
import mapstyle2 from '../MapStyles/mapstyle2';
import mapstyle3 from '../MapStyles/mapstyle3';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


  export default class MapGui extends Component {

   shouldComponentUpdate(newProps,newState){
       if(this.props.center!==newProps.center){
         return true;
       }
       if(this.props.radius!==newProps.radius){
         return true;
       }

   if(this.props.render!==newProps.render){
     return true;
   }
   return false;

   }
   render(){
   console.log("I rendered!!! at MapGui")
   return(
      <Animated
                  ref = {(map)=>{this.map = map}}
                  mapType = {this.props.mapsType}
                  provider = {'google'}
                  customMapStyle = {mapstyle1}
                  style = {this.props.styling}
                  initialRegion={{
                  latitude: this.props.lat,
                  longitude: this.props.long,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                  }}
                  region = {this.props.region}
                  onRegionChangeComplete = {this.props.onRegionChange}
      >

      <Marker
                 coordinate = {{latitude: this.props.lat,longitude: this.props.long}}
                 title = {'Current Location'}
                 pinColor = {'indigo'}


      />

       <Circle
                 center = {{latitude: this.props.lat,
                            longitude: this.props.long }}
                 radius = {this.props.radius}
                 strokeColor = { '#1a66ff' }
                 fillColor = { 'rgba(230,238,255,0.5)' }

       />

         {
          this.props.markers.venues ? this.props.markers.venues.map(marker => {return(
           <Marker
                  key = {marker.id}
                  coordinate={ {latitude: marker.location.lat,
                                longitude: marker.location.lng} }
                //title={marker.name}
                //identifier = {marker.name}
                //description={marker.location.address}
                //onPress = {onCornClick}
                  onPress={e => console.log(e.nativeEvent.id)}
                  pinColor = {'turquoise'}
            >
                 <Callout>
                   <View style = {styles.call}>
                     <Text style = {styles.text}> {marker.name} </Text>
                   </View>
                  </Callout>
            </Marker>
           ) })
           : console.log("no markers")
         }

      </Animated>
      );
      }
}

  const styles = StyleSheet.create({
    call:{
    flex: 1,
    flexDirection: 'row',
    height: 80,
    width: 100,
    backgroundColor: 'lavender',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'


    },
    text:{
    fontSize: 10,
    paddingLeft:20

    }



  });
