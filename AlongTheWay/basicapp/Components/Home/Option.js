import React, {Component} from 'react';
import {Platform, StyleSheet, View, Slider, Text,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ButtonGroup, Header, Button, CheckBox } from 'react-native-elements';
import File from '../../utils/FileSystem';

var file;
export default class Options extends Component {


constructor(props){
    super(props);

    this.state = {

      index: 0,
      radius: 0 ,

    }
    file = new File();

   }

    updateIndex = (index) => {
      console.log(this.state.index);
      this.setState({index});
      if(index==0){
      this.props.onMapChange('standard');
      }
      else{
      this.props.onMapChange('satellite');
      }


    }


     updateRadius(radius){
     this.setState({radius:radius});
     this.props.onRadiusChange(this.state.radius);
     }


  render() {
    return (

      <View style={styles.container}>

              <Header
                leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => {this.props.inOptions()} }}
                centerComponent={{ text: 'Options', style: { color: '#fff' } }}
               />



          <View style = {styles.group}>

                 <ButtonGroup
                  selectedBackgroundColor="pink"
                  onPress={this.updateIndex}
                  selectedIndex={this.state.index}
                  buttons={['Standard', 'Satellite']}
                  containerStyle={{height: 30}}
                 />

          </View>



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
   // shouldComponentUpdate(newProps,newState){

  //  }


     async componentDidMount(){
        let prefExists = await file.fileExists('prefs');
        if(prefExists){
            let s = await file.fileRead('prefs');
            let s2 = s.split(" ");
            this.setState({
                       index: parseFloat(s2[0]),
                       radius: parseFloat(s2[1]),
                     });
           }

      }





     async componentWillUnmount(){
     let s = "" + this.state.index + " " + this.state.radius;
     let prefExists = await file.fileExists('prefs');
      if(prefExists){
        file.createFile('prefs',s)
       }
       else{
       file.fileWrite('prefs',s);
       }
      // this.props.onRadiusChange(this.state.radius);


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