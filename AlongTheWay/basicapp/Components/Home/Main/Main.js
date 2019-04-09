import React, {Component} from 'react';
import { Text, View,StyleSheet,Keyboard, Dimensions,ActivityIndicator,PermissionsAndroid,Alert} from 'react-native';
import { ButtonGroup, Header, Button, Overlay, Divider, Rating, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import ControlBar from './Controls/Controls';
import MapGui from './Map/Map';
import DecoySearch from './comps/DecoySearch';
import File from '../../../utils/FileSystem';
import MasterAPI from '../../../APIs/MasterAPI';
import MarkerSort from '../../../utils/MarkerSort';
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
                                limit: 30,
                                radius: this.props.radius,
                                categories: [],
                                            },
             numMarkersShown: 20,
             listClicked: false,
             isReviewing: false,
             markerClicked: false,
             center:         false,
             render:         false,
             region :        null,
             mapsType:       this.props.mapsType,
             redClicked:     false , foodClicked: false , landmarksClicked: false  ,
             fetchClicked:   false , moreClicked:  false , localClicked: false  ,
             shopClicked:   false , outdoorsClicked: false , nightlifeClicked: false,
             gasClicked: false, restCLicked: false, artsClicked: false,
             medicalClicked: false, optionsClicked: false ,
             items:          [],
              reviews: [],
               markerIndex: 0,

           }


            masterAPI = new MasterAPI();
            markerSort = new MarkerSort();
        }


       onRegionChange(region){
         this.setState({region})

       }


        addToCategories(category){
        let x = this.state.params;
        (x.categories).push(category);

        this.setState( {params:x});
         console.log(x.categories);
           this.setState( {params:x});


        }

        removeFromCategories(category){
        let x = this.state.params;

        for(let i = 0; i < x.categories.length; i++){
            if((x.categories)[i] == category){
                x.categories.splice(i,1)
            }
        }
        console.log(x.categories);
        this.setState( {params:x});

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
         // this.setState({ localClicked: false});
          //this.setState({ landmarksClicked: false});
         // this.setState({ shopClicked: false});
         !this.state.foodClicked ? this.addToCategories("food,restaurants") : this.removeFromCategories("food,restaurants");
          this.setState( (previousState) => ({foodClicked: !previousState.foodClicked}) );


            //this.addToCategories("restaurants,food");



        }


        onLandmarksClicked(){
       // this.setState({ localClicked: false});
        //this.setState({ foodClicked: false});
        //this.setState({ shopClicked: false});
        //this.state.landmarksClicked == true ? this.addToCategories("landmarks") : this.removeFromCategories("landmarks");
        !this.state.landmarksClicked ? this.addToCategories("landmarks") : this.removeFromCategories("landmarks");
        this.setState( (previousState) => ({landmarksClicked: !previousState.landmarksClicked}) );




        }

        onMoreClicked(){
          this.setState( (previousState) => ({moreClicked: !previousState.moreClicked}) );

        }


        onLocalClicked(){
         //this.setState({ landmarksClicked: false});
         //this.setState({ foodClicked: false});
         //this.setState({ shopClicked: false});
         !this.state.localClicked ? this.addToCategories("localflavor") : this.removeFromCategories("localflavor");
         this.setState((previousState) => ( {localClicked: !previousState.localClicked} ));



         }


         onShopClicked(){
         //this.setState({ landmarksClicked: false});
         //this.setState({ foodClicked: false});
         //this.setState({ localClicked: false});
          !this.state.shopClicked ? this.addToCategories("shopping") : this.removeFromCategories("shopping");
         this.setState((previousState) => ( {shopClicked: !previousState.shopClicked} ));



          }



         onOutdoorsClicked(){
          !this.state.outdoorsClicked ? this.addToCategories("active") : this.removeFromCategories("active");
         this.setState((previousState) => ( {outdoorsClicked: !previousState.outdoorsClicked} ));

          }

         onNightlifeClicked(){
          !this.state.nightlifeClicked ? this.addToCategories("nightlife") : this.removeFromCategories("nightlife");
         this.setState((previousState) => ( {nightlifeClicked: !previousState.nightlifeClicked} ));

         }
         onGasClicked(){
          !this.state.gasClicked ? this.addToCategories("servicestations") : this.removeFromCategories("servicestations");
         this.setState((previousState) => ( {gasClicked: !previousState.gasClicked} ));

         }

         onRestClicked(){
          !this.state.restClicked ? this.addToCategories("hotelstravel") : this.removeFromCategories("hotelstravel");
         this.setState((previousState) => ( {restClicked: !previousState.restClicked} ));

         }

         onArtsClicked(){
          !this.state.artsClicked ? this.addToCategories("arts") : this.removeFromCategories("arts");
         this.setState((previousState) => ( {artsClicked: !previousState.artsClicked} ));


         }

         onMedicalClicked(){
         this.setState((previousState) => ( {medicalClicked: !previousState.medicalClicked} ));

         }


        onOptionsClicked(){
          this.setState( (previousState) => ({optionsClicked: !previousState.optionsClicked }) );
          this.props.inOptions();
        }



        onMarkerClicked(index){
            this.setState( (previousState) => ({markerClicked: !previousState.markerClicked} ) );
            this.setState({markerIndex: index});
        }
        onReview(){
         this.setState( previousState => ( {isReviewing: !previousState.isReviewing} ) );
        }



                 //function for adding reviews to reviews array, passed to ReviewForm and called by enter button
         addReview(userReview){
        this.state.reviews.push(userReview);
        console.log(this.state.reviews);
        this.onReview();
                 }


       inListView(){
       this.setState( previousState => ( {listClicked: !previousState.listClicked} ) )
       }

//need to figure out a good way to do this elegantly
  async onFetchClicked(){


           masterAPI.setParams(this.state.params);
           let data = await masterAPI.search();
           let m = new MarkerSort('rating',this.state.numMarkersShown)

            m.sort(data);
            let x = m.getTop();
           this.setState({items: x });
           this.setState( (previousState) => ({center: !previousState.center}) );
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
       ||newState.markerClicked!==this.state.markerClicked
       ||newState.isReviewing !== this.state.isReviewing
       || newState.listClicked !== this.state.listClicked


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
               polyline = {this.props.polyline}
                mapsType ={this.props.mapsType}
                styling = {styles.map}
                lat = {this.state.lat}
                long = {this.state.long}
                markers = {this.state.items}
                radius = {this.props.radius}
                region = {this.state.region}
                render = {this.state.render}
                onRegionChange = {this.onRegionChange.bind(this)}
                onMarkerClick = {this.onMarkerClicked.bind(this)}
                center = {this.state.center}
               />

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
                options = {this.state.optionsClicked}   onOptionsClick = {this.onOptionsClicked.bind(this)}

               />
            }
            {<Header backgroundColor = 'transparent'
                          leftComponent= {<Icon name = 'align-justify'
                                          size = {24}
                                          color = 'grey'
                                          onPress = {this.onOptionsClicked.bind(this)}/>}
                          centerComponent = {<DecoySearch onSearch = {this.props.onSearch}/>}
                          rightComponent={<Icon name = 'list-alt'
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
   flex:1,
    backgroundColor: "gray",
  },

  map: {
    ...StyleSheet.absoluteFillObject,

   },

});

