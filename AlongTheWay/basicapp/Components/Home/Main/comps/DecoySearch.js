import React, {Component} from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';



export default class DecoySearch extends Component {



  render() {
    return (
      <TouchableOpacity style ={styles.layout}   onPress = {this.props.onSearch}>
             <View>
                <Text style = {styles.text} > Search For A Place </Text>

              </View>
        </TouchableOpacity>

    );
  }
}
const styles = StyleSheet.create({

text: {
fontSize: 20,


},

layout: {
opacity: .9,
justifyContent: 'center',
paddingLeft: 10,
width: 340,
height: 50,
borderRadius: 50,
position: 'absolute',
top: 15,
backgroundColor: 'lightgray'

}

});

