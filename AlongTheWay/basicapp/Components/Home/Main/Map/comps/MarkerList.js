import React, {Component} from 'react';
import {View, Dimensions,StyleSheet,ScrollView, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ButtonGroup, Header, Button, Overlay, Divider, Rating, ListItem } from 'react-native-elements';
var { winHeight, winWidth} = Dimensions.get('window');
export default class MarkerList extends Component {
constructor(props) {
    super(props);
    this.state = {
    visible: false,
    }

  }



handlePress(index){
     //console.log(index);
     this.props.onListItemClicked(index);
    // this.setState((previousState) => ({markerClicked: !previousState.markerClicked}))


     }





  render() {



    return (


    <Overlay isVisible = {true}
             onBackdropPress = {this.props.onBackDropPress}
           >
     <ScrollView contentContainerStyle = {{paddingBottom: 70}}>
<View>
    {
   this.props.markers ?  this.props.markers.map((place,index) =>
    (<ListItem
        key = {place.id}
        title = {<View><Text>{place.name}</Text></View>}
        rightTitle = {
                <View><Rating
                                   imageSize={10}
                                   readonly
                                   startingValue={place.rating}
                                   />
                </View>
        }
        rightSubtitle = {
                    <View><Text>{(place.distance).toFixed(2)} {"mi. away"}</Text></View>}
        subtitle = {
                    <View><Text>{place.categories[0].title}</Text></View>}
        bottomDivider = {true}
        onPress = {() => {this.handlePress(index)}}/>
        )


    ) : <Text> {"choose a filter to view venues"} </Text>
    }

     </View>
     </ScrollView>
     </Overlay>



    );
  }
}

const styles = StyleSheet.create({

    overlay: {

    height: winWidth,
    width: winHeight,
    },

    text: {
    textAlign: 'center',
    color: 'black',

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
