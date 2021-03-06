import React, {Component} from 'react';
import { ButtonGroup, Header, Button, Overlay, Divider, Rating, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity, Text, View,StyleSheet,Keyboard, Dimensions,ActivityIndicator,PermissionsAndroid,Alert} from 'react-native';
import ControlBar from './Controls/Controls2';
import MapGui from './Map/Map';
import DecoySearch from './comps/DecoySearch';
import _ from "lodash";
import MasterAPI from '../../../APIs/MasterAPI';
import MarkerSort from '../../../utils/MarkerSort';
import Distance from  '../../../utils/Distance';
import MarkerPopup from './Map/comps/MarkerPopup';
import ReviewForm from './Map/comps/ReviewForm';
import MarkerList from './Map/comps/MarkerList';


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
                                limit: 20,
                                radius: 1000,
                                categories: [],
                                            },
             numMarkersShown: 20,
             markerIndex:     0,
             isReviewing:    false,
             listClicked:    false,
             markerClicked:  false,
             center:         false,
             render:         false,
             region :        null,
             mapsType:       this.props.mapsType,
             redClicked:     false , foodClicked:     false , landmarksClicked: false  ,
             fetchClicked:   false , moreClicked:     false , localClicked:     false  ,
             shopClicked:   false  , outdoorsClicked: false , nightlifeClicked: false  ,
             gasClicked:    false  , restCLicked:     false , artsClicked:      false  ,
             medicalClicked: false , optionsClicked:  false ,
             items:                [],
             itemsWithoutDetails:  [],
             dist:                 [],
             reviews:              [],

           }


            masterAPI = new MasterAPI();
        }

        // kinda of a hack func to get radius to update properly
          up(rad){
            let p = this.state.params;
            p.latitude = this.props.lat;
            p.longitude = this.props.long;
            p.radius = rad;
            this.setState({params:p});
            console.log(p);
            this.setState( (previousState) => ({center: !previousState.center}) );

           }
        //function for keeping track of region map is rendering
       onRegionChange(region){
           this.setState({region})

       }
        //changes the query term
         changeQuery(query){
              let x = this.state.params;
            x.query = query;
           this.setState( {params:x} );

       }
        //adds user-chosen category to the categories parameter
       addToCategories(category){
               let x = this.state.params;
               (x.categories).push(category);

               this.setState( {params:x});

                  this.setState( {params:x});


               }
          //removes a category from parameters upon user request
        removeFromCategories(category){
               let x = this.state.params;

               for(let i = 0; i < x.categories.length; i++){
                   if((x.categories)[i] == category){
                       x.categories.splice(i,1)
                   }
               }

               this.setState( {params:x});

               }
         onOptionsClicked(){
                 this.setState( (previousState) => ({optionsClicked: !previousState.optionsClicked }) );
                 this.props.inOptions();
                   }

              // This is the recenter button
         onRedClicked(){
          this.setState({
            region: {
               latitude: this.props.lat,
               longitude: this.props.long,
               latitudeDelta: LATITUDE_DELTA,
               longitudeDelta: LONGITUDE_DELTA,
                }
          })
          this.setState( (previousState) => ({center: !previousState.center}) );

        }

         //toggle
         onFoodClicked(){

          !this.state.foodClicked ? this.addToCategories("food,restaurants") : this.removeFromCategories("food,restaurants");
           this.setState( (previousState) => ({foodClicked: !previousState.foodClicked}) );


         }

           //toggle
         onLandmarksClicked(){

         !this.state.landmarksClicked ? this.addToCategories("landmarks") : this.removeFromCategories("landmarks");
         this.setState( (previousState) => ({landmarksClicked: !previousState.landmarksClicked}) );


         }
          //toggle
         onMoreClicked(){

           this.setState( (previousState) => ({moreClicked: !previousState.moreClicked}) );
             //   console.log(this.state.itemsWithoutDetails.length);
              //  console.log(this.state.items.length);

         }

          //toggle
         onLocalClicked(){
          !this.state.localClicked ? this.addToCategories("localflavor") : this.removeFromCategories("localflavor");
          this.setState((previousState) => ( {localClicked: !previousState.localClicked} ));
          }

          //toggle
          onShopClicked(){
           !this.state.shopClicked ? this.addToCategories("shopping") : this.removeFromCategories("shopping");
          this.setState((previousState) => ( {shopClicked: !previousState.shopClicked} ));
           }


          //toggle
          onOutdoorsClicked(){
           !this.state.outdoorsClicked ? this.addToCategories("active") : this.removeFromCategories("active");
          this.setState((previousState) => ( {outdoorsClicked: !previousState.outdoorsClicked} ));

           }
          //toggle
          onNightlifeClicked(){
           !this.state.nightlifeClicked ? this.addToCategories("nightlife") : this.removeFromCategories("nightlife");
          this.setState((previousState) => ( {nightlifeClicked: !previousState.nightlifeClicked} ));

          }
          //toggle
          onGasClicked(){
           !this.state.gasClicked ? this.addToCategories("servicestations") : this.removeFromCategories("servicestations");
          this.setState((previousState) => ( {gasClicked: !previousState.gasClicked} ));

          }
          //toggle
          onRestClicked(){
           !this.state.restClicked ? this.addToCategories("hotelstravel") : this.removeFromCategories("hotelstravel");
          this.setState((previousState) => ( {restClicked: !previousState.restClicked} ));

          }
          //toggle
          onArtsClicked(){
           !this.state.artsClicked ? this.addToCategories("arts") : this.removeFromCategories("arts");
          this.setState((previousState) => ( {artsClicked: !previousState.artsClicked} ));

          }

         //this is actually the route button to draw markers along route
          onMedicalClicked(){
          this.setState((previousState) => ( {medicalClicked: !previousState.medicalClicked} ));
             // Distance reads the polyline array and gives desired lat and longs to search across route
                   let d = new Distance();

                   let y =  d.getParsedDist(this.props.polyline);
                    this.setState({dist:y});
                    this.setState( (previousState) => ({center: !previousState.center}) );
          }

        //function for handling events that occur when a marker is clicked
         onMarkerClicked(index){
           this.setState( (previousState) => ({markerClicked: !previousState.markerClicked} ) );
           this.setState({markerIndex: index});
                }
       //function for signalling when user clicks on review page
         onReview(){
            this.setState( previousState => ( {isReviewing: !previousState.isReviewing} ) );
                }

       //function for adding reviews to reviews array, passed to ReviewForm and called by enter button
        addReview(userReview){
             this.state.reviews.push(userReview);
             console.log(this.state.reviews);
             this.onReview();
                         }

        //function for signalling when the list view is clicked
         inListView(){
           this.setState( previousState => ( {listClicked: !previousState.listClicked} ) )
         }



        //passed into main and used to generate suggestions
       //searches and sorts the chosen categories of places by calling masterAPI and MarkerSort
      async onFetchClicked(t){

            let p = this.state.params;
                       p.latitude = t.coordinate.latitude;
                       p.longitude = t.coordinate.longitude;

           masterAPI.setParams(p);
                      let data = await masterAPI.searchAndGetDetails();
                      let m = new MarkerSort('rating',this.state.numMarkersShown)

                    let x =  m.sort(data);

                      this.setState({items: x });
                      this.setState( (previousState) => ({center: !previousState.center}) );
       }

    //overloaded function to search just your current area with fetch clicked button
       async  onFetchClicked2(){
         // console.log("____________________________________________-");
         masterAPI.setParams(this.state.params);
           let data = await masterAPI.searchAndGetDetails();
           let m = new MarkerSort('rating',this.state.numMarkersShown);

            let x =  m.sort(data);
            this.setState({items: x });
            this.setState( (previousState) => ({center: !previousState.center}) );
       }

   //used to update screen if data used in them is old
  shouldComponentUpdate(newProps,newState){
     if(newProps.radius!==this.props.radius){
       this.up(newProps.radius);
     }
   return (
         newState.foodClicked!==this.state.foodClicked
       ||newState.shopClicked!==this.state.shopClicked
       ||newState.landmarksClicked!==this.state.landmarksClicked
       ||newState.outdoorsClicked!==this.state.outdoorsClicked
       ||newState.localClicked!==this.state.localClicked
       ||newState.moreClicked!==this.state.moreClicked
       ||newState.center!==this.state.center
       ||newState.render!==this.state.render
       ||newProps.lat!==this.props.lat
       ||newProps.radius!==this.props.radius
       ||newProps.polyline!==this.props.polyline
        ||newState.markerClicked!==this.state.markerClicked
        ||newState.isReviewing !== this.state.isReviewing
        || newState.listClicked !== this.state.listClicked
        || newState.params !== this.state.params
       )



  }
        //This is where the map, controls, and list view of places are rendered
     render()
     {
     //console.log("I rendered!!!")

      return (

       <View style={styles.Gui}  >


           {
              this.props.lat === null ? <ActivityIndicator size = 'large' color ='lightblue'/> :

               <MapGui
                dist = {this.state.dist}
                polyline = {this.props.polyline}
                mapsType ={this.props.mapsType}
                styling = {styles.map}
                lat = {this.props.lat}
                long = {this.props.long}
                markers = {this.state.items}
                radius = {this.props.radius}
                region = {this.state.region}
                render = {this.state.render}
                onRegionChange = {this.onRegionChange.bind(this)}
                fetch = {this.onFetchClicked.bind(this)}
                onMarkerClick = {this.onMarkerClicked.bind(this)}
                center = {this.state.center}
               />

           }



           {
              this.props.lat === null ? null :
                 <ControlBar

                   red = {this.state.redClicked}                 onRedClick = {this.onRedClicked.bind(this)}
                   food = {this.state.foodClicked}               onFoodClick = {this.onFoodClicked.bind(this)}
                   landmarks = {this.state.landmarksClicked}     onLandmarksClick = {this.onLandmarksClicked.bind(this)}
                   fetch = {this.state.fetchClicked}             onFetchClick = {this.onFetchClicked2.bind(this)}
                   more = {this.state.moreClicked}               onMoreClick = {this.onMoreClicked.bind(this)}
                   local = {this.state.localClicked}             onLocalClick = {this.onLocalClicked.bind(this)}
                   shop = {this.state.shopClicked}               onShopClick = {this.onShopClicked.bind(this)}
                   outdoors = {this.state.outdoorsClicked}       onOutdoorsClick = {this.onOutdoorsClicked.bind(this)}
                   nightlife= {this.state.nightlifeClicked}      onNightlifeClick = {this.onNightlifeClicked.bind(this)}
                   gas = {this.state.gasClicked}                 onGasClick = {this.onGasClicked.bind(this)}
                   rest = {this.state.restClicked}               onRestClick = {this.onRestClicked.bind(this)}
                   arts = {this.state.artsClicked}               onArtsClick = {this.onArtsClicked.bind(this)}
                   medical = {this.state.medicalClicked}         onMedicalClick = {this.onMedicalClicked.bind(this)}
                   options = {this.state.optionsClicked}         onOptionsClick = {this.onOptionsClicked.bind(this)}

                  />
              }
             {<Header backgroundColor = 'transparent'
                leftComponent = {<Icon name = 'align-justify'
                                      size = {24}
                                      color = 'grey'
                                      onPress = {this.onOptionsClicked.bind(this)}/>}

                 centerComponent = {<DecoySearch onSearch = {this.props.onSearch}/>}

                 rightComponent = {<Icon name = 'list-alt'
                                       size = {24}
                                       color = 'grey'
                                       onPress = {this.inListView.bind(this)}/>}

                                    />
                                   }
            {this.state.listClicked === false ? null :
              <MarkerList markers = {this.state.items}
                          onBackDropPress = {this.inListView.bind(this)}
                          onListItemClicked ={this.onMarkerClicked.bind(this)} />

            }


            {
             this.state.markerClicked === false ? null :
                  <MarkerPopup marker = {this.state.items[this.state.markerIndex]}
                               inMarker = {this.onMarkerClicked.bind(this)}
                               onReview = {this.onReview.bind(this)}
                                                            />

           }


           {
             this.state.isReviewing === false? null:

               <ReviewForm addReview = {(userReview) => {this.addReview(userReview)}}
                           marker = {this.state.items[this.state.markerIndex]}
                                                     //inMarker = {this.onMarkerClicked.bind(this)}
                           onReview = {this.onReview.bind(this)}
                                                     />
           }

       </View>

      );
  }

    //Getting current location
        componentDidMount() {

        this.setState({ region:{
         latitude: this.props.lat,
         longitude: this.props.long,
         latitudeDelta: LATITUDE_DELTA,
         longitudeDelta: LONGITUDE_DELTA
     }});


    }


}
const styles = StyleSheet.create({
b:{
opacity: .7,
paddingTop: 15,
   width: 30,
   height: 30,
   backgroundColor: 'black',
   borderRadius: 50

},
but:{
   paddingTop: 10,
    flex:1,
    paddingLeft: 50,
    width: 400,
    height: 50,
    borderRadius: 50,
    position: 'absolute',
    bottom: 160,

},
  Gui: {

  //flexDirection: 'column',
 // padding: 10,
  flex:1,
  backgroundColor: "gray",
//  justifyContent: "space-around",
 // alignItems: "center",
  },

  map: {
    ...StyleSheet.absoluteFillObject,

   },

});

