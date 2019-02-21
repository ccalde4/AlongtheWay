import React, {Component} from 'react';
import { Text, View,StyleSheet, Dimensions,ActivityIndicator} from 'react-native';
import ControlBar from '../Components/ControlBar';
import MapGui from '../Components/MapGui';
import SearchBar from '../Components/SearchBar';
import DecoySearch from '../Buttons/DecoySearch';
import {PermissionsAndroid,Alert} from 'react-native';
import DismissKeyboard from 'dismissKeyboard';




var foursquare = require('react-native-foursquare-api')({
  clientID: '1KVMYPHAH15IRBPS4AAA4PYAPXCSU15ACB20L0B1DRUDGFFX',
  clientSecret: '5O5Z3YVLXKYLF5HBRUQPVRIP5KFTUK2OIUJNI52DMFZEEMME',
  style: 'foursquare', // default: 'foursquare'
  version: '20190214' //  default: '20140806'
});


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
                "query": 'Coffee',
                "limit": "3"

              },

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


        onRedClicked(){
         //  this.setState( (previousState) => ({redClicked: !previousState.redClicked}) );

            if(this.state.mapsType ==='satellite'){ this.setState({ mapsType: 'standard'}) }
             else{ this.setState({mapsType: 'satellite'}) }
        }


        onPizzaClicked(){
          this.setState( (previousState) => ({pizzaClicked: !previousState.pizzaClicked}) );
          console.log(this.state.items.response.venues[1].name);
          console.log('hi from Test Button')
        }


        onCoffeeClicked(){
          this.setState( (previousState) => ({coffeeClicked: !previousState.coffeeClicked}) );
        }

        onMoreClicked(){
          this.setState( (previousState) => ({moreClicked: !previousState.moreClicked}) );
        }


        onBurgerClicked(){
        this.setState((previousState) => ( {burgerClicked: !previousState.burgerClicked} ));
         }


         onLocalClicked(){
         this.setState((previousState) => ( {localClicked: !previousState.localClicked} ));
          }



         onParksClicked(){
         this.setState((previousState) => ( {parksClicked: !previousState.parksClicked} ));
          }


        onCornClicked(){
          this.setState( (previousState) => ({cornClicked: !previousState.cornClicked}) );
          this.props.onReview();
        }


        onBurritoClicked(){
          this.setState( (previousState) => ({burritoClicked: !previousState.burritoClicked }) );
          this.props.inOptions();
        }


       onFetchClicked(){

        foursquare.venues.getVenues(this.state.params)
          .then( (venues) =>{Alert.alert("venues were fetched"); this.setState({items:venues}); console.log(this.state.items);} )

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

               />
           }

            {/*  <DecoySearch onSearch = {this.props.onSearch}/>  */}

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
   componentDidMount() {

         navigator.geolocation.getCurrentPosition( (position) =>
           {
            this.setState({
               lat: position.coords.latitude,
               long: position.coords.longitude,
             });
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

