import React, { Component } from "react";
import { TextInput, StyleSheet, Text, View, Keyboard, TouchableHighlight, TouchableOpacity,Button,Dimensions,ScrollView} from "react-native";
import MapView, { Polyline, Marker,Callout } from "react-native-maps";
import _ from "lodash";
import PolyLine from "@mapbox/polyline";
import request from '../../APIs/_lib/request';
import Config from '../../APIs/Google/config/config';
import SearchBarInput from './comps/SearchBarInput';
import MoreStops from './comps/MoreStop';
import Predictions from './comps/Predictions';
var { winHeight, winWidth } = Dimensions.get('window');
var key;
var url;
export default class SearchBar extends Component {

       sendBack(){
        this.props.sendBack(this.state.destination);

       }

        constructor(props){
        super(props);

        this.state ={
          inSearch: false,
          stopCount: 0,
          focus: 1,
          destination: [""],

         predictions: [],
         pointCoords: [],
         };



              key = Config.getConfig().creds.key;
              url = Config.getConfig().url2;
         }
     addStop(destinationPlaceId,destinationName){
     let x = this.state.destination;
     x[this.state.stopCount] = destinationName;
     this.setState({destination:x});
     this.setState({predictions:[]});

     }


    async getRouteDirections(destinationPlaceId, destinationName) {
       var getRoute =  url +  "/directions/json?origin=" + this.props.lat+","
                                    +this.props.long+"&destination=place_id:"+destinationPlaceId+"&key="+key;
        try {
          const json =  await request(getRoute);

          const points = PolyLine.decode(json.routes[0].overview_polyline.points);

          const pointCoords = points.map(point => {
            return { latitude: point[0], longitude: point[1] };
          });
        // console.log(pointCoords.length);
       // const newCoordsArray = [...this.state.CoordsArray, pointCoords]
       // this.props.CoordsArray

          this.setState({
            pointCoords,

            predictions: [],
            destination: destinationName

          });

          Keyboard.dismiss();
          this.props.polyline(pointCoords);

        } catch (error) {
          console.error(error);
        }

      }

      onFocus(index){
        this.setState({focus:index});
      }

        inSearch(){
          this.setState( (previousState) => ({inSearch: !previousState.inSearch}) );

        }



         render(){


            return(

            <View style = {styles.container}>

               <SearchBarInput index = {1}
                               inSearch = {this.state.inSearch}
                               onFocus = {this.onFocus.bind(this)}
                               focus = {this.state.focus}
                               onSubmitEditing = {()=>{}}
                               lat = {this.props.lat}
                               long = {this.props.long}
                               Search =  {this.inSearch.bind(this)}
                                                                           />
               <SearchBarInput index = {2}
                               inSearch = {this.state.inSearch}
                               onFocus = {this.onFocus.bind(this)}
                               focus = {this.state.focus}
                               onSubmitEditing = {()=>{}}
                               lat = {this.props.lat}
                               long = {this.props.long}
                               Search =  {this.inSearch.bind(this)}
                                                                           />
               <SearchBarInput index = {3}
                               inSearch = {this.state.inSearch}
                               onFocus = {this.onFocus.bind(this)}
                               focus = {this.state.focus}
                               onSubmitEditing = {()=>{}}
                               lat = {this.props.lat}
                               long = {this.props.long}
                               Search =  {this.inSearch.bind(this)}
                                                                           />
            </View>
            );


         }

     }

const styles = StyleSheet.create({

container: {
flex: 1,
width: winWidth,
height: winHeight,
backgroundColor: 'lightblue'
}


});


