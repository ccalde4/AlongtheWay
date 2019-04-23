import React, {Component} from 'react';
import { Text, View, StyleSheet, Dimensions,TouchableOpacity} from 'react-native';
import MapView, {Marker,Circle, Animated,Callout,Polyline} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
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


    Color: ["red","lightblue","blue"]
    }
  //  console.log("file:///data/user/0/com.alongtheway/cache/7udede_15@2.625x.png");
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
       if(this.props.dist!==newProps.dist){
               return true;
              }

       if(this.props.render!==newProps.render){
                return true;
       }
   return false;

   }

//handles the event when a marker is pressed
   handlePress(index){

          this.props.onMarkerClick(index);

          }


   fitMap(){
      if(this.props.polyline){


    return this.map.fitToCoordinates(this.props.polyline);
    }
    else{

    }
   }

   render(){
   console.log("I rendered!!! at MapGui");
   //console.log(this.props.polyline);


   return(
      <MapView    onLayout = {()=>{}}
                  ref = {(map)=>{this.map = map}}
                  mapType = {this.props.mapsType}
                  provider = {'google'}
                  showsUserLocation = {true}
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



       {this.props.polyline?


        <Marker
                        coordinate = {this.props.polyline[this.props.polyline.length-1]}
                        title = {'Destination'}
                        pinColor = {"purple"}
             >
               <Icon name = "map-pin" size = {40} color = "orange"/>
             </Marker>

       :null}





       { this.props.dist  ? this.props.dist.map((item,index)=>{ return(

            <Circle                 key = {index}
                                    center = {item}
                                    radius = {40000}
                                    strokeColor = { 'lightgray' }
                                    fillColor = { 'rgba(230,238,255,0.5)' }

                         />

       )

       })

       :null }
       { this.props.dist ? this.props.dist.map((item,index)=>{ return(

                   <Marker                 tracksViewChanges = {false}
                                           key = {index}
                                           coordinate = {item}
                                           title = {""+index}
                                           pinColor = {'green'}

                                >
                     <Icon name = "map-pin" size = {17} color = "orange"/>
                   </Marker>
              )

              })

              :null}
       <Circle
                 center = {{latitude: this.props.lat,
                            longitude: this.props.long }}
                 radius = {this.props.radius}
                 strokeColor = { 'whitesmoke' }
                 fillColor = { 'rgba(230,238,255,0.5)' }

       />
           { this.props.polyline ? <Polyline            onLayout = {this.fitMap.bind(this)}
                                                        coordinates={this.props.polyline}
                                                        strokeWidth={4}
                                                        strokeColor="blue"
                                         />
                                         : null
                         }


         {
            this.props.markers ?  this.props.markers.map((marker,index) =>{ {return(
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

                           <Callout onPress = {() => {this.handlePress(index)}}>
                                   <View>
                                    <Text> {marker.name} {"\n"} {(marker.distance).toFixed(2)} {"mi. away"} </Text>
                                    <View>
                                   </View>
                                  </View>
                                   </Callout>

                           </Marker>

                       )}})
                      : console.log("no markers")
         }

      </MapView>
      );


      }
}
 //#1a66ff
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
