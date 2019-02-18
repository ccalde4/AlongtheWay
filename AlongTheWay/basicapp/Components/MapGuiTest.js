
   {/* class AnimatedMarkers extends React.Component {
     constructor(props) {
       super(props);

       this.state = {
         latitude: LATITUDE,
         longitude: LONGITUDE,
         routeCoordinates: [],
         distanceTravelled: 0,
         prevLatLng: {},
         coordinate: new AnimatedRegion({
           latitude: LATITUDE,
           longitude: LONGITUDE
         })
       };
     }

     componentWillMount() {

     }

     componentDidMount() {

        navigator.geolocation.getCurrentPosition(
                        position => {},
                        error => alert(error.message),
                        {
                          enableHighAccuracy: true,
                          timeout: 20000,
                          maximumAge: 1000
                        }
                      );
       const { coordinate } = this.state;
       this.watchID = navigator.geolocation.watchPosition(
         position => {
           const { coordinate, routeCoordinates, distanceTravelled } = this.state;
           const { latitude, longitude } = position.coords;

           const newCoordinate = {
             latitude,
             longitude
           };

           if (Platform.OS === "android") {
             if (this.marker) {
               this.marker._component.animateMarkerToCoordinate(
                 newCoordinate,
                 500
               );
             }
           } else {
             coordinate.timing(newCoordinate).start();
           }

           this.setState({
             latitude,
             longitude,
             routeCoordinates: routeCoordinates.concat([newCoordinate]),
             distanceTravelled:
               distanceTravelled + this.calcDistance(newCoordinate),
             prevLatLng: newCoordinate
           });
         },
         error => console.log(error),
         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
       );

     }

     componentWillUnmount() {
       navigator.geolocation.clearWatch(this.watchID);
     }

     calcDistance = newLatLng => {
        const { prevLatLng } = this.state;
        return haversine(prevLatLng, newLatLng) || 0;
     };

     getMapRegion = () => ({
       latitude: this.state.latitude,
       longitude: this.state.longitude,
       latitudeDelta: LATITUDE_DELTA,
       longitudeDelta: LONGITUDE_DELTA
     });

     render() {
       return (
         <View style={styles.container}>
           <MapView
             style={styles.map}
             showUserLocation
             followUserLocation
             loadingEnabled
             region={this.getMapRegion()}

           >
             <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
             <Marker.Animated
               ref={marker => {
                 this.marker = marker;
               }}
               coordinate={this.state.coordinate} />
           </MapView>
           <View style={styles.buttonContainer}>
             <TouchableOpacity style={[styles.bubble, styles.button]}>
               <Text style={styles.bottomBarContent}>
                 {parseFloat(this.state.distanceTravelled).toFixed(2)} km
               </Text>
             </TouchableOpacity>
           </View>
         </View>
       );
     }
   }

   const styles = StyleSheet.create({
     container: {
       ...StyleSheet.absoluteFillObject,
       justifyContent: "flex-end",
       alignItems: "center"
     },
     map: {
       ...StyleSheet.absoluteFillObject
     },
     bubble: {
       flex: 1,
       backgroundColor: "rgba(255,255,255,0.7)",
       paddingHorizontal: 18,
       paddingVertical: 12,
       borderRadius: 20
     },
     LatLng: {
       width: 200,
       alignItems: "stretch"
     },
     button: {
       width: 80,
       paddingHorizontal: 12,
       alignItems: "center",
       marginHorizontal: 10
     },
     buttonContainer: {
       flexDirection: "row",
       marginVertical: 20,
       backgroundColor: "transparent"
     }
   });


   const RADIUS = 500;

   class Map extends Component {
   constructor(props) {
          super(props);

   this.state = {
       mapRegion: null,
       currentLatitude: null,
       currentLongitude: null,
       LatLng: {
           latitude: -35,
           longitude: 120,
       },
   }
   }

   render() {
       return (
       <MapContainer>
           <MapView
               style = { styles.map }
               region = { this.state.mapRegion }
               showsUserLocation = { true }
               followUserLocation = { true }
               onRegionChangeComplete = { this.onRegionChangeComplete.bind(this) }>
           <MapView.Circle
                   key = { (this.state.currentLongitude + this.state.currentLongitude).toString() }
                   center = { this.state.LatLng }
                   radius = { RADIUS }
                   strokeWidth = { 1 }
                   strokeColor = { '#1a66ff' }
                   fillColor = { 'rgba(230,238,255,0.5)' }
                   onRegionChangeComplete = { this.onRegionChangeComplete.bind(this) }
           />
           </MapView>
       </MapContainer>
       )
   }
  }


 export default {MapGui, AnimatedMarkers, Map}; */}