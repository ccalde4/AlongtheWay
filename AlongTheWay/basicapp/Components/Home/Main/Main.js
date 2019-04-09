import React, {Component} from 'react';
import {TouchableOpacity, Text, View,StyleSheet,Keyboard, Dimensions,ActivityIndicator,PermissionsAndroid,Alert} from 'react-native';
import ControlBar from './Controls/Controls';
import MapGui from './Map/Map';
import DecoySearch from './comps/DecoySearch';

import MasterAPI from '../../../APIs/MasterAPI';
import MarkerSort from '../../../utils/MarkerSort';
import Distance from  '../../../utils/Distance';
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
                                query:'donuts',
                                limit: 30,
                                radius: this.props.radius,
                                categories: '',
                                            },
             markerDataFetched: false,
             center:         false,
             render:         false,
             region :        null,
             mapsType:       this.props.mapsType,
             redClicked:     false , pizzaClicked: false , coffeeClicked: false  ,
             fetchClicked:   false , moreClicked:  false , burgerClicked: false  ,
             localClicked:   false , parksClicked: false , cornClicked:   false  ,
             burritoClicked: false ,
             items:          [],
             dist:           [],
             itemDetails:    [],

           }


            masterAPI = new MasterAPI();
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
               latitude: this.props.lat,
               longitude: this.props.long,
               latitudeDelta: LATITUDE_DELTA,
               longitudeDelta: LONGITUDE_DELTA,
                }
          })
          this.setState( (previousState) => ({center: !previousState.center}) );

        }


        onPizzaClicked(){
          this.setState({ burgerClicked: false});
          this.setState({ coffeeClicked: false});
          this.setState({ localClicked: false});
          this.setState( (previousState) => ({pizzaClicked: !previousState.pizzaClicked}) );

            this.changeQuery("Pizza");


        }


        onCoffeeClicked(){
        this.setState({ burgerClicked: false});
        this.setState({ pizzaClicked: false});
        this.setState({ localClicked: false});
        this.setState( (previousState) => ({coffeeClicked: !previousState.coffeeClicked}) );

         this.changeQuery("Coffee");


        }

        onMoreClicked(){
          this.setState( (previousState) => ({moreClicked: !previousState.moreClicked}) );

        }


        onBurgerClicked(){
         this.setState({ coffeeClicked: false});
         this.setState({ pizzaClicked: false});
         this.setState({ localClicked: false});
         this.setState((previousState) => ( {burgerClicked: !previousState.burgerClicked} ));
         this.changeQuery("Burgers");

         }


         onLocalClicked(){
         this.setState({ coffeeClicked: false});
         this.setState({ pizzaClicked: false});
         this.setState({ burgerClicked: false});
         this.setState((previousState) => ( {localClicked: !previousState.localClicked} ));

          this.changeQuery("Chicken");

          }



         onParksClicked(){
         this.setState((previousState) => ( {parksClicked: !previousState.parksClicked} ));

           let d = new Distance();
           let x =  d.getParsedDist(this.props.polyline);
           this.setState({dist:x});
          // console.log("X = "+ x);
           this.setState( (previousState) => ({center: !previousState.center}) );
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
           let m = new MarkerSort("rating",20);

           m.sort(data);
           this.setState({items: data });
           this.setState( (previousState) => ({center: !previousState.center}) );
       }


  shouldComponentUpdate(newProps,newState){

   return (
         newState.pizzaClicked!==this.state.pizzaClicked
       ||newState.parksClicked!==this.state.parksClicked
       ||newState.coffeeClicked!==this.state.coffeeClicked
       ||newState.localClicked!==this.state.localClicked
       ||newState.burgerClicked!==this.state.burgerClicked
       ||newState.moreClicked!==this.state.moreClicked
       ||newState.center!==this.state.center
       ||newState.render!==this.state.render
       ||newProps.lat!==this.props.lat
       ||newProps.radius!==this.props.radius
       ||newProps.polyline!==this.props.polyline

       )



  }

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
                onCornClick = {this.onCornClicked.bind(this)}
                //onMarkerClick = {this.onMarkerClicked.bind(this)}
                center = {this.state.center}
               />

           }


            {
               this.props.lat === null ? null :
              <DecoySearch onSearch = {this.props.onSearch}/>
             }
           {
              this.props.lat === null ? null :
               <ControlBar

                red = {this.state.redClicked}           onRedClick = {this.onRedClicked.bind(this)}
                pizza = {this.state.pizzaClicked}       onPizzaClick = {this.onPizzaClicked.bind(this)}
                coffee = {this.state.coffeeClicked}     onCoffeeClick = {this.onCoffeeClicked.bind(this)}
                fetch = {this.state.fetchClicked}       onFetchClick = {this.onFetchClicked.bind(this)}
                more = {this.state.moreClicked}         onMoreClick = {this.onMoreClicked.bind(this)}
                burger = {this.state.burgerClicked}     onBurgerClick = {this.onBurgerClicked.bind(this)}
                local = {this.state.localClicked}       onLocalClick = {this.onLocalClicked.bind(this)}
                parks = {this.state.parksClicked}       onParksClick = {this.onParksClicked.bind(this)}
                corn = {this.state.cornClicked}         onCornClick = {this.onCornClicked.bind(this)}
                burrito = {this.state.burritoClicked}   onBurritoClick = {this.onBurritoClicked.bind(this)}

               />
              }
            {<View  style = {styles.but}>
                                <TouchableOpacity  style = {styles.b}
                                                 onPress = {this.save.bind(this)}>
                                </TouchableOpacity>
                             </View>
            }

       </View>

      );
  }
     save(){
      this.props.save();


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



     async componentWillUnmount(){
           files.lat = this.state.lat;
           files.long = this.state.long;


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

