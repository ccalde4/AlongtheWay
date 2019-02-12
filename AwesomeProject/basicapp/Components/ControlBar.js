

import React, {Component} from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';










export default class ControlBar extends Component {
   constructor(props){
         super(props);

     }




  render() {
    return (

      <View style ={styles.layout} >
       {/* This is where the function passsed from parent(App.js) is used */}
          <TouchableOpacity onPress = {this.props.redClick}>
            <View style ={styles.button1} />
          </TouchableOpacity>

          <TouchableOpacity>
             <View style ={styles.button2} />
          </TouchableOpacity>

          <TouchableOpacity>
            <View style ={styles.button3} />
          </TouchableOpacity>

          <TouchableOpacity>
             <View style ={styles.button4} />
          </TouchableOpacity>

          <TouchableOpacity>
             <View style ={styles.button5} />
          </TouchableOpacity>


      </View>
    );
  }
}
const styles = StyleSheet.create({

button1: {
width: 40,
height: 40,
backgroundColor: 'red'
},
button2: {
width: 40,
height: 40,
backgroundColor: 'orange'
},
button3: {

width: 40,
height: 40,
backgroundColor: 'yellow'
},
button4: {

width: 40,
height: 40,
backgroundColor: 'green'
},
button5: {

width: 40,
height: 40,
backgroundColor: 'blue'
},

layout: {

flex: 1,
flexDirection: 'row',
justifyContent: 'space-around',
alignItems: 'center',
width: 420,
height: 100,
position: 'absolute',
bottom: 20,



},


});

