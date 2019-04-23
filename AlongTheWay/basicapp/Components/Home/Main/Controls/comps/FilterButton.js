import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';


 //reuseable component for rendering a button with a name, indicator for if pressed and function to called when clicked
const FilterButton = ({clicked,label,isPressed,color})=>(



          <View style = {styles.buttonFormat}>

            <TouchableOpacity onPress = {clicked}>

             <View style ={{alignItems: 'center', borderRadius: 50, width: 50, height: 50, backgroundColor: color}} >
                 { isPressed ? <View style ={styles.checked}/> : <View style ={styles.unchecked}/>}
              </View>

            </TouchableOpacity>

               <Text> {label} </Text>

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


buttonFormat: {
  width: 80,
  height: 70,
flexDirection: 'column',
alignItems: 'center',
},
buttonStyles:{

alignItems: 'center',
borderRadius: 50,
width: 50,
height: 50,
backgroundColor: 'red'

}





});
export default FilterButton;