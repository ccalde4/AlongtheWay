import React, {Component} from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import FilterButton from '../Buttons/FilterButton';
import FilterButton2 from '../Buttons/FilterButton2';

export default class DecoySearch extends Component {



  render() {
    return (
      <TouchableOpacity style ={styles.layout2}  onPress = {this.props.onSearch}>
             <View style = {styles.text}>
                <Text > Search </Text>

              </View>
        </TouchableOpacity>

    );
  }
}
const styles = StyleSheet.create({

text: {
flex: 1,
flexDirection: 'row',
alignItems: 'stretch',

},
button2: {
alignItems: 'center',
borderRadius: 50,
width: 50,
height: 50,
backgroundColor: 'darksalmon'
},
button3: {

alignItems: 'center',
borderRadius: 50,
width: 50,
height: 50,
backgroundColor: 'darkkhaki'
},
button4: {
alignItems: 'center',
borderRadius: 50,
width: 50,
height: 50,
backgroundColor: 'darkolivegreen'
},
button5: {
alignItems: 'center',
borderRadius: 50,
width: 50,
height: 50,
backgroundColor: 'teal'
},
button6: {
alignItems: 'center',
borderRadius: 50,
width: 50,
height: 50,
backgroundColor: 'peachpuff'
//lavender
},
button7: {
alignItems: 'center',
borderRadius: 50,
width: 50,
height: 50,
backgroundColor: 'lightcoral'
},
button8: {

alignItems: 'center',
borderRadius: 50,
width: 50,
height: 50,
backgroundColor: 'mediumaquamarine'
},
button9: {
alignItems: 'center',
borderRadius: 50,
width: 50,
height: 50,
backgroundColor: 'paleturquoise'
},
button10: {
alignItems: 'center',
borderRadius: 50,
width: 50,
height: 50,
backgroundColor: 'peru'
},


layout2: {

flex: 1,
flexDirection: 'column',
justifyContent: 'space-around',
alignItems: 'center',
width: 420,
height: 50,
position: 'absolute',
top: 10,
backgroundColor: 'gray'


},
row1: {

flex: 1,
flexDirection: 'row',
justifyContent: 'space-around',
alignItems: 'center',
width: 420,
height: 55,



},

row2: {

flex: 1,
flexDirection: 'row',
justifyContent: 'space-around',
alignItems: 'center',
width: 370,
height: 55,



},
 map2: {

                   ...StyleSheet.absoluteFillObject,





        },


});

