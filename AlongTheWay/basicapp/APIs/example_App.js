import React, {Component} from 'react';
import {StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import Foursquare from './basicapp/APIs/Foursquare/Foursquare';
import Google from './basicapp/APIs/Google/Google';
import Yelp from './basicapp/APIs/Yelp/Yelp';


  //************COPY AND PASTE THIS IN App.js AND RUN(react-native log-android) TO SEE HOW APIS WORK************\\
var google
var foursquare;
var yelp;
export default class App extends Component {
  constructor(){
  super();

   foursquare = new Foursquare();
   google     = new Google();
   yelp       = new Yelp();

  }


       async hi(){

                   //some params notation differs slightly depending on provider, website has list of available params
                         foursquare.setParams({
                                                ll: "30.414175,-91.186256",
                                                limit: "5",
                                                radius: "1000",
                                                query:"pizza"
                                                });
                          google.setParams({
                                                location: "30.414175,-91.186256",
                                                type: "restaurant",
                                                keyword: "pizza",
                                                radius: "1000"
                              });
                          yelp.setParams({
                                                latitude: "30.414175",
                                                longitude: "-91.186256",
                                                term: "pizza",
                                                radius: "1000",
                                                limit: 5
                                         });

                            //**Comment out some of these so that the console isn't as hard to read**\\


                           //returns info for given place by its id (no params needed atm)
                           //each id given for a result cant be used for another api(i think) ex. a venueId from foursquare wont work for yelp or google
                               //details for little caesars on Highland
                            console.log("------------------------------------------")
                            let data1 = await google.getDetails("ChIJzTN-vSinJoYRRPtwbgRHuJo");
                            console.log(data1);


                            //returns results of search based of given params
                            console.log("------------------------------------------")
                            let data2 = await google.search();
                            console.log(data2);


                             //details for little caesars on Highland
                           console.log("------------------------------------------")
                            let data3 = await foursquare.getDetails("4d92867a14228cfa53e14e7b");
                             console.log(data3);

                             //returns results of search based of given params
                           console.log("------------------------------------------")
                            let data4 = await foursquare.search();
                             console.log(data4);

                            //details for little caesars on Highland
                           console.log("------------------------------------------")
                            let data5 = await yelp.getDetails("qD45jQgzuQAqA1fAYHFOuA");
                            console.log(data5);

                            //returns results of search based of given params
                           console.log("------------------------------------------")
                            let data6 = await yelp.search();
                            console.log(data6);

                           console.log("------------------------------------------")
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