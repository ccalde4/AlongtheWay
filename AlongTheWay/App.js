/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import { Text, View,StyleSheet, KeyboardAvoidingView,Keyboard, Platform, PermissionsAndroid, Alert} from 'react-native';
import ControlBar from './basicapp/Components/ControlBar';
import MapGui from './basicapp/Components/MapGui';
import Main from './basicapp/Components/Main';

export async function request_location_runtime_permission(){

    try{
        const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
            'title': 'ReactNativeCode Location Permission',
            'message': 'ReactNativeCode App needs access to your location '
        }
       )
       if (granted === PermissionsAndroid.RESULTS.GRANTED) {

        Alert.alert("Location Permission Granted.");
       }
       else {

        Alert.alert("Location Permission Not Granted");

       }
    } catch (err){
      console.warn(err)
    }
}

export default class App extends Component {

      render(){

      return(

      <Main/>

      );

      }

      async componentDidMount(){
              await request_location_runtime_permission()

          }

         /* render() {
            return(
                <View style={styles.MainContainer}>

                    <Text>React Native Runtime Permission Request</Text>

                </View>
            );

      }*/
}

const styles = StyleSheet.create({
    MainContainer:{
    flex:1,
    paddingTop: (Platform.OS) === 'ios' ? 20:0,
    justifyContent: 'center',
    margin: 20
    }
    });









