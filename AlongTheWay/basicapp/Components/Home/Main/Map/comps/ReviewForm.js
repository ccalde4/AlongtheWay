import React, {Component} from 'react';
import { Text,TextInput, View,ScrollView, StyleSheet,Keyboard, Dimensions, TouchableOpacity,TouchableWithoutFeedback,KeyboardAvoidingView} from 'react-native';
import StarRating from 'react-native-star-rating';
var { winHeight, winWidth } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import { ButtonGroup, Header, Button } from 'react-native-elements';


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

        return (
         <View style = {styles.Gui}   >
         <Header
                                   leftComponent={{ icon: 'menu', color: '#fff' }}
                                   centerComponent={{ text: this.props.marker.name , style: { color: '#fff' } }}
                                   rightComponent={<TouchableOpacity style = {styles.home} onPress = {this.props.onReview}/> }
                                  />

                           {/*<View style = {styles.firstLine} >
                            <Text style = {{fontSize: 20}} > Review your experience at: {"\n"} {this.props.marker.name} </Text>
                           </View>*/}

                             <ScrollView  keyboardShouldPersistTaps = {"never"} style = {styles.commentBox}>
                                  <KeyboardAvoidingView  behavior = "padding" enabled>
                                    <View style = {styles.textIn}>

                                      <TextInput  placeholder = {'Leave a comment...'}
                                                  onChangeText={(text) => this.setState({text})}
                                                  value = {this.state.text}
                                                />

                                    </View>
                                  </KeyboardAvoidingView>
                             </ScrollView>

                         <View style = {styles.stars}>

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


           flex:1,
    backgroundColor: 'white',
            height: winHeight,
            width: winWidth,

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
