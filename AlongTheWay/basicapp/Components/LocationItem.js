import React, {PureComponent} from 'react';

import {View, Text, Alert, StyleSheet, TouchableOpacity} from 'react-native';



class LocationItem extends PureComponent{

       _handlePress = async() => {
        const res = await this.props.fetchDetails(this.props.place_id)
        console.log('result', res)
        Alert.alert(JSON.stringify(res))
       }


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