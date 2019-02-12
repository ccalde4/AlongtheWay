/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import { Text, View,StyleSheet} from 'react-native';
import MainView from './basicapp/Components/MainView';
import ControlBar from './basicapp/Components/ControlBar';
import MapGui from './basicapp/Components/MapGui';
export default class App extends Component {


        constructor(props)
       {
          super(props)
              {/* this.state is where all global variables should be kept
                 when a object in state is updated react will notice and re render any component that uses
                 it. this is what is happening when onRedClick is called by ControlBar
              */}
           this.state = {

             mapsType: 'standard',
             redClicked: true,
             orangeClicked: true,
             yellowClicked: true,
             greenClicked: true,
             blueClicked: true,


            }
       }

            /* this is the method that is passed to, and called to ControlBar */
       onRedClick()
       {

           this.setState(previousState => (

                   {redClicked: !previousState.redClicked }
                                         )
           );

           if(this.state.redClicked)
           {

              this.setState(

                 { mapsType: 'standard'}
              )
           }
           else
           {

               this.setState(

                 {mapsType: 'satellite'}

               )
           }


       }


     render() {
      return (
      //<View style =alignItems: 'center'}}>
      //<SearchBar name = 'Test' />


      <View style={styles.Gui} >

               {/* MapGui is just a stateless component I made to render the react native maps
                   right now it only takes two properties but any amount can be added
                    the two it takes are: mapsTypes as state and the dimensions of desired size of map
               */}



           <MapGui mapsType ={this.state.mapsType}  styling = {styles.map} />


               {/* Control bar is just a basic UI component that i put buttons on*/}
               {/* I pass a function to it like described in class.  i call it redClick but this name is arbitrary*/}


             <ControlBar redClick = {this.onRedClick.bind(this)}/>
      </View>
    );
  }
}





const styles = StyleSheet.create({
  Gui: {
  flexDirection: 'column',
  padding: 0,
  flex:1,
  backgroundColor: "pink",
  justifyContent: "space-around",
  alignItems: "center",
  },

   mapWindow:{

      width: 420,
      height: 400,
      backgroundColor: 'green',
      padding: 0
      },
    map: {
                width: 420,
                height: 660,


    },



});


