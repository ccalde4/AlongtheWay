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



        constructor(props){
        super(props);

        this.state ={
          inSearch: false,
          focus: 0,
          force: false,
          destination: [" "],
          destinationId:[" "],
          predictions: [],
          pointCoords: [],
          CoordsArray: [],
         };

              key = Config.getConfig().creds.key;
              url = Config.getConfig().url2;
         }





    //function to keep track of what searbarInput is focused on
      onFocus(index){
        this.setState({focus:index});
      }
    //function to keep track if inSearch to help with proper rendering
      inSearch(){
          this.setState( (previousState) => ({inSearch: !previousState.inSearch}) );
        }

         //function to update the destination from searhcbar if edited
       updateDestinations(index,destId,destName){
           let x = this.state.destinationId;
           x[index] = destId;
           this.setState({destinationId:x});

           let y = this.state.destination;
           y[index] = destName;
           this.setState({destination:y});

        }

        //removes this destination from destinations array
       removeDestination(index){
           let x = this.state.destinationId;
           x[index] = " ";
           // x = x.splice(index,1);
           this.setState({destinationId:x});

           let y = this.state.destination;
           y[index] = " ";
          // y = y.splice(index);
           this.setState({destination:y});


         }

         // function to add a new searchbar when addstop is clicked
       addSearchBar(){
                   if(this.state.destination[this.state.destination.length-1]=== " "){
                      return;
                   }
                   let x = this.state.destinationId;
                   x.push(" ");
                   this.setState({destinationId:x});

                   let y = this.state.destination;
                   y.push(" ");
                   this.setState({destination:y});
                   this.setState( (previousState) => ({force: !previousState.force}) );

                  }
            //When go is Clicked this is this generates query to goo to return polyline going through each waypoint
       async  getRoute(){
            var waypoints = "place_id:"+this.state.destinationId[0];
            for(let i = 1; i<this.state.destinationId.length-1; i++){
                if(this.state.destinationId[i] ===" "){
                   continue;
                }
                else{
                       waypoints += "|" + "place_id:" + this.state.destinationId[i]
                }
             }
             var end = this.state.destinationId[this.state.destinationId.length-1];
            //  console.log(waypoints);


           try {
           let getRoute =  url +  "/directions/json?origin=" + this.props.lat+","+this.props.long+
                  "&destination=place_id:"+end+"&waypoints="+waypoints+"&key="+key;
          // console.log(destination);
          const json =  await request(getRoute);
         // console.log(json);
          const points = PolyLine.decode(json.routes[0].overview_polyline.points);
          const pointCoords = points.map(point => {
            return { latitude: point[0], longitude: point[1] };
           });

         //  console.log(pointCoords);
           this.props.polyline(pointCoords);
           this.props.onSearch();


        } catch (error) {
          console.error(error);
        }


         }




         render(){

         //Handles logic of when to render Go or Add Stop button and also the searchbars
            return(

            <View style = {styles.container}>

                  { this.state.destination.map((item,index)=>{
                     let starter;
                     if(index ==0){
                        starter = true;
                     }else{
                         starter = false;
                     }

                  return(

                   <SearchBarInput start = {starter}
                                   name = {this.state.destination[index]}
                                   key = {index}
                                   index = {index}
                                   add = {this.updateDestinations.bind(this)}
                                   remove = {this.removeDestination.bind(this)}
                                   inSearch = {this.state.inSearch}
                                   onFocus = {this.onFocus.bind(this)}
                                   focus = {this.state.focus}
                                   onSubmitEditing = {()=>{}}
                                   lat = {this.props.lat}
                                   long = {this.props.long}
                                   Search =  {this.inSearch.bind(this)}
                                                                                                       />)


                   }) }

                  { !this.state.inSearch && this.state.destination[this.state.destination.length-1] !== " "?
                      <MoreStops text = {"Add a stop"}
                                 onPress = {this.addSearchBar.bind(this)}  /> : null}


                  {this.state.destination.length>=1&&!this.state.inSearch &&
                                                     this.state.destination[this.state.destination.length-1] !== " " ?

                       <MoreStops text = {"Go"}
                                  onPress = {this.getRoute.bind(this)}  /> : null}

                     { !this.state.inSearch ?
                        <MoreStops text = {"Cancel"}
                                   onPress = {this.props.onSearch}  /> : null}


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

