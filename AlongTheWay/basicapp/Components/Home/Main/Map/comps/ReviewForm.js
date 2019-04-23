import React, {Component} from 'react';
import { Text,TextInput, View,ScrollView, StyleSheet,Keyboard, Dimensions, TouchableOpacity,TouchableWithoutFeedback,KeyboardAvoidingView} from 'react-native';
import StarRating from 'react-native-star-rating';
var { winHeight, winWidth } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import {  Header, Button, Overlay, Divider, Rating } from 'react-native-elements';


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
   //changes the backend star rating to match the rating that the user inputs
    onStarRatingPress(rating) {
        this.setState({
        starCount: rating
     });
    }
     //sends written review and rating to Main when submit is clicked
     onEnterClick(){

          let userReview =
          {
            comment: this.state.text,
            rating: this.state.starCount,
          }
          this.props.addReview(userReview);

         }
    render() {

        return (
        <Overlay isVisible = {true} fullScreen = {true}>
            <View>
           <Header

                                                 centerComponent={{ text: this.props.marker.name , style: { color: '#fff' } }}
                                                 leftComponent={<Icon name = 'arrow-left'
                                                                       color = 'white'
                                                                       size = {32}
                                                                       onPress = {this.props.onReview}/> }
                                                />

            <View>
            <ScrollView  keyboardShouldPersistTaps = {"never"} >
            <KeyboardAvoidingView  behavior = "padding" enabled>

            <View style = {styles.textBox}>

            <TextInput
                style = {styles.textIn}
            placeholder = {'Leave a comment...'}
                onChangeText={(text) => this.setState({text})}
                 value = {this.state.text}
            />

                                                </View>
                                                </KeyboardAvoidingView>
                                           </ScrollView>



                                           <StarRating
                                                      disabled={false}
                                                      maxStars={5}
                                                      rating={this.state.starCount}
                                                      selectedStar={(rating) => this.onStarRatingPress(rating)}
                                                      fullStarColor = {'yellow'}
                                                    />
                                     <Text style = {styles.starText}> {this.state.starCount} stars </Text>

     <Button title = "Submit" onPress = {this.onEnterClick.bind(this)}       />

        </View>
            </View>
                  </Overlay>



              );

              }

          }

    const styles = StyleSheet.create({

          Gui: {


           flex:1,
    backgroundColor: 'white',
            height: winHeight,
            width: winWidth,

            },
            textBox:{
            paddingTop: 50,
             borderColor: 'black',
             borderWidth: 1.5,
             height:150,
             padding: 10,

            },
          firstLine: {

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
            padding: 10,
            height: 50,
            borderColor: 'black',
            borderWidth: 5,
            overflow: 'scroll',
            },

         stars: {
            flex: 1.5,
            width: 200,
            height: 30,
            alignSelf: 'center',
            overflow: 'hidden',
            },


        enter: {
             height: 20,
             bottom:30,
             backgroundColor: 'limegreen',

             width: winWidth,
            },

        starText: {
            fontSize: 18,
            color: 'black',
            fontWeight: 'bold',
            textAlign: 'center',
            lineHeight: 30,
            textAlignVertical: 'center',
            },

        submitText: {
            fontSize: 18,
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
            lineHeight: 30,
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
        home:{
         width: 30,
         height: 30,
         backgroundColor: 'pink'
        },
         button2: {
                height: 30,
                width: 30,
                backgroundColor: 'white',
                borderColor: 'black',
                },
          });
