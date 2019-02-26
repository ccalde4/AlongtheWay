import React, {Component} from 'react';
import { Text, View,StyleSheet,Keyboard, Dimensions,ActivityIndicator} from 'react-native';
import ControlBar from '../Components/ControlBar';
import MapGui from '../Components/MapGui';
import SearchBar from '../Components/SearchBar';
import DecoySearch from '../Buttons/DecoySearch';
import {PermissionsAndroid,Alert} from 'react-native';
import DismissKeyboard from 'dismissKeyboard';
import MapView, { AnimatedRegion, Animated } from 'react-native-maps';

var Places = require('../APIs/Places');
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
var query = "Donuts";

export default class Main extends Component {


        constructor(props)
       {
          super(props)

           this.state = {
             lat: null,
             long: null,

             radius: this.props.radius,
             params: {
                "ll": "30.414175,-91.186256",
                "query": `${query}`,
                "limit": "10"

              },
              region :null,

             center : false,
             mapsType: 'standard',
             redClicked: false, pizzaClicked: false, coffeeClicked: false, fetchClicked: false, moreClicked: false,
             burgerClicked: false, localClicked: false, parksClicked: false, cornClicked: false, burritoClicked: false,
             items: [],

             watchID: null
            }



              var filters = [this.state.pizzaClicked,this.state.coffeeClicked,this.state.burgerClicked,this.state.localClicked,
                             this.state.parksClicked,this.state.cornClicked,this.state.burritoClicked,this.state.moreClicked
                            ]

       }


       onRegionChange(region){
         this.setState({region})
          console.log(region)
       }

       goTo(){


       }


            //toggle for a button described in function name
        onRedClicked(){
          this.setState({
            region: {
               latitude: this.state.lat,
               longitude: this.state.long,
               latitudeDelta: LATITUDE_DELTA,
               longitudeDelta: LONGITUDE_DELTA,
                }
          })

         //   if(this.state.mapsType ==='satellite'){ this.setState({ mapsType: 'standard'}) }
           //  else{ this.setState({mapsType: 'satellite'}) }
         // this.setState( (previousState) => ({center: !previousState.center}) );

        }

             //toggle for "Test" Button click only after you click fetch
        onPizzaClicked(){
          this.setState({ burgerClicked: false});
          this.setState({ coffeeClicked: false});
          this.setState({ localClicked: false});
          this.setState( (previousState) => ({pizzaClicked: !previousState.pizzaClicked}) );
          this.setState({params: {
            "ll": "30.414175,-91.186256",
            "query": "Pizza",
            "limit": "10",
             "radius": `${this.state.radius}`

              }})


        }

             //toggle for a button described in function name
        onCoffeeClicked(){
        this.setState({ burgerClicked: false});
        this.setState({ pizzaClicked: false});
        this.setState({ localClicked: false});
        this.setState( (previousState) => ({coffeeClicked: !previousState.coffeeClicked}) );

          this.setState({params: {
             "ll": "30.414175,-91.186256",
             "query": "Coffee",
             "limit": "10",
              "radius": `${this.state.radius}`
              }})


        }
             //toggle for a button described in function name
        onMoreClicked(){
          this.setState( (previousState) => ({moreClicked: !previousState.moreClicked}) );
        }

              //toggle for a button described in function name
        onBurgerClicked(){
         this.setState({ coffeeClicked: false});
         this.setState({ pizzaClicked: false});
         this.setState({ localClicked: false});
         this.setState((previousState) => ( {burgerClicked: !previousState.burgerClicked} ));
               this.setState({params: {
               "ll": "30.414175,-91.186256",
               "query": "Burgers",
               "limit": "10",
               "radius":`${this.state.radius}`

                  }})

         }

              //toggle for a button described in function name
         onLocalClicked(){
         this.setState({ coffeeClicked: false});
         this.setState({ pizzaClicked: false});
         this.setState({ burgerClicked: false});
         this.setState((previousState) => ( {localClicked: !previousState.localClicked} ));
         this.setState({params: {
                        "ll": "30.414175,-91.186256",
                        "query": "Chicken",
                        "limit": "10",
                        "radius":`${this.state.radius}`
                           }})

          }


               //toggle for a button described in function name
         onParksClicked(){
         this.setState((previousState) => ( {parksClicked: !previousState.parksClicked} ));
          }

               //toggle for pulling up ReviewForm
        onCornClicked(){
          this.setState( (previousState) => ({cornClicked: !previousState.cornClicked}) );
          this.props.onReview();
        }

                //toggle for pulling up options page
        onBurritoClicked(){
          this.setState( (previousState) => ({burritoClicked: !previousState.burritoClicked }) );
          this.props.inOptions();
        }

               //Function for getting venues from foursquare Api
         onFetchClicked(){

        foursquare.venues.getVenues(this.state.params)
          .then( (venues) =>{ this.setState({items:venues.response}); } )

            .catch(
             function(err)
             {
              console.log(err);
              Alert.alert("error fetching");
              }
                );

       }




     render()
     {
      return (

       <View style={styles.Gui}  >


           {
              this.state.lat === null ? <ActivityIndicator size = 'large' color ='lightblue'/> :
               <MapGui

                mapsType ={this.state.mapsType}
                styling = {styles.map}
                lat = {this.state.lat}
                long = {this.state.long}
                markers = {this.state.items}
                radius = {this.state.radius}
                region = {this.state.region}
                onRegionChange = {this.onRegionChange.bind(this)}
               />

           }

            {
               this.state.lat === null ? null :
              <DecoySearch onSearch = {this.props.onSearch}/>
             }
           {
              this.state.lat === null ? null :
               <ControlBar

                red = {this.state.redClicked}           onRedClick = {this.onRedClicked.bind(this)}
                pizza = {this.state.pizzaClicked}       onPizzaClick = {this.onPizzaClicked.bind(this)}
                coffee = {this.state.coffeeClicked}     onCoffeeClick = {this.onCoffeeClicked.bind(this)}
                fetch = {this.state.fetchClicked}       onFetchClick = {this.onFetchClicked.bind(this)}
                more = {this.state.moreClicked}         onMoreClick = {this.onMoreClicked.bind(this)}
                burger = {this.state.burgerClicked}     onBurgerClick = {this.onBurgerClicked.bind(this)}
                local = {this.state.localClicked}       onLocalClick = {this.onLocalClicked.bind(this)}
                parks = {this.state.parksClicked}       onParksClick = {this.onParksClicked.bind(this)}
                corn = {this.state.cornClicked}         onCornClick = {this.onCornClicked.bind(this)}
                burrito = {this.state.burritoClicked}   onBurritoClick = {this.onBurritoClicked.bind(this)}

               />
            }

       </View>
      );
  }

    //Getting current location
   componentDidMount() {

         navigator.geolocation.getCurrentPosition( (position) =>
           {
            this.setState({
               lat: position.coords.latitude,
               long: position.coords.longitude,
             });
             this.setState({ region:{
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA
                          }});

           },
          (error) => console.log(error.message),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
                                                 );


               }


     componentWillUnmount(){ navigator.geolocation.clearWatch(this.watchID); }






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
    ...StyleSheet.absoluteFillObject,

   },


});

