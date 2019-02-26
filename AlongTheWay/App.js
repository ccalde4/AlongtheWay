/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import { Text, View,StyleSheet} from 'react-native';
import ControlBar from './basicapp/Components/ControlBar';
import MapGui from './basicapp/Components/MapGui';
import Main from './basicapp/Components/Main';
import SearchBar from './basicapp/Components/SearchBar';
import {Platform, PermissionsAndroid, Alert} from 'react-native';
import Options from './basicapp/Components/Option'
import ReviewForm from './basicapp/Components/ReviewForm';
import firebase from 'react-native-firebase';


  //Function to gain access to user Location
export async function request_location_runtime_permission() {
try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'ReactNativeCode Location Permission',
        'message': 'ReactNativeCode App needs access to your location '
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {

     // Alert.alert("Location Permission Granted.");
    }
    else {

      Alert.alert("Location Permission Not Granted");

    }
  } catch (err) {
    console.warn(err)
  }



}

export default class App extends Component {

         async componentDidMount() {

          await request_location_runtime_permission()

        }

     constructor(props){
     super(props);
     this.state = {
        isSearching : false,
        inOptions: false,
        isReviewing: false,
        radius: 1000,
        reviews: [],
        mapsType: 'standard'
     }
     firebase.auth()
       .signInAnonymously()
       .then(credential => {
         if (credential) {
           console.log('default app user ->', credential.user.toJSON());
         }
       });

     }
          //toggle for options page, passed to ControlBar through Main and called by a button
        inOptions(){
        this.setState( previousState => ( {inOptions: !previousState.inOptions} ) );
        }

         //toggle for searching page, passed to DecoySearch through Main and called touchableOpacity
       onSearch(){
       this.setState( previousState => ( {isSearching: !previousState.isSearching} ) );
       }

        //function for updating radius, passed to Option and called by slider
       onRadiusChange(radius){
        this.setState({radius: radius});
        console.log(this.state.radius);
       }

         //toggle for review page, passed to ControlBar through Main and called by a button
       onReview(){
       this.setState( previousState => ( {isReviewing: !previousState.isReviewing} ) );
       }

         //function for adding reviews to reviews array, passed to ReviewForm and called by enter button
       addReview(userReview){

         this.state.reviews.push(userReview);
          console.log(this.state.reviews);
          this.onReview();
         }
      goTo(item){
    console.log(item)
      }

      render(){



               //returns Options page if true
           if(this.state.inOptions)
           {
            return( <Options onRadiusChange = {(radius) => {this.onRadiusChange(radius)}}
                             radius = {this.state.radius}
                             inOptions = {this.inOptions.bind(this)} />)

           }
             //returns ReviewForm if true
          if(this.state.isReviewing)
          {
             return( <ReviewForm addReview = {(userReview) => {this.addReview(userReview)}}/> );
          }
              //return SearchBar view if true
          if(this.state.isSearching)
          {
             return( <SearchBar onSearch = {this.onSearch.bind(this)}
                                goTo = {this.goTo.bind(this)}    /> );
          }


              // returns Main if nothing else is toggled(default view)
            return( <Main onSearch = {this.onSearch.bind(this)}
                          inOptions = {this.inOptions.bind(this)}
                          radius = {this.state.radius}
                          onReview = {this.onReview.bind(this)}/> );



      }


}




