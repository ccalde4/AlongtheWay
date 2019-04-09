import React, {Component} from 'react';
import { Text,ScrollView, View, StyleSheet, Dimensions,TouchableOpacity, } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Header, Button, Overlay, Divider, Rating, Image } from 'react-native-elements';


var { winHeight, winWidth} = Dimensions.get('window');


export default class MarkerPopup extends Component{

    constructor(props){
          super(props);



          }




checkImage(){
return(this.props.marker.image_url !== '' && this.props.marker.image_url !== null);
}

    render(){

    return(

    <Overlay isVisible = {true} fullScreen = {true} >

    <View>
    {
    <Header
         centerComponent={{ text: this.props.marker.name , style: { color: '#fff' } }}
         leftComponent={<Icon name = {'arrow-left'} color = {'white'} size = {28} onPress = {this.props.inMarker}/> } />
    }

    <ScrollView contentContainerStyle = {{paddingBottom: 70}}>

     <View style = {styles.container}>
    {
     <Text style = {styles.text} > {this.props.marker.name} </Text>
    }
    {
    <Divider style={styles.dividerStyle} />
    }

    {
    this.checkImage()  ?
            <Image
                containerStyle = {styles.imageStyle}
                source={{ uri: this.props.marker.image_url }}
                style={{ width: 150, height:150}}
                />
    : <Text style = {styles.text}> no image available </Text>
    }


    {
    <Divider style={styles.dividerStyle} />
    }

    {
     <TouchableOpacity onPress = {() => console.log("address wanted")} >
     <Text style = {styles.addressText} > {this.props.marker.location.displayAddress[0]} {"\n"} {this.props.marker.location.displayAddress[1]} </Text>
     </TouchableOpacity>
    }
    {
    <Divider style={styles.dividerStyle} />
    }
     {
     <Text style = {styles.text} > Phone: {this.props.marker.contact.displayPhone}  </Text>
     }
     {
     <Divider style={styles.dividerStyle} />
     }
     {
      <Text style = {styles.text} > Overall Rating: {this.props.marker.rating}/5 {"\n"} </Text>
     }
     {
     <Rating
        imageSize={20}
        readonly
        startingValue={this.props.marker.rating}
        />
     }
     {
       <Text style = {styles.name} >   {this.props.marker.reviews[0].user.name} {": \t\t\t"} {this.props.marker.reviews[0].rating} {"stars"} </Text>
     }
     {
     <Text style = {styles.reviewText} >  {"\n"} {this.props.marker.reviews[0].text} {"\n"} </Text>

     }
     {
     this.props.marker.reviews.length > 1 ?  <Text style = {styles.name} > {this.props.marker.reviews[1].user.name} {": \t\t\t"} {this.props.marker.reviews[1].rating} {"stars"} <Text style = {styles.reviewText}> {"\n"} {this.props.marker.reviews[1].text} {"\n"} </Text></Text> : <Text> </Text>

     }
     {
     this.props.marker.reviews.length > 2 ? <Text style = {styles.name} > {this.props.marker.reviews[2].user.name} {": \t\t\t"} {this.props.marker.reviews[2].rating} {"stars"} {"\n"} <Text style = {styles.reviewText}> {this.props.marker.reviews[2].text} {"\n"} </Text></Text> : <Text> </Text>

     }
     {
      <Divider style={styles.dividerStyle} />
     }
     {
     <Button buttonStyle = {styles.buttonStyle}
        type = 'clear'
        title = {"Have you been here? Rate your experience!"}
        onPress = {this.props.onReview}
                                  />
     }
     {
     <Divider style={styles.dividerStyle} />
     }
     {
     <Text style = {styles.text}> {"\n"} Along the Way © {"\n"} </Text>
     }








     </View>

     </ScrollView>
      </View>
    </Overlay>

    );
    }
    }


const styles = StyleSheet.create({
    container: {
    marginTop: 10,
    marginBottom: 10,
    },

    text: {
    fontWeight: 'normal',
    textAlign: 'center',
    color: 'black',

    },
    name:{
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',

    },
    reviewText:{
    fontWeight: 'normal',
    color: 'black',
    textAlign: 'left',
    },
    imageStyle:{
    alignItems: 'center',
    },
    buttonStyle:{
    margin: 10,
    },
    addressButtonStyle : {
        backgroundColor: 'white',
        textAlign: 'center',
    },
    addressText:{
        textAlign: 'center',
        color: 'blue',
    },
    dividerStyle: {
    backgroundColor: 'black',
    margin: 10,

    },
});
