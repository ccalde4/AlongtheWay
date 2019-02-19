/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import { Text, View,StyleSheet, KeyboardAvoidingView,Keyboard} from 'react-native';
import ControlBar from './basicapp/Components/ControlBar';
import MapGui from './basicapp/Components/MapGui';
import Main from './basicapp/Components/Main';
import SearchBar from './basicapp/Components/SearchBar';
import {Platform, PermissionsAndroid, Alert} from 'react-native';
import Options from './basicapp/Components/Option'
import ReviewForm from './basicapp/Components/ReviewForm';


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
        radius: 1000,
        isReviewing: false,
        inOptions: false,
        reviews: [],
        mapsType: 'standard'
     }

     }

        inOptions(){
        this.setState( previousState => ( {inOptions: !previousState.inOptions} ) );
        }

       onSearch(){
       this.setState( previousState => ( {isSearching: !previousState.isSearching} ) );
       }

       onRadiusChange(radius){
        this.setState({radius: radius});
        console.log(this.state.radius);
       }

       onReview(){
       this.setState( previousState => ( {isReviewing: !previousState.isReviewing} ) );

       }

       addReview(userReview){

         this.state.reviews.push(userReview);
          console.log(this.state.reviews);
          this.onReview();
         }


      render(){



     {
           if(this.state.inOptions)
           {
            return( <Options onRadiusChange = {(radius) => {this.onRadiusChange(radius)}}
                            radius = {this.state.radius} inOptions = {this.inOptions.bind(this)} />)

           }

          if(this.state.isReviewing)
          {
             return( <ReviewForm addReview = {(userReview) => {this.addReview(userReview)}}/> );
          }

          if(this.state.isSearching)
          {
             return( <SearchBar/> );
          }

          else
          {
            return( <Main onSearch = {this.onSearch.bind(this)} onReview = {this.onReview.bind(this)}
                                     inOptions = {this.inOptions.bind(this)} radius = {this.state.radius}
                                     onReview = {this.onReview.bind(this)}/> );
          }
     }

      }


}




