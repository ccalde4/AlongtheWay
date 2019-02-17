import { Text, View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';

const FilterButton = ({clicked,style,text,isPressed})=>(





          <View style = {styles.buttonStyle}>

           <TouchableOpacity onPress = {clicked}>
                 <View style ={style} >
                      { isPressed ? <View style ={styles.checked}/> : <View style ={styles.unchecked}/>}
                 </View>
           </TouchableOpacity>

          <Text> {text} </Text>

          </View>












)
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
backgroundColor: 'gray'

},


buttonStyle: {
  width: 80,
  height: 70,
flexDirection: 'column',
alignItems: 'center',
},



});
export default FilterButton;