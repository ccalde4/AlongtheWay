import React, {Component} from 'react';
import {StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import Config from './APIs/Foursquare/config/config';
import Foursquare from './APIs/Foursquare/Foursquare';
import Google from './APIs/Google/Google';
import Yelp from './APIs/Yelp/Yelp';


  //************COPY AND PASTE THIS IN App.js AND RUN(react-native log-android) TO SEE HOW APIS WORK************\\
var google
var foursquare;
var yelp;
export default class App extends Component {
  constructor(){
  super();

   foursquare = new Foursquare();
   google = new Google();
   yelp = new Yelp();
  }


        hi(){

                   //some params notation differs slightly depending on provider, website has list of available params
             foursquare.setParams({
                                    ll: "30.414175,-91.186256",
                                    limit: "1",
                                    radius: "1000",
                                    intent:"browse"
                                    });
              google.setParams({
                                    location: "30.414175,-91.186256",
                                    type: "restaurant",
                                    keyword: "coffee",
                                    radius: "1000"
                  });
              yelp.setParams({
                                    latitude: "30.414175",
                                    longitude: "-91.186256",
                                    term: "food",
                                    radius: "1000"
                             });
               //returns info for given place by its id (no params needed atm)
               //each id given for a result cant be used for another api(i think) ex. a venueId from foursquare wont work for yelp or google
               yelp.getDetails("rdjLjIlAjaZ2rxmWf-V5HQ")
               .then((response)=>{console.log(response)})
               .catch((error)=>{console.log(error)});


               //returns results of search based of given params
               foursquare.search()
               .then((results)=>{console.log(results)})
               .catch((error)=>{console.log(error)});

              //Comment out some of these so that the console isnt as hard to read

              google.getDetails("ChIJdU4_JianJoYReG7XAV8wXP0")
              .then((response)=>{console.log(response)})
              .catch((error)=>{console.log(error)});
  }

  render() {
    return (
      <View style={styles.container}>
      <TouchableOpacity style = {styles.button} onPress = {this.hi} >
        <Text style={styles.welcome}>Hi!</Text>
       </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button:{
  width: 50,
  height: 50,
  backgroundColor: "red"
  }
});