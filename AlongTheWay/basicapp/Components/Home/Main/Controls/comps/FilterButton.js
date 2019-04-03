import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';

const FilterButton = ({clicked,label,isPressed,color})=>(



          <View style = {styles.buttonFormat}>

            <TouchableOpacity onPress = {clicked}>

             <View style ={{alignItems: 'center', borderRadius: 30, width: 30, height: 30, backgroundColor: color}} >
                 { isPressed ? <View style ={styles.checked}/> : <View style ={styles.unchecked}/>}
              </View>

            </TouchableOpacity>

               <Text> {label} </Text>

          </View>












)
const styles = StyleSheet.create({
unchecked:{
top: 5,
borderRadius: 30,
width: 20,
height: 20,
backgroundColor: 'whitesmoke'

},
checked:{
top: 5,
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