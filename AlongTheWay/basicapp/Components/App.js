import React, {Component} from 'react';
import {PermissionsAndroid, Alert,View} from 'react-native';
import firebase from 'react-native-firebase';
import Main from './Home/Main/Main';
import SearchBar from './Home/SearchBar';
import Options from './Home/Option';



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
            //function that actually gets user location
         async componentDidMount() {

          await request_location_runtime_permission();
           navigator.geolocation.getCurrentPosition(
                         position => {
                           this.setState({
                             latitude: position.coords.latitude,
                             longitude: position.coords.longitude
                           });
                         },
                         error => console.error(error),
                         { enableHighAccuracy: true, maximumAge: 2000, timeout: 20000 }
                       );


        }

     constructor(props){

     super(props);


     this.state = {
        initialized : true,
        isSearching : false,
        inOptions: false,
        isReviewing: false,
        latitude: null,
        longitude: null,
        radius: 1000,
        polyline: null,

        desc: "",
        reviews: [],
        mapsType: 'standard',
        close: false
     }



     }

          //toggle for options page, passed to ControlBar through Main and called by a button
       inOptions(){
        this.setState( previousState => ( {inOptions: !previousState.inOptions} ) );
        }

         //toggle for searching page, passed to DecoySearch through Main and called touchableOpacity
       onSearch(){
       this.setState( previousState => ( {isSearching: !previousState.isSearching} ) );
       }
       onDesc(des){
       this.setState({desc:des});

       }


        //function for updating radius, passed to Option and called by slider
       onRadiusChange(radius){
       // files.radius = radius;
        this.setState({radius});


       }


       onMapChange(map){
         this.setState({mapsType: map});

       }
        //called by searchBar to pass polyline to map for rendering
         addPoly(pol){
         this.setState({polyline:pol});

         }


      render(){

       if(this.state.latitude==null){
        return (<View/>);
       }
      if(!this.state.initialized){
        return (<View/>);
      }

               //returns Options page if true
           if(this.state.inOptions)
           {
           return( <Options onRadiusChange = {this.onRadiusChange.bind(this)}
                            radius = {this.state.radius}
                            onMapChange = {(map)=>{this.onMapChange(map)}}
                            inOptions = {this.inOptions.bind(this)} />)

          }

              //return SearchBar view if true
          if(this.state.isSearching)
          {
             return( <SearchBar onSearch = {this.onSearch.bind(this)}
                                lat = {this.state.latitude}
                                long = {this.state.longitude}
                                polyline = {this.addPoly.bind(this)}
                                desc = {this.onDesc.bind(this)}
                                                                   /> );
          }


              else
            return( <Main onSearch = {this.onSearch.bind(this)}
                          inOptions = {this.inOptions.bind(this)}
                          lat = {this.state.latitude}
                          long = {this.state.longitude}
                          radius = {this.state.radius}
                          polyline ={this.state.polyline}
                          mapsType = {this.state.mapsType}
                          desc = {this.state.desc}
                          />);



      }





}




