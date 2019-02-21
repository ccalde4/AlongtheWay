import React, {Component} from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';



export default class DecoySearch extends Component {



  render() {
    return (
      <TouchableOpacity style ={styles.layout}  onPress = {this.props.onSearch}>
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

layout: {

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

});

