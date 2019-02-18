import React, {Component} from 'react';
import { Text, View,StyleSheet, KeyboardAvoidingView,Keyboard} from 'react-native';
import ControlBar from '../Components/ControlBar';
import MapGui from '../Components/MapGui';
import SearchBar from '../Components/SearchBar';
import MapView, {Marker} from "react-native-maps";


export default class Main extends Component {


        constructor(props)
       {
          super(props)

           this.state = {

             mapsType: 'standard',
             redClicked: true,
             latitude: null,
             longitude: null,
             radius: 1000
            }
       }



       onRedClick()
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


  componentDidMount() {
      navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude:       position.coords.latitude,
          longitude:      position.coords.longitude,
          error: null
        });
        },
        error => this.setState({error: error.message}),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 2000}
    );
}

componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

    onRegionChange(region, lastLat, lastLong) {
        this.setState({
          mapRegion: region,
          // If there are no new values set the current ones
          lastLat: lastLat || this.state.lastLat,
          lastLong: lastLong || this.state.lastLong
        });
      }


    render() {
        return (
        <View style={styles.container}>
          {this.state.latitude === null ? <Text> Loading </Text> : <MapGui
            mapsType = {this.state.mapsType}
            lat = {this.state.latitude}
            long = {this.state.longitude}
            styling = {styles.map2}
            radius = {this.state.radius}
          />

          /* <Marker coordinate={this.state}/> */
             }
           <ControlBar redClick = {this.onRedClick.bind(this)}/>
           </View>
           );
        }
  }




const styles = StyleSheet.create({
  Gui: {
  flexDirection: 'column',
  padding: 10,
  flex:1,
  backgroundColor: "pink",
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

        container: {


       flexDirection: 'column',
       padding: 10,
       flex: 1,
       backgroundColor: 'pink',
       justifyContent: 'space-around',
       alignItems: "center"
        },





});


