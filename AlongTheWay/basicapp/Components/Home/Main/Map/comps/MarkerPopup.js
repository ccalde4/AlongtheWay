import React, {Component} from 'react';
import { Text, View, StyleSheet, Dimensions,TouchableOpacity, TouchableHighlight} from 'react-native';
import MapView, {Marker, AnimatedRegion,Callout} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ButtonGroup, Header, Button } from 'react-native-elements';


var { winHeight, winWidth} = Dimensions.get('window');


export default class MarkerPopup extends Component{

    constructor(props){
          super(props);
          this.state = {
            reviewClicked: false,
            reviews: [],
            isReviewing: false,
            }


          }
/*handleReviewPress(){
this.setState( previousState => ( {isReviewing: !previousState.isReviewing} ) );
}
  addReview(userReview){

         this.state.reviews.push(userReview);
          console.log(this.state.reviews);
          this.onReviewClick();
         }
    onReviewClick(){
     this.setState( (previousState) => ({reviewClicked: !previousState.reviewClicked}) );
     this.props.onReview();
              }
  onReview(){
         this.setState( previousState => ( {isReviewing: !previousState.isReviewing} ) );
         }*/



          render(){
          return(

          <View style = {styles.popup}>

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
            </View>
               {/* <TouchableOpacity onPress = {console.log("review was Clicked") } underlayColor="white">
                <View style={styles.reviewButton}>
                <Text style = {styles.reviewText}> Write a review? </Text>
                </View>
                </TouchableOpacity>*/}






           <Button title = {"Write a review?"}
                    onPress = {this.props.onReview}
                    />
</View>
          );



}
}

const styles = StyleSheet.create({
  reviewPage:{
  flex: 1,
  //height: winHeight,
  //width: winWidth,
  },
  popup:{
     //flex: 1,
     //flexDirection: 'row',
     backgroundColor: 'white',
    // borderRadius: 30,
    height: winHeight,
   width: winWidth,
     //justifyContent: 'center',
     //alignItems: 'center'

     },
     insideOfPopup:{
     //flex: 1,

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
    color: 'blue',
    fontSize:16,
    fontWeight: 'bold',
    textAlign: 'center',
    },
     home:{
         width: 30,
         height: 30,
         backgroundColor: 'pink'
        },

});