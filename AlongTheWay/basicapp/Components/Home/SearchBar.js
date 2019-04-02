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



export default class App extends Component {
        constructor(props){
        super(props);
        this.state ={
         error: "",
         latitude: 0,
         longitude: 0,
         destination: "",
         destinationtwo: "",
         predictions: [],
         pointCoords: [],
         predictionsTwo: [],
         lat: 0,
         long: 0

         };
         this.onChangeDestinationDebounced = _.debounce(
               this.onChangeDestination,
               1000
             );
         this.onChangeDestinationtwoDebounced = _.debounce(
                        this.onChangeDestinationtwo,
                        1000
                      );
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
    const apiKey = 'AIzaSyCvfftvHMnURvTGkaiVyHQMdcYsGZsCVNs';
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/directions/json?origin=
            ${this.state.latitude
            },${
              this.state.longitude
            }&destination=place_id:${destinationPlaceId}&key=${apiKey}`
          );




          const json = await response.json();
          console.log(json);
          const points = PolyLine.decode(json.routes[0].overview_polyline.points);
          //const distanceTime = {json.routes[1].overview_polyline.points}
          const pointCoords = points.map(point => {
            return { latitude: point[0], longitude: point[1] };
          });
          this.setState({
            pointCoords,
            predictions: [],
            destination: destinationName

          });
          Keyboard.dismiss();
          this.map.fitToCoordinates(pointCoords);
        } catch (error) {
          console.error(error);
        }
      }


    async onChangeDestination(destination) {
    const apiKey = 'AIzaSyCvfftvHMnURvTGkaiVyHQMdcYsGZsCVNs';
        const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=
        ${apiKey}
        &input=${destination}&location=${this.state.latitude},${
          this.state.longitude
        }&radius=2000`;
        console.log(apiUrl);
        try {
          const result = await fetch(apiUrl);
          const json = await result.json();
          this.setState({
            predictions: json.predictions
          });
          console.log(json);
        } catch (err) {
          console.error(err);
        }
      }


      async onChangeDestinationtwo (destinationtwo) {
          const apiKey = 'AIzaSyCvfftvHMnURvTGkaiVyHQMdcYsGZsCVNs';
              const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=
              ${apiKey}
              &input=${destinationtwo}&location=${this.state.lat},${
                this.state.long
              }&radius=2000`;
              console.log(apiUrl);
              try {
                const resultTwo = await fetch(apiUrl);
                const jsonTwo = await resultTwo.json();
                this.setState({
                  predictionsTwo: jsonTwo.predictions
                });
                console.log(jsonTwo);
              } catch (err) {
                console.error(err);
              }
            }


    render() {
         let marker = null;
         let distanceButton = null;
         let MoreStops = null;
         let location = null;
         let time = null;
         let SearchBarInput = null

         if (this.state.pointCoords.length > 1) {
           //Creates marker and has callout for info on marker
           marker = (
             <Marker
               coordinate = {this.state.pointCoords[this.state.pointCoords.length - 1]}>
               <MapView.Callout
                    style = {styles.popup}

                    >
                      <View style = {styles.insideOfPopup}>
                            <Text style = {styles.nameText} >

                                Hello

                            </Text>
                     </View>
             </MapView.Callout>
             </Marker>
           );

          // distanceButton = (
           //<View style = {styles.bottomButton}>
             //  <Text style = {styles.bottomButtonText}> Distance Time </Text>
           //</View>);

           SearchBarInput = (
                            <View>
                              <TextInput
                                   placeholder="Enter destination..."
                                   style={styles.Stops}
                                   value={this.state.destinationtwo}
                                   clearButtonMode="always"
                                   onChangeText={destinationtwo => {
                                   console.log(destinationtwo);
                                   this.setState({ destinationtwo });
                                   this.onChangeDestinationtwoDebounced(destinationtwo);
                                                  }}
                              />


                            </View>
                               );

            //Component to add more stops
         MoreStops = (

                    <TouchableOpacity style = {styles.stopButton}
                    onPress = {() => {SearchBarInput}  }
                    >
                          <Text>  Add Stop </Text>
                    </TouchableOpacity>
         );

         }

         const predictions = this.state.predictions.map(prediction => (
           <TouchableHighlight
             onPress={() =>
               this.getRouteDirections(
                 prediction.place_id,
                 prediction.description
               )


             }
             key={prediction.id}
           >
             <View>
               <Text style={styles.suggestions}>
                 {prediction.description}
               </Text>
             </View>
           </TouchableHighlight>
         ));



         const predictionsTwo = this.state.predictionsTwo.map(predictionTwo => (
                    <TouchableHighlight
                      onPress={() =>
                        this.getRouteDirections(
                          predictionTwo.place_id,
                          predictionTwo.description
                        )


                      }
                      key ={predictionTwo.id}
                    >
                      <View>
                        <Text style={styles.suggestionsTwo}>
                          {predictionTwo.description}
                        </Text>
                      </View>
                    </TouchableHighlight>
                  ));



         return (
           <View style={styles.container}>
             <MapView
               ref={map => {
                 this.map = map;
               }}
               style={styles.map}
                         region={{
                           latitude: this.state.latitude,
                           longitude: this.state.longitude,
                           latitudeDelta: 0.015,
                           longitudeDelta: 0.0121
                         }}
                         showsUserLocation={true}

             >
               <Polyline
                 coordinates={this.state.pointCoords}
                 strokeWidth={4}
                 strokeColor="red"
               />

               {marker}
             </MapView>

             <TextInput
               placeholder="Enter destination..."
               style={styles.destinationInput}
               value={this.state.destination}
               clearButtonMode="always"
               onChangeText={destination => {
                 console.log(destination);
                 this.setState({ destination });
                 this.onChangeDestinationDebounced(destination);
               }}

             />
             {SearchBarInput}

             {predictions}
             {predictionsTwo}
             {distanceButton}
             {MoreStops}


           </View>
         );
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

