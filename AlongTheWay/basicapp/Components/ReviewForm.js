import React, {Component} from 'react';
import { Text,TextInput, View, StyleSheet, Dimensions, TouchableOpacity,TouchableWithoutFeedback,KeyboardAvoidingView} from 'react-native';
const { width, height } = Dimensions.get('window');


  export default class ReviewForm extends Component{

  constructor(props){
     super(props);

     this.state = {
         rating: 1,
         text : ''

     }
}

    onOneClick(){this.setState({rating:1})}
    onTwoClick(){this.setState({rating:2})}
    onThreeClick(){this.setState({rating:3})}
    onFourClick(){this.setState({rating:4})}
    onFiveClick(){this.setState({rating:5})}

    onEnterClick(){

      let userReview =
      {
        comment: this.state.text,
        rating: this.state.rating,
      }
      this.props.addReview(userReview);

     }



      render(){

      return(


          <View style = {styles.Gui}>

                                    <Text> Leave A Rating                             {this.state.rating} </Text>

                <View style = {styles.layout2}>
                  <View style = {styles.row2} >

                      <TouchableOpacity onPress = {this.onOneClick.bind(this)}>
                       <View style = {styles.button1} />
                      </TouchableOpacity>

                      <TouchableOpacity onPress = {this.onTwoClick.bind(this)}>
                        <View style = {styles.button1} />
                      </TouchableOpacity>

                      <TouchableOpacity onPress = {this.onThreeClick.bind(this)}>
                        <View style = {styles.button1} />
                      </TouchableOpacity>

                       <TouchableOpacity onPress = {this.onFourClick.bind(this)}>
                         <View style = {styles.button1} />
                       </TouchableOpacity>

                       <TouchableOpacity onPress = {this.onFiveClick.bind(this)}>
                         <View style = {styles.button1} />
                       </TouchableOpacity>

                     </View>
                 </View>

                  <KeyboardAvoidingView style = {styles.textIn} behavior = "padding" enabled>
                           <View >
                             <TextInput placeholder = {'Leave a comment'}  onChangeText={(text) => this.setState({text})}
                               value = {this.state.text}/>
                            </View>
                   </KeyboardAvoidingView>


                   <TouchableOpacity style = {styles.enter} onPress = {this.onEnterClick.bind(this)}>
                              <View>
                                 <Text> Enter Button </Text>
                               </View>
                   </TouchableOpacity>

          </View>


      );

      }

  }
  const styles = StyleSheet.create({
  Gui: {
    flexDirection: 'column',
    padding: 10,
    flex:1,
    backgroundColor: "lightblue",
    //justifyContent: "space-around",
   // alignItems: "center",
    },

    textBox: {


       height: 50,
       width: 300,
     backgroundColor: 'gray'
    },
    button1: {
    height: 30,
    width: 30,
    backgroundColor: 'yellow',
    borderRadius: 50

    },
    button2: {
        height: 30,
        width: 30,
        backgroundColor: 'gray',


        },
    layout2: {

    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 420,
    height: 60,
    position: 'absolute',
    top: 30,
    backgroundColor: 'pink'

    },
    row2: {

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 370,
    height: 55,



    },
    textIn: {
    bottom: 200,
    position: 'absolute',
    width: 400,
    height:60,
    backgroundColor: 'gray',
    paddingLeft: 10
    },
    enter: {
    flex: 1,
     width: 100,
     height: 60,
     position: 'absolute',
     bottom: 20,
     backgroundColor: 'green',


    }



  });