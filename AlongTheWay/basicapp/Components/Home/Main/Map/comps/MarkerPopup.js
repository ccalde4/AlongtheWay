import React, {Component} from 'react';
import { Text, View, StyleSheet, Dimensions,TouchableOpacity, TouchableHighlight} from 'react-native';
import MapView, {Marker, AnimatedRegion,Callout} from 'react-native-maps';
// import MapGui from '../Components/MapGui';
import ReviewForm from './ReviewForm';


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

  addReview(userReview){

         this.state.reviews.push(userReview);
          console.log(this.state.reviews);
          this.onReviewClick();
         }
    onReviewClick(){
     this.setState( (previousState) => ({reviewClicked: !previousState.reviewClicked}) );
     //this.onReview();
              }
 /* onReview(){
         this.setState( previousState => ( {isReviewing: !previousState.isReviewing} ) );
         }*/



          render(){
          if(this.state.reviewClicked){
          console.log("reviewClicked");
          return (<View style = {styles.reviewPage}>
                    <ReviewForm
                            name = {this.props.name}
                            addReview = {(userReview) => {this.addReview(userReview)}}/>

                            </View>);

          }
          else{
          console.log("here");
          return(

          <View style = {styles.popup}>
            <View style = {styles.insideOfPopup}>
                  <Text style = {styles.nameText}> {this.props.name}  </Text>
                   <Text style = {styles.ratingText}> Yelp rating: {this.props.rating} {"\n"} </Text>
                 {
                  this.props.location.address == '' ? <Text> This location does not have an address on file </Text>:
                        <Text style = {styles.locationText}>  {this.props.location.displayAddress[0]} {"\n"}
                        {this.props.location.displayAddress[1]} {"\n"}
                        {this.props.location.displayAddress[2]} {"\n"}
                         </Text>
                  }


                         <Text style = {styles.locationText}> Phone: {this.props.contact.displayPhone} {"\n"} </Text>
                <TouchableHighlight onPress = {console.log("review was Clicked") } underlayColor="white">
                <Text style = {styles.reviewText}> Write a review? </Text>
                </TouchableHighlight>



            </View>

           </View>

          );
          }


}
}

const styles = StyleSheet.create({
  reviewPage:{
  flex: 1,
  height: 400,
  width: 200,
  },
  popup:{
     flex: 0.75,
     flexDirection: 'row',
     backgroundColor: 'white',
    // borderRadius: 30,
    height: winHeight,
    width: winWidth,
     justifyContent: 'center',
     alignItems: 'center'

     },
     insideOfPopup:{
     flex: 0.8,

     },
      nameText:{
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

    reviewText:{
    color: 'blue',
    fontSize:16,
    fontWeight: 'bold',
    textAlign: 'center',
    },


});