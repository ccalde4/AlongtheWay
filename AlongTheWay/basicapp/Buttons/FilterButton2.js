import React, {Component} from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity,TouchableWithoutFeedback} from 'react-native';



  export default class FilterButton2 extends Component{

  constructor(props){
     super(props);

     this.state = {
     isClicked: false,

     }
}


       onClick(){

      this.setState(
                           previousState => (

                               { isClicked: !previousState.isClicked }
                                                     )
                 );
                  this.props.clicked()
       }

      render(){

      return(


          <View style = {styles.buttonStyle}>

           <TouchableOpacity onPress = {this.onClick.bind(this)}>

                 <View style ={this.props.style} >
                      { this.state.isClicked ? <View style ={styles.checked}/> : <View style ={styles.unchecked}/>}
                 </View>
           </TouchableOpacity>

          <Text> {this.props.text} </Text>

          </View>


      );

      }

  }
  const styles = StyleSheet.create({
  unchecked:{
  top: 15,
  borderRadius: 50,
  width: 20,
  height: 20,
  backgroundColor: 'whitesmoke'

  },
  checked:{
  top: 15,
  borderRadius: 50,
  width: 20,
  height: 20,
  backgroundColor: 'darkgray'

  },

  buttonStyle: {
  width: 80,
  height: 70,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: "space-around",
  },



  });