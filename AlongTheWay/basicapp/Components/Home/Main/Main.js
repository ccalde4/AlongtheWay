import React, {Component} from 'react';
import { Text, View,StyleSheet,Keyboard, Dimensions,ActivityIndicator,PermissionsAndroid,Alert} from 'react-native';
import ControlBar from './Controls/Controls';
import MapGui from './Map/Map';
import DecoySearch from './comps/DecoySearch';
import File from '../../../utils/FileSystem';
import MasterAPI from '../../../APIs/MasterAPI';
import MarkerSort from '../../../utils/MarkerSort';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


var masterAPI;
var markerSort;
var file;
export default class Main extends Component {


        constructor(props){
          super(props);

           this.state = {
             lat:            null,
             long:           null,
             radius:         this.props.radius,
             params:{
                                latitude: '30.414175',
                                longitude:'-91.186256',
                                query:'donuts',
                                limit: 10,
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
             itemDetails:    [],
             watchID:        null
           }
             file = new File();

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
               latitude: this.state.lat,
               longitude: this.state.long,
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

                mapsType ={this.state.mapsType}
                styling = {styles.map}
                lat = {this.state.lat}
                long = {this.state.long}
                markers = {this.state.items}
                radius = {this.state.radius}
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

       </View>
      );
  }

    //Getting current location
       async componentDidMount() {
            let positionexists = await file.fileExists('position');
            if(positionexists){
                let s = await file.fileRead('position');
                let s2 = s.split(" ");
                this.setState({
                           lat: parseFloat(s2[0]),
                           long: parseFloat(s2[1]),
                         });
            }
            else{
                navigator.geolocation.getCurrentPosition( (position) =>
            {
            this.setState({
               lat: position.coords.latitude,
               long: position.coords.longitude,
             });
             this.setState({ region:{
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA
                          }});
           },
          (error) => console.log(error.message),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
                                                 );
               }
               }



     async componentWillUnmount(){
          navigator.geolocation.clearWatch(this.watchID);
          let s = "" + this.state.lat + " " + this.state.long;
          let positionFilexists = await file.fileExists('position');
           if(positionFilexists)
             file.createFile('position',s);
            else
            file.fileWrite('position',s);
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

