import React, {Component} from 'react';
import { Text,TextInput, View,ScrollView, StyleSheet,Keyboard, Dimensions, TouchableOpacity,TouchableWithoutFeedback,KeyboardAvoidingView} from 'react-native';
import StarRating from 'react-native-star-rating';
var { winHeight, winWidth } = Dimensions.get('window');

  export default class ReviewForm extends Component{

  constructor(props){
     super(props);

     this.state = {

         starCount: 1,
         text : '',

     }
}
   componentWillUnmount(){
           Keyboard.dismiss()
   }
    onStarRatingPress(rating) {
        this.setState({
        starCount: rating
     });
    }
     onEnterClick(){

          let userReview =
          {
            comment: this.state.text,
            rating: this.state.starCount,
          }
          this.props.addReview(userReview);

         }
    render() {
    {winHeight, winWidth} ;
        return (
         <View style = {styles.Gui}   >

                           <View style = {styles.firstLine} >
                           <Text style = {{fontSize: 20}} > Review your experience at: {"\n"} [insert place name here] </Text>
                           </View>

                             <ScrollView  keyboardShouldPersistTaps = {"never"} style = {styles.commentBox}>
                                                     <KeyboardAvoidingView  behavior = "padding" enabled>
                                                              <View style = {styles.textIn}>
                                                                <TextInput  placeholder = {'Leave a comment...'}  onChangeText={(text) => this.setState({text})}
                                                                  value = {this.state.text}/>
                                                               </View>
                                                      </KeyboardAvoidingView>
                                                       </ScrollView>

                         <View style = {styles.stars}>
                            <Text style = {styles.starText} > Rate your experience: </Text>
                              <StarRating
                                         disabled={false}
                                         maxStars={5}
                                         rating={this.state.starCount}
                                         selectedStar={(rating) => this.onStarRatingPress(rating)}
                                         fullStarColor = {'yellow'}
                                       />
                        <Text style = {styles.starText}> {this.state.starCount} stars </Text>

                         </View>


                            <View style = {styles.enter}>
                           <TouchableOpacity onPress = {this.onEnterClick.bind(this)}>

                                         <Text style = {styles.submitText}> Submit </Text>

                           </TouchableOpacity>
                           </View>

                  </View>


              );

              }

          }

    const styles = StyleSheet.create({

          Gui: {
            flexDirection: 'column',
            flex: 1,
            flexWrap: 'wrap',
            backgroundColor: 'white',
            },

          firstLine: {
            flex: 0.5,
            flexShrink: 2,
            top: 10,
            bottom: 20,
            height: 70,
            alignContent: 'flex-start',
            overflow: 'scroll',
            },

          commentBox: {
            top: 10,
            flex: 2.5,
            height: 150,
            width: winWidth,
            overflow: 'scroll',

            },
         textIn: {
            top: 10,
            flex:2.5,
            borderColor: 'black',
            borderWidth: 1.5,
            width: winWidth,
            height:150,
            paddingLeft: 10,
            overflow: 'scroll',
            },

         stars: {
            flex: 1.5,
            width: 300,
            height: 60,
            alignSelf: 'center',
            overflow: 'hidden',
            },


        enter: {
             height: 60,
             bottom:20,
             backgroundColor: 'limegreen',
             width: winWidth,
            },

        starText: {
            fontSize: 24,
            color: 'black',
            fontWeight: 'bold',
            textAlign: 'center',
            lineHeight: 60,
            textAlignVertical: 'center',
            },

        submitText: {
            fontSize: 24,
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
            lineHeight: 60,
            textAlignVertical: 'center',
            },

         textBox: {
            flex:1,
            height: 70,
            width: winWidth,
             backgroundColor: 'gray',
             borderColor: 'black',
             borderWidth: 10,
             top: 110,
            },

         button2: {
                height: 30,
                width: 30,
                backgroundColor: 'white',
                borderColor: 'black',
                },
          });
