import React, {Component} from 'react';
import {PermissionsAndroid, Alert,View} from 'react-native';
import firebase from 'react-native-firebase';
import Main from './Home/Main/Main';
import SearchBar from './Home/SearchBar';
import Options from './Home/Option';
import ReviewForm from './Home/ReviewForm';
import Save from  '../utils/AutoSave';
import files from '../utils/Files';
import Initialize from '../utils/Initialize';

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
          //window.addEventListener('beforeunload', this.componentCleanup);
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
    console.log("IN APP");
     super(props);


     this.state = {
        initialized : false,
        isSearching : false,
        inOptions: false,
        isReviewing: false,
        latitude: null,
        longitude: null,
        radius: 1000,
        polyline: null,
        reviews: [],
        mapsType: 'standard',
        close: false
     }

     firebase.auth()
       .signInAnonymously()
       .then(credential => {
         if (credential) {
          // console.log('default app user ->', credential.user.toJSON());
         }
       });
      /*  fetch("https://us-central1-fir-demo-6977a.cloudfunctions.net/helloWorld")
              .then((response)=>{console.log(response)})
              .catch((err)=>{console.log(err)}) */

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
       // files.radius = radius;
        this.setState({radius});


       }

         //toggle for review page, passed to ControlBar through Main and called by a button
       onReview(){
       this.setState( previousState => ( {isReviewing: !previousState.isReviewing} ) );
       }

         //function for adding reviews to reviews array, passed to ReviewForm and called by enter button
       addReview(userReview){

         this.state.reviews.push(userReview);
          console.log(this.state.reviews);
         // this.onReview();
         this.setState( previousState => ( {isReviewing: !previousState.isReviewing} ) );
         }
       goTo(item){
        console.log(item)
       }
       onMapChange(map){
         this.setState({mapsType: map});

       }
         sendBack(item){
         console.log(item);

         }
         addPoly(pol){
         this.setState({polyline:pol});
        // console.log(this.state.polyline);
         }

         fakeClose(){
          // this.forceUpdate();
         console.log("hi there");
          //this.setState({close:true});
         }
      render(){
      console.log(this.state.latitude);
       if(this.state.latitude==null){
        return (<View/>);
       }
      if(!this.state.initialized){
        return (<View/>);
      }
    console.log("rending App")
               //returns Options page if true
           if(this.state.inOptions)
           {
           return( <Options onRadiusChange = {this.onRadiusChange.bind(this)}
                            radius = {this.state.radius}
                            onMapChange = {(map)=>{this.onMapChange(map)}}
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
                                goTo = {this.goTo.bind(this)}
                                lat = {this.state.latitude}
                                long = {this.state.longitude}
                                polyline = {this.addPoly.bind(this)}
                                sendBack = {this.sendBack.bind(this)}
                                                                   /> );
          }


              // returns Main if nothing else is toggled(default view)
            return( <Main onSearch = {this.onSearch.bind(this)}
                          inOptions = {this.inOptions.bind(this)}
                          lat = {this.state.latitude}
                          long = {this.state.longitude}
                          radius = {this.state.radius}
                          polyline ={this.state.polyline}
                          mapsType = {this.state.mapsType}
                          close = {this.fakeClose.bind(this)}
                          onReview = {this.onReview.bind(this)}/>);



      }


         async componentWillMount(){
         //window.addEventListener('beforeunload', this.componentCleanup);
           let l = await Initialize.start();

               console.log("in app"+files.radius);
           let testLoad2 = 'standard';
           files.mapsType = testLoad2;
           files.index = 0;

           this.setState({radius:files.radius});
           this.setState({mapsType:files.mapsType});
           this.setState({initialized:true});

         }

        async componentWillUnMount(){
             await Save.save();
      //  window.removeEventListener('beforeunload', this.componentCleanup);
         files.mapsType = this.state.mapsType;
         //Save.save();
         }


}




