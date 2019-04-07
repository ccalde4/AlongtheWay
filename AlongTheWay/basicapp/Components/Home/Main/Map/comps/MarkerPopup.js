import React, {Component} from 'react';
import { Text,ScrollView, View, StyleSheet, Dimensions,TouchableOpacity, } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Header, Button, Overlay, Divider, Rating, Image } from 'react-native-elements';


var { winHeight, winWidth} = Dimensions.get('window');


export default class MarkerPopup extends Component{

    constructor(props){
          super(props);

          }




    /*      render(){
          return(

          <Overlay styles = { styles.popup}>

                <Header
                                      leftComponent={{ icon: 'menu', color: '#fff' }}
                                      centerComponent={{ text: this.props.marker.name , style: { color: '#fff' } }}
                                      rightComponent={<TouchableOpacity style = {styles.home} onPress = {this.props.inMarker}/> }
                                     />

            <View style = {styles.insideOfPopup}>

           { this.props.marker.name !== null ?
                  <Text style = {styles.nameText}> {this.props.marker.name}  </Text> :
                  <Text> This location does not have a name on file </Text>
                }
                   <Text style = {styles.ratingText}> rating: {this.props.marker.rating} {"\n"} </Text>
                 {
                  this.props.marker.location.address == '' ? <Text> This location does not have an address on file </Text>:
                        <Text style = {styles.locationText}>  {this.props.marker.location.displayAddress[0]} {"\n"}
                        {this.props.marker.location.displayAddress[1]} {"\n"}
                        {this.props.marker.location.displayAddress[2]} {"\n"}
                         </Text>
                  }


                    <Text style = {styles.locationText}> Phone: {this.props.marker.contact.displayPhone} {"\n"} </Text>
                    <Text style = {styles.reviewText}>
                    Reviews from yelp: {"\n"}



                  <Text>   {this.props.marker.reviews[0].user.name} {":"} {this.props.marker.reviews[0].rating} {"stars"} {"\n"} {this.props.marker.reviews[0].text} {"\n"}</Text>
                     <Text>   {this.props.marker.reviews[1].user.name} {":"} {this.props.marker.reviews[1].rating} {"stars"} {"\n"} {this.props.marker.reviews[1].text} {"\n"}</Text>
                     <Text>   {this.props.marker.reviews[2].user.name} {":"} {this.props.marker.reviews[2].rating} {"stars"} {"\n"} {this.props.marker.reviews[2].text} {"\n"}</Text>


                   </Text>






 </View>


           <Button title = {"Write a review?"}
                    onPress = {this.props.onReview}
                    />

     </View>


          );



}
}

const styles = StyleSheet.create({


  popup:{
     flex: 1,
     //flexDirection: 'row',
     backgroundColor: 'white',
    // borderRadius: 30,
    height: winHeight,
   width: winWidth,
     //justifyContent: 'center',
     //alignItems: 'center'

     },
     insideOfPopup:{

     flex: 1,
     backgroundColor:'white',

     },
      nameText:{
      textAlign: 'center',
        color: 'black',
         fontSize: 24,
         fontWeight: 'bold',


         },
      locationText:{
      fontSize:14,
      textAlign: 'center',


      },

    ratingText:{
    color:'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    },
    reviewButton:{
    marginBottom: 30,

     alignItems: 'center',

    },

    reviewText:{
     backgroundColor:'white',
    color: 'black',
    fontSize:16,
    textAlign: 'left',
    },
     home:{
         width: 30,
         height: 30,
         backgroundColor: 'pink'
        },

});*/
    render(){
    return(

    <Overlay isVisible = {true} fullScreen = {true}>

    <View>
                                    <Header

                                      centerComponent={{ text: this.props.marker.name , style: { color: '#fff' } }}
                                      leftComponent={
                                                            <Icon name = 'arrow-left'
                                                                    color = 'white'
                                                                    size = {28}
                                                                    onPress = {this.props.inMarker}/> }
                                                />

    <ScrollView contentContainerStyle = {{paddingBottom: 70}}>
     <View style = {styles.container}>
            <Text style = {styles.text}> {this.props.marker.name} </Text>

   <Divider style={styles.dividerStyle} />


            <Image
            containerStyle = {styles.imageStyle}
            source={{ uri: this.props.marker.image_url }}
            style={{ width: 150, height:150}}
            />


 <Divider style={styles.dividerStyle} />

     <TouchableOpacity onPress = {() => console.log("address wanted")} >
         <Text style = {styles.addressText}> {this.props.marker.location.displayAddress[0]} {"\n"}
                                            {this.props.marker.location.displayAddress[1]}
          </Text>
     </TouchableOpacity>
      <Divider style={styles.dividerStyle} />
     <Text style = {styles.text}> Phone: {this.props.marker.contact.displayPhone}  </Text>
 <Divider style={styles.dividerStyle} />


             <Text style = {styles.text}> Overall Rating: {this.props.marker.rating}/5 {"\n"}</Text>

        <Rating
            imageSize={20}
            readonly
            startingValue={this.props.marker.rating}

            />
                     <Text style = {styles.text}>   {this.props.marker.reviews[0].user.name} {":"} {this.props.marker.reviews[0].rating} {"stars"} {"\n"} {this.props.marker.reviews[0].text} {"\n"}</Text>
                     <Text style = {styles.text}>   {this.props.marker.reviews[1].user.name} {":"} {this.props.marker.reviews[1].rating} {"stars"} {"\n"} {this.props.marker.reviews[1].text} {"\n"}</Text>
                     <Text style = {styles.text}>   {this.props.marker.reviews[2].user.name} {":"} {this.props.marker.reviews[2].rating} {"stars"} {"\n"} {this.props.marker.reviews[2].text} {"\n"}</Text>
         <Divider style={styles.dividerStyle} />

         <Button buttonStyle = {styles.buttonStyle}
                type = 'clear'
                title = {"Have you been here? Write a review!"}
                onPress = {this.props.onReview}
                             />
        <Divider style={styles.dividerStyle} />
        <Text style = {styles.text}> {"\n"} Along the Way © {"\n"}</Text>
     </View>

     </ScrollView>
      </View>
    </Overlay>

    )
    }
    }


const styles = StyleSheet.create({
    container: {
    marginTop: 10,
    marginBottom: 10,
    },

    text: {
    textAlign: 'center',
    color: 'black',

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
