import React, {Component} from 'react';
import { Text, View,StyleSheet,Keyboard, Dimensions,ActivityIndicator,PermissionsAndroid,Alert} from 'react-native';
import ControlBar from './Controls/Controls';
import MapGui from './Map/Map';
import DecoySearch from './comps/DecoySearch';

import MasterAPI from '../../../APIs/MasterAPI';
import MarkerSort from '../../../utils/MarkerSort';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

import files from "../../../utils/Files";
var masterAPI;
var markerSort;

export default class Main extends Component {


        constructor(props){
          super(props);

           this.state = {
             lat:            null,
             long:           null,
             params:{
                                latitude: '30.414175',
                                longitude:'-91.186256',
                                query:'',
                                limit: 30,
                                radius: this.props.radius,
                                categories: '',
                                            },
             markerDataFetched: false,
             center:         false,
             render:         false,
             region :        null,
             mapsType:       this.props.mapsType,
             redClicked:     false , foodClicked: false , landmarksClicked: false  ,
             fetchClicked:   false , moreClicked:  false , localClicked: false  ,
             shopClicked:   false , outdoorsClicked: false , nightlifeClicked: false,
             gasClicked: false, restCLicked: false, artsClicked: false,
             medicalClicked: false, cornClicked:   false  , burritoClicked: false ,
             items:          [],
             itemDetails:    [],

           }


            masterAPI = new MasterAPI();
            markerSort = new MarkerSort();
        }


       onRegionChange(region){
         this.setState({region})

       }

       changeQuery(query){
       let x = this.state.params;
       x.query = query;
       this.setState( {params:x} );

       }


        onRedClicked(){
          this.setState({
            region: {
               latitude: this.state.lat,
               longitude: this.state.long,
               latitudeDelta: LATITUDE_DELTA,
               longitudeDelta: LONGITUDE_DELTA,
                }
          })
          this.setState( (previousState) => ({center: !previousState.center}) );

        }


        onFoodClicked(){

        console.log("this is food when clicked");
          this.setState({ localClicked: false});
          this.setState({ landmarksClicked: false});
          this.setState({ shopClicked: false});
          this.setState( (previousState) => ({foodClicked: !previousState.foodClicked}) );

            this.changeQuery("Food");


        }


        onLandmarksClicked(){
        this.setState({ localClicked: false});
        this.setState({ foodClicked: false});
        this.setState({ shopClicked: false});
        this.setState( (previousState) => ({landmarksClicked: !previousState.landmarksClicked}) );

         this.changeQuery("Landmarks");


        }

        onMoreClicked(){
          this.setState( (previousState) => ({moreClicked: !previousState.moreClicked}) );

        }


        onLocalClicked(){
         this.setState({ landmarksClicked: false});
         this.setState({ foodClicked: false});
         this.setState({ shopClicked: false});
         this.setState((previousState) => ( {localClicked: !previousState.localClicked} ));
         this.changeQuery("Local");

         }


         onShopClicked(){
         this.setState({ landmarksClicked: false});
         this.setState({ foodClicked: false});
         this.setState({ localClicked: false});
         this.setState((previousState) => ( {shopClicked: !previousState.shopClicked} ));

          this.changeQuery("Shop");

          }



         onOutdoorsClicked(){
         this.setState((previousState) => ( {outdoorsClicked: !previousState.outdoorsClicked} ));

          }

         onNightlifeClicked(){
         this.setState((previousState) => ( {nightlifeClicked: !previousState.nightlifeClicked} ));

         }
         onGasClicked(){
         this.setState((previousState) => ( {gasClicked: !previousState.gasClicked} ));

         }

         onRestClicked(){
         this.setState((previousState) => ( {restClicked: !previousState.restClicked} ));

         }

         onArtsClicked(){
         this.setState((previousState) => ( {artsClicked: !previousState.artsClicked} ));

         }

         onMedicalClicked(){
         this.setState((previousState) => ( {medicalClicked: !previousState.medicalClicked} ));

         }


        onCornClicked(){
          this.setState( (previousState) => ({cornClicked: !previousState.cornClicked}) );
          this.props.onReview();
        }


