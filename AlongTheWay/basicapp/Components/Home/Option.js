import React, {Component} from 'react';
import {Platform, StyleSheet, View, Slider, Text,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ButtonGroup, Header, Button } from 'react-native-elements';

//options page
export default class Options extends Component {


constructor(props){
    super(props);

    this.state = {

      index: 0,
      radius: 0 ,

    }


   }

    updateIndex = (index) => {
         this.setState({index});
    }

      //updates radius on slider
     updateRadius(radius){
     this.setState({radius:radius});

     }


  render() {
    return (

      <View style={styles.container}>

              <Header
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'Options', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff', onPress: () => {this.props.inOptions()} }}
               />







          <View style={styles.container}>

                  <Text style={{fontWeight: 'bold',fontSize: 20, textAlign: 'center'}}> Radius </Text>

                  <Slider
                   style={{ width: 400 }}
                   step={10}
                   minimumValue={50}
                   maximumValue={5000}
                   value={this.state.radius}
                   onValueChange={(val)=>{this.updateRadius(val)}}
                  />

                  <Text style={styles.welcome}>
                    {this.state.radius}
                  </Text>

                </View>

      </View>

    );

  }



     async componentWillMount(){
       this.setState({radius:this.props.radius});

      }




      //sends updated radius to App to be rendered  and used accordingly
     async componentWillUnmount(){

      this.props.onRadiusChange(this.state.radius);


     }


}
const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

  group: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

  slide: {
      textAlign: 'left',
      fontSize: 70,
      color: '#000000',
    },
    home:{
     width: 30,
     height: 30,
    }

});