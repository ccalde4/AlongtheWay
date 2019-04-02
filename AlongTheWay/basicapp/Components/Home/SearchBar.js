import React, { Component } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import MapView, { Polyline, Marker,Callout } from "react-native-maps";
import _ from "lodash";
import Button from 'react-native';
import PolyLine from "@mapbox/polyline";
import request from '../../APIs/_lib/request';
import Config from '../../APIs/Google/config/config';
import SearchBarInput from './comps/SearchBarInput';
import MoreStops from './comps/MoreStop';
import Predictions from './comps/Predictions';
var dest = "";
var key;
var url;
var stopCount;
export default class SearchBar extends Component {

       sendBack(){
        this.props.sendBack(this.state.destination);

       }

        constructor(props){
        super(props);
        this.state ={
         stopCount: 0,
         error: "",
         latitude: 0,
         longitude: 0,
         destination: "",
         destinations: [],
         predictions: [],
         pointCoords: [],

         lat: 0,
         long: 0

         };
         this.onChangeDestinationDebounced = _.debounce(
               this.onChangeDestination,
               1000
             );

              key = Config.getConfig().creds.key;
              url = Config.getConfig().url2;
         }

          componentDidMount() {
             navigator.geolocation.getCurrentPosition(
               position => {
                 this.setState({
                   latitude: position.coords.latitude,
                   longitude: position.coords.longitude
                 });
               },
               error => console.error(error),
               { enableHighAccuracy: true, maximumAge: 2000, timeout: 20000 }
             );
           }

    async getRouteDirections(destinationPlaceId, destinationName) {
       var getRoute =  url +  "/directions/json?origin=" + this.state.latitude+","
                                    +this.state.longitude+"&destination=place_id:"+destinationPlaceId+"&key="+key;
        try {

          const json =  await request(getRoute);
          console.log(json);

          const points = PolyLine.decode(json.routes[0].overview_polyline.points);

          const pointCoords = points.map(point => {
            return { latitude: point[0], longitude: point[1] };
          });


          this.setState({
            pointCoords,
            predictions: [],
            destination: destinationName

          });
          Keyboard.dismiss();
         // this.map.fitToCoordinates(pointCoords);
        } catch (error) {
          console.error(error);
        }
      }


    async onChangeDestination(destination) {


        var onChangeDestination = url +"/place/autocomplete/json?key="+key+"&input="+destination+"&location="
                                      +this.state.latitude+","+this.state.longitude+"&radius="+2000;




        try {
         const json = await request(onChangeDestination);
          this.setState({
            predictions: json.predictions
          });
        //  console.log(json);
        } catch (err) {
          console.error(err);
        }
      }


          incrStopCount(){
          let l = this.state.stopCount+1;
          this.setState({stopCount:l,predictions:[]});
         // this.predictionClick();
          }

          predictionClick(place_id,description){

           this.getRouteDirections(
                           place_id,
                           description
                         );

              this.incrStopCount();

          }

          onChangeText(text){
           this.dest = text;
           console.log(this.dest);
            this.onChangeDestinationDebounced(text);
            this.setState({ destination:text });

          }


         render(){
            return(
              <View style = {styles.container}>
              <View style = {styles.map}/>
               <SearchBarInput value = {this.test}
                               onChangeText = {this.onChangeText.bind(this)}
                               onSubmitEditing = {()=>{}}
                                                                           />
              {this.state.stopCount>0 ?

               <SearchBarInput value = {this.test}
                                             onChangeText = {this.onChangeText.bind(this)}
                                             onSubmitEditing = {()=>{}}
                                                                                         />


              :null}
              {!this.state.predictions == [] ? this.state.predictions.map(prediction => {

                   return(
                    <Predictions
                              onClick = {this.predictionClick.bind(this)}
                              key = {prediction.id}
                                    {...prediction}
                                                                    />
                           )
                         }
                        )



              :null}
              {this.state.stopCount==1 ? <MoreStops text = {"Add Stop"}     />: null}
              {this.state.stopCount==2 ? <MoreStops text = {"Remove Stop"} /> : null}
              </View>
            )




         }

     }



const styles = StyleSheet.create({

    stopButton: {
            backgroundColor: "white",
                    marginTop: 15,
                    margin: 10,
                    padding: 15,
                    fontSize: 20,
                    paddingLeft: 10,
                    paddingRight: 10,
                    borderRadius: 15,
                    textDecorationColor: "red"

        },

    bottomButton: {
        backgroundColor: "white",
        marginTop: 50,
        margin: 20,
        padding: 15,
        fontSize: 30,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 10,
        alignSelf: "center"
    },

   suggestions: {
      backgroundColor: "white",
      padding: 5,
      fontSize: 18,
      borderWidth: 0.5,
      marginLeft: 5,
      marginRight: 5
    },
    suggestionsTwo: {
          backgroundColor: "white",
          padding: 5,
          fontSize: 18,
          borderWidth: 0.5,
          marginLeft: 5,
          marginRight: 5
        },
    destinationInput: {
      height: 40,
      borderWidth: 0.5,
      marginTop: 50,
      borderRadius: 10,
      marginLeft: 5,
      marginRight: 5,
      padding: 5,
      backgroundColor: "white"
    },
    Stops: {
          height: 40,
          borderWidth: 0.5,
          marginTop: 10,
          borderRadius: 10,
          marginLeft: 5,
          marginRight: 5,
          padding: 5,
          backgroundColor: "white"
        },
    container: {
        ...StyleSheet.absoluteFillObject
      },
    map: {
        ...StyleSheet.absoluteFillObject
      },
    popup:{
           flex: 0.75,
           flexDirection: 'row',
           backgroundColor: 'white',
          // borderRadius: 30,
          // height: winHeight,
          //width: winWidth,
           justifyContent: 'center',
           alignItems: 'center'

           },

    insideOfPopup:{
           flex: 0.8,

           },
    nameText:{
                   color: 'black',
                    fontSize: 24,
                    fontWeight: 'bold',
                    }

});