        onBurritoClicked(){
          this.setState( (previousState) => ({burritoClicked: !previousState.burritoClicked }) );
          this.props.inOptions();
        }



//need to figure out a good way to do this elegantly
  async onFetchClicked(){


           masterAPI.setParams(this.state.params);
           let data = await masterAPI.search();

          this.setState({items: data });
          this.setState( (previousState) => ({center: !previousState.center}) );
           let m = new MarkerSort('rating',10)
         // let m = this.markerSort.sort(this.state.items);
        //   m.setItems(data);
           let x = m.sort(data);
           console.log(x);
       }


  shouldComponentUpdate(newProps,newState){

   return (
         newState.foodClicked!==this.state.foodClicked
       ||newState.shopClicked!==this.state.shopClicked
       ||newState.landmarksClicked!==this.state.landmarksClicked
       ||newState.outdoorsClicked!==this.state.outdoorsClicked
       ||newState.localClicked!==this.state.localClicked
       ||newState.moreClicked!==this.state.moreClicked
       ||newState.center!==this.state.center
       ||newState.render!==this.state.render
       ||newState.lat!==this.state.lat
       ||newProps.radius!==this.props.radius


       )



  }

     render()
     {
     //console.log("I rendered!!!")
      return (

       <View style={styles.Gui}  >


           {
              this.state.lat === null ? <ActivityIndicator size = 'large' color ='lightblue'/> :
               <MapGui

                mapsType ={this.props.mapsType}
                styling = {styles.map}
                lat = {this.state.lat}
                long = {this.state.long}
                markers = {this.state.items}
                radius = {this.props.radius}
                region = {this.state.region}
                render = {this.state.render}
                onRegionChange = {this.onRegionChange.bind(this)}
                onCornClick = {this.onCornClicked.bind(this)}
                //onMarkerClick = {this.onMarkerClicked.bind(this)}
                center = {this.state.center}
               />

           }


            {
               this.state.lat === null ? null :
              <DecoySearch onSearch = {this.props.onSearch}/>
             }
           {
              this.state.lat === null ? null :
               <ControlBar

                red = {this.state.redClicked}           onRedClick = {this.onRedClicked.bind(this)}
                food = {this.state.foodClicked}       onFoodClick = {this.onFoodClicked.bind(this)}
                landmarks = {this.state.landmarksClicked}     onLandmarksClick = {this.onLandmarksClicked.bind(this)}
                fetch = {this.state.fetchClicked}       onFetchClick = {this.onFetchClicked.bind(this)}
                more = {this.state.moreClicked}         onMoreClick = {this.onMoreClicked.bind(this)}
                local = {this.state.localClicked}     onLocalClick = {this.onLocalClicked.bind(this)}
                shop = {this.state.shopClicked}       onShopClick = {this.onShopClicked.bind(this)}
                outdoors = {this.state.outdoorsClicked}       onOutdoorsClick = {this.onOutdoorsClicked.bind(this)}
                nightlife= {this.state.nightlifeClicked}       onNightlifeClick = {this.onNightlifeClicked.bind(this)}
                gas = {this.state.gasClicked}       onGasClick = {this.onGasClicked.bind(this)}
                rest = {this.state.restClicked}       onRestClick = {this.onRestClicked.bind(this)}
                arts = {this.state.artsClicked}       onArtsClick = {this.onArtsClicked.bind(this)}
                medical = {this.state.medicalClicked}       onMedicalClick = {this.onMedicalClicked.bind(this)}
                corn = {this.state.cornClicked}         onCornClick = {this.onCornClicked.bind(this)}
                burrito = {this.state.burritoClicked}   onBurritoClick = {this.onBurritoClicked.bind(this)}

               />
            }

       </View>
      );
  }

    //Getting current location
       async componentDidMount() {

            navigator.geolocation.getCurrentPosition( (position) =>{
               this.setState({ lat: position.coords.latitude  ,  long: position.coords.longitude });
               this.setState({ region:{
                               latitude: position.coords.latitude,
                               longitude: position.coords.longitude,
                               latitudeDelta: LATITUDE_DELTA,
                               longitudeDelta: LONGITUDE_DELTA
                             }});
           },
              (error) => {console.log(error.message)},
              { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
                                                 );

    }



     async componentWillUnmount(){
           files.lat = this.state.latitude;
           files.long = this.state.longitude;


            }


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

