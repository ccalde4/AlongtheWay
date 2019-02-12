import React, {Component} from 'react';
import { Text, View,StyleSheet, KeyboardAvoidingView,Keyboard} from 'react-native';
import ControlBar from '../Components/ControlBar';
import MapGui from '../Components/MapGui';
import SearchBar from '../Components/SearchBar';



export default class Main extends Component {


        constructor(props)
       {
          super(props)

           this.state = {

             mapsType: 'standard',
             redClicked: true,
            }
       }


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

      <View style={styles.Gui}  >


            <MapGui mapsType ={this.state.mapsType}  styling = {styles.map2} />
             <SearchBar/>
           <ControlBar redClick = {this.onRedClick.bind(this)}/>


      </View>

    );
  }
}



const styles = StyleSheet.create({
  Gui: {
  flexDirection: 'column',
  padding: 10,
  flex:1,
  backgroundColor: "pink",
  justifyContent: "space-around",
  alignItems: "center",
  },

    map: {
                width: 400,
                height: 400,

    },

        map2: {

                   ...StyleSheet.absoluteFillObject,





        },



});

