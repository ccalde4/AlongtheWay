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

     constructor(props){
     super(props);
     this.state = {
        isSearching : false,
     }

     }

       onSearch(){
       this.setState(previousState => (

                     {isSearching: !previousState.isSearching }
                                                                 )
                             );

       }
     async componentDidMount() {

    await request_location_runtime_permission()

  }


      render(){

     {
          if(!this.state.isSearching)
          {return( <Main onSearch = {this.onSearch.bind(this)}/> );}
          else
          {return( <SearchBar/> );}
     }

      }


}





