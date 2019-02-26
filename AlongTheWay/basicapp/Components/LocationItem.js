import React, {PureComponent} from 'react';

import {View, Text, Alert, StyleSheet, TouchableOpacity} from 'react-native';



class LocationItem extends PureComponent{

       _handlePress = async() => {


        const res = await this.props.fetchDetails(this.props.place_id)



       }


        render(){

            return(

                <TouchableOpacity style = {styles.root} onPress = {()=>{this.props.goTo(this.props.description)}}>

                    <Text style = {styles.text}>{this.props.description}</Text>

                </TouchableOpacity>

            );

        }

}



const styles = StyleSheet.create({

    root: {

        height: 40,
        width: 390,
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingLeft: 40,
        justifyContent: 'center'

    },
    text:{
     fontSize: 16,
    }



})



export default LocationItem;