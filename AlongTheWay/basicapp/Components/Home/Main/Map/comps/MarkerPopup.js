import React, {Component} from 'react';
import { Text, View, StyleSheet, Dimensions,TouchableOpacity, TouchableHighlight} from 'react-native';
import MapView, {Marker, AnimatedRegion,Callout} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ButtonGroup, Header, Button } from 'react-native-elements';


var { winHeight, winWidth} = Dimensions.get('window');


export default class MarkerPopup extends Component{

    constructor(props){
          super(props);

          }




          render(){
          return(

          <View styles = { styles.popup}>

                <Header
                                      leftComponent={{ icon: 'menu', color: '#fff' }}
                                      centerComponent={{ text: this.props.marker.name , style: { color: '#fff' } }}
                                      rightComponent={<TouchableOpacity style = {styles.home} onPress = {this.props.inMarker}/> }
                                     />

            <View style = {styles.insideOfPopup}>

           { this.props.marker.name !== null ?
                  <Text style = {styles.nameText}> {this.props.marker.name}  </Text> :
                  <Text> This location does not have a name on file </Text>
                }
                   <Text style = {styles.ratingText}> rating: {this.props.marker.rating} {"\n"} </Text>
                 {
                  this.props.marker.location.address == '' ? <Text> This location does not have an address on file </Text>:
                        <Text style = {styles.locationText}>  {this.props.marker.location.displayAddress[0]} {"\n"}
                        {this.props.marker.location.displayAddress[1]} {"\n"}
                        {this.props.marker.location.displayAddress[2]} {"\n"}
                         </Text>
                  }


                    <Text style = {styles.locationText}> Phone: {this.props.marker.contact.displayPhone} {"\n"} </Text>
                    <Text style = {styles.reviewText}>
                    Reviews from yelp: {"\n"}



                  <Text>   {this.props.marker.reviews[0].user.name} {":"} {this.props.marker.reviews[0].rating} {"stars"} {"\n"} {this.props.marker.reviews[0].text} {"\n"}</Text>
                     <Text>   {this.props.marker.reviews[1].user.name} {":"} {this.props.marker.reviews[1].rating} {"stars"} {"\n"} {this.props.marker.reviews[1].text} {"\n"}</Text>
                     <Text>   {this.props.marker.reviews[2].user.name} {":"} {this.props.marker.reviews[2].rating} {"stars"} {"\n"} {this.props.marker.reviews[2].text} {"\n"}</Text>


                   </Text>






 </View>


           <Button title = {"Write a review?"}
                    onPress = {this.props.onReview}
                    />

     </View>


          );



}
}

const styles = StyleSheet.create({


  popup:{
     flex: 1,
     //flexDirection: 'row',
     backgroundColor: 'white',
    // borderRadius: 30,
    height: winHeight,
   width: winWidth,
     //justifyContent: 'center',
     //alignItems: 'center'

     },
     insideOfPopup:{

     flex: 1,
     backgroundColor:'white',

     },
      nameText:{
      textAlign: 'center',
        color: 'black',
         fontSize: 24,
         fontWeight: 'bold',


         },
      locationText:{
      fontSize:14,
      textAlign: 'center',


      },

    ratingText:{
    color:'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    },
    reviewButton:{
    marginBottom: 30,

     alignItems: 'center',

    },

    reviewText:{
     backgroundColor:'white',
    color: 'black',
    fontSize:16,
    textAlign: 'left',
    },
     home:{
         width: 30,
         height: 30,
         backgroundColor: 'pink'
        },

});
