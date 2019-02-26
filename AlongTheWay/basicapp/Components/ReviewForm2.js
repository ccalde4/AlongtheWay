import React, {Component} from 'react';
import { Text,TextInput, View, StyleSheet, Dimensions, TouchableOpacity
,TouchableWithoutFeedback,KeyboardAvoidingView,Keyboard} from 'react-native';
const { width, height } = Dimensions.get('window');



   const DismissKeyboard = ({children}) => (
<TouchableWithoutFeedback onPress = {()=>Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>

);


  export default class ReviewForm2 extends Component{

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

           <DismissKeyboard>
          <View style = {styles.Gui}>

            <View>
           <TextInput onSubmitEditing = {Keyboard.dismiss()} placeholder = "Hi There Leave a comment">

           </TextInput>
             </View>


          </View>
         </DismissKeyboard>

      );

      }

  }
  const styles = StyleSheet.create({
  Gui: {


    flex:1,
    backgroundColor: "lightblue",

    }


  });