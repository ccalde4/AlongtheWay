import React, {Component} from 'react';
import { Text, View,StyleSheet, KeyboardAvoidingView,Keyboard, Dimensions,ActivityIndicator} from 'react-native';
import ControlBar from '../Components/ControlBar';
import MapGui from '../Components/MapGui';
import SearchBar from '../Components/SearchBar';
import DecoySearch from '../Buttons/DecoySearch';
import {PermissionsAndroid,Alert} from 'react-native';
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


var foursquare = require('react-native-foursquare-api')({
  clientID: '1KVMYPHAH15IRBPS4AAA4PYAPXCSU15ACB20L0B1DRUDGFFX',
  clientSecret: '5O5Z3YVLXKYLF5HBRUQPVRIP5KFTUK2OIUJNI52DMFZEEMME',
  style: 'foursquare', // default: 'foursquare'
  version: '20190214' //  default: '20140806'
});
/*var params = {
  "ll": "10.652814,-61.3969835",
  "query": 'Movie Towne',

};*/

export default class Main extends Component {


        constructor(props)
       {
          super(props)

           this.state = {
             lat: null,
             long: null,
             params: {
                            "ll": "30.414175,-91.186256",
                            "query": 'Coffee',


                          },
             isSearching: false,

             mapsType: 'standard',
             redClicked: false, pizzaClicked: false, coffeeClicked: false, fetchClicked: false, blueClicked: false,
             burgerClicked: false, localClicked: false, parksClicked: false, cornClicked: false, burritoClicked: false,
             items: [],

             watchID: null
            }

              var filters = [this.state.pizzaClicked,this.state.coffeeClicked,this.state.burgerClicked,this.state.localClicked,
                             this.state.parksClicked,this.state.cornClicked,this.state.burritoClicked
                            ]

       }


            makeFetchParams(){



            }






        onPizzaClicked(){
          this.setState(previousState => (

              {pizzaClicked: !previousState.pizzaClicked }
                                                          )
                      );
        }
        onCoffeeClicked(){
          this.setState(previousState => (

              {coffeeClicked: !previousState.coffeeClicked }
                                                          )
                      );
        }
        onBurgerClicked(){
          this.setState(previousState => (

              {burgerClicked: !previousState.burgerClicked }
                                                          )
                      );
        }
        onLocalClicked(){
                  this.setState(previousState => (

                      {localClicked: !previousState.localClicked }
                                                                  )
                              );
                }
        onParksClicked(){
          this.setState(previousState => (

              {parksClicked: !previousState.parksClicked }
                                                          )
                      );
        }
        onCornClicked(){
          this.setState(previousState => (

              {cornClicked: !previousState.cornClicked }
                                                          )
                      );
        }
        onBurritoClicked(){
          this.setState(previousState => (

              {burritoClicked: !previousState.burritoClicked }
                                                          )
                      );
        }

       onFetchClicked(){
        /*this.setState(previousState => (
          {fetchClicked: !previousState.fetchClicked }
           )
                   );
         */
           let params = this.state.params;

        foursquare.venues.getVenues(params)

        .then((venues) =>{ Alert.alert("venues were fetched"); this.setState({items:venues}); console.warn(this.state.items);
                   })

                 .catch(function(err){
                 console.log(err);
                 Alert.alert("error fetching");
              });


       }







     render() {
      return (

      <View style={styles.Gui}  >

           { this.state.lat === null ? <ActivityIndicator size = 'large' color ='lightblue'/> : <MapGui
             mapsType ={this.state.mapsType}
             styling = {styles.map2}
             lat = {this.state.lat}
             long = {this.state.long}
             markers = {this.state.items}

            /> }

             {/* <DecoySearch onSearch = {this.props.onSearch}/> */}

           { this.state.lat === null ? null : <ControlBar
              red = {this.state.redClicked}           onRedClick = {this.onRedClicked.bind(this)}
              pizza = {this.state.pizzaClicked}       onPizzaClick = {this.onPizzaClicked.bind(this)}
              coffee = {this.state.coffeeClicked}     onCoffeeClick = {this.onCoffeeClicked.bind(this)}
              fetch = {this.state.fetchClicked}       onFetchClick = {this.onFetchClicked.bind(this)}
              more = {this.state.moreClicked}
              burger = {this.state.burgerClicked}     onBurgerClick = {this.onBurgerClicked.bind(this)}
              local = {this.state.localClicked}       onLocalClick = {this.onLocalClicked.bind(this)}
              parks = {this.state.parksClicked}       onParksClick = {this.onParksClicked.bind(this)}
              corn = {this.state.cornClicked}         onCornClick = {this.onCornClicked.bind(this)}
              burrito = {this.state.burritoClicked}   onBurritoClick = {this.onBurritoClicked.bind(this)}


            /> }




      </View>


    );
  }
   componentDidMount() {

                    navigator.geolocation.getCurrentPosition(
                        position => {

                        this.setState({


                                   lat: position.coords.latitude,
                                    long: position.coords.longitude,


                                   });
                                    },
                             (error) => console.log(error.message),
                           { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
                            );


                                    /*   this.watchID = navigator.geolocation.watchPosition(
                                         position => {
                                         this.setState({

                                         lat: position.coords.latitude,
                                         long: position.coords.longitude,


                                          });
                                           },
                                           (error) => console.log(error.message),
                                                                      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
                                       ); */

               }
               componentWillUnmount() {
                 navigator.geolocation.clearWatch(this.watchID);
               }
                onRedClicked()
                      {
                          this.setState(previousState => (

                                  {redClicked: !previousState.redClicked }
                                                        )
                          );
                          if(this.state.redClicked)
                          {
                             this.setState(
                                { mapsType: 'standard'}
                             )
                          }
                          else
                          {
                              this.setState(
                                {mapsType: 'satellite'}
                              )
                          }
                      }



}



const styles = StyleSheet.create({
  Gui: {
  flexDirection: 'column',
  padding: 10,
  flex:1,
  backgroundColor: "gray",
  justifyContent: "space-around",
  alignItems: "center",
  },

    map: {
                width: 400,
                height: 400,

    },

        map2: {

                   ...StyleSheet.absoluteFillObject,





        },

button1: {
alignItems: 'center',
borderRadius: 50,
width: 50,
height: 50,
backgroundColor: 'red',
position: 'absolute',
top:10

},




});

