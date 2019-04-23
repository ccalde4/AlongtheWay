import React from 'react';
import {StyleSheet,TouchableOpacity,Text} from 'react-native';
//just a reused button layout for searchbar controls
 const MoreStops = ({text,onPress}) =>(

                    <TouchableOpacity style = {styles.stopButton}
                                      onPress = {onPress}
                    >
                          <Text style = {styles.text}>  {text} </Text>
                    </TouchableOpacity>
         );
   export default MoreStops;

const styles = StyleSheet.create({
text:{
textAlign: 'center'
},
 stopButton: {
  backgroundColor: "white",
  marginTop: 15,
  margin: 10,
  padding: 15,
  fontSize: 20,
  paddingLeft: 10,
  paddingRight: 10,
  borderRadius: 15,
  textDecorationColor: "red"

        }



 });