import React, {Component} from 'react';
import { Text, View, StyleSheet, Dimensions,TouchableOpacity} from 'react-native';
import MapView, {Marker,Circle, Animated,Callout,Polyline} from 'react-native-maps';
import mapstyle1 from './styles/mapstyle1';
import mapstyle2 from './styles/mapstyle2';
import mapstyle3 from './styles/mapstyle3';
import MarkerPopup from './comps/MarkerPopup';
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let i = 0;
  export default class MapGui extends Component {
    constructor(props){
    super(props);
    this.state = {
    markerClicked: false,
    Color: ["red","blue","black","green"]
    }

   // this.handlePress = this.handlePress.bind(this);
    }



   shouldComponentUpdate(newProps,newState){
       if(this.props.center!==newProps.center){
         return true;
       }
       if(this.props.radius!==newProps.radius){
         return true;
       }
       if(this.props.polyline!==newProps.polyline){
         return true;
       }

   if(this.props.render!==newProps.render){
     return true;
   }
   return false;

   }
  handlePress(index){

       this.props.onMarkerClick(index);

       }

   fitMap(){
   this.map.fitToCoordinates(this.props.polyline);
   }

   render(){
   console.log("I rendered!!! at MapGui");
   console.log(this.props.polyline);

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
       {this.props.polyline?


        <Marker
                        coordinate = {this.props.polyline[this.props.polyline.length-1]}
                        title = {'Destination'}
                        pinColor = {'blue'}


             />


       :null}
       { this.props.polyline ?
       this.props.polyline.map((pointCoords, index) =>
                <MapView.Polyline
                         index={index}
                         coordinates={pointCoords}
                         strokeWidth={4}
                         strokeColor={this.state.Color[i++]}
                       /> )
                       : null
       }
       <Circle
                 center = {{latitude: this.props.lat,
                            longitude: this.props.long }}
                 radius = {this.props.radius}
                 strokeColor = { '#1a66ff' }
                 fillColor = { 'rgba(230,238,255,0.5)' }

       />



         {
                           this.props.markers ? this.props.markers.map((marker,index) => {return(
                            <Marker
                                   key = {marker.id}
                                   coordinate={ {latitude: marker.location.lat,
                                                 longitude: marker.location.long} }
                                 title={marker.name}
                                 identifier = {marker.id}
                                 description={marker.address1}
                                 //onPress = {() => {this.handlePress(marker)}}
                                 //onPress = {this.handlePress}

                                   pinColor = {'turquoise'}
                             >

                                 <Callout onPress = {() => {this.handlePress(index)}}>
                                 <View>
                                  <Text> {marker.name} {"\n"} {(marker.distance).toFixed(2)} {"mi. away"} </Text>
                                  <View>

                                </View>
                                </View>
                                 </Callout>

                                 </Marker>

                             )})
                            : console.log("no markers")
                          }

      </Animated>
      );


      }
}

  const styles = StyleSheet.create({
    call:{

    //flexDirection: 'row',
    height: height,
    width: width,
    backgroundColor: 'lavender',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'


    },
    text:{
    fontSize: 10,
    paddingLeft:20

    }



  });
