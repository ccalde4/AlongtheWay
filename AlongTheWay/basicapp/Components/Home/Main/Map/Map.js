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


  export default class MapGui extends Component {
    constructor(props){
    super(props);
    this.state = {
    markerClicked: false,
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
   handlePress(pressedMarker){
   this.setState((previousState) => ({markerClicked: !previousState.markerClicked}))
   this.props.onMarkerClicked(pressedMarker);
   <MarkerPopup location = {pressedMarker.response.venue.location}
                                  name = {pressedMarker.response.venue.name}
                                  id = {pressedMarker.response.venue.id}
                                  contact = {pressedMarker.response.venue.contact}
                                  rating = {pressedMarker.response.venue.rating}/>

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
       { this.props.polyline ?<Polyline
                         coordinates={this.props.polyline}
                         strokeWidth={4}
                         strokeColor="red"
                       />
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
            this.props.markers ? this.props.markers.map(marker => {return(
                      <Marker
                             key = {marker.id}
                             coordinate={ {latitude: marker.location.lat,
                                           longitude: marker.location.long} }
                           title={marker.name}
                           identifier = {marker.id}
                           description={marker.location.address1}
                           //onPress = {() => {this.handlePress(marker)}}
                           //onPress = {this.handlePress}

                             pinColor = {'turquoise'}
                       >

                           <Callout>
                            <MarkerPopup location = {marker.location}
                                          name = {marker.name}
                                          id = {marker.id}
                                          contact = {marker.contact}
                                          rating = {marker.rating}/>

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
