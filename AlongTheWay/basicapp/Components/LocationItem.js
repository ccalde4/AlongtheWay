import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';



class LocationItem extends PureComponent{

        render(){
            return(
                <TouchableOpacity style = {styles.root}>
                    <Text>{this.props.description}</Text>
                </TouchableOpacity>
            );
        }
}

const styles = StyleSheet.create({
    root: {
        height: 40,
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center'
    }

})

export default LocationItem;