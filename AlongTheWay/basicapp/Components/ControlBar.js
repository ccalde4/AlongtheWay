import React, {Component} from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import FilterButton from '../Buttons/FilterButton';
import FilterButton2 from '../Buttons/FilterButton2';

export default class ControlBar extends Component {
   constructor(props){
         super(props);
          this.state = {

          isMoreClicked: false
          }
     }

     onMoreClicked(){
                this.setState(
                                previousState => (

                                    { isMoreClicked: !previousState.isMoreClicked }
                                                          )
                      );

     }


  render() {
    return (

      <View style ={styles.layout2} >

          <View style = {styles.row1}>

            <FilterButton2 style = {styles.button1} text = 'MapType' clicked = {this.props.onRedClick} />

            <FilterButton style = {styles.button2} text = 'Pizza'   clicked = {this.props.onPizzaClick}/>

            <FilterButton2 style = {styles.button3} text = 'Coffee'  clicked = {()=>{}}/>

            <FilterButton style = {styles.button4} text = 'Fetch Data'  clicked = {this.props.onFetchClick} isPressed = {this.props.fetch}/>

            <FilterButton2 style = {styles.button5} text = ' More '   clicked = {this.onMoreClicked.bind(this)}/>



          </View>


                    {this.state.isMoreClicked ?
                    <View style = {styles.row1}>

                      <FilterButton style = {styles.button6} text = 'Burger' clicked = {this.props.onBurgerClick} isPressed = {this.props.burger}/>

                      <FilterButton style = {styles.button7} text = 'Local'   clicked = {this.props.onLocalClick} isPressed = {this.props.local}/>

                      <FilterButton style = {styles.button8} text = 'Parks'  clicked = {this.props.onParksClick} isPressed = {this.props.parks}/>

                      <FilterButton style = {styles.button9}  text = 'Review'  clicked = {this.props.onCornClick} isPressed = {this.props.corn}/>

                      <FilterButton style = {styles.button10} text = 'Options'   clicked = {this.props.onBurritoClick} isPressed = {this.props.burrito}/>
                    </View>
                      : null}


          </View>


    );
  }
}
const styles = StyleSheet.create({

button1: {
alignItems: 'center',
borderRadius: 50,
width: 50,
height: 50,
backgroundColor: 'crimson'
},
button2: {
alignItems: 'center',
borderRadius: 50,
width: 50,
height: 50,
backgroundColor: 'darksalmon'
},
button3: {

alignItems: 'center',
borderRadius: 50,
width: 50,
height: 50,
backgroundColor: 'darkkhaki'
},
button4: {
alignItems: 'center',
borderRadius: 50,
width: 50,
height: 50,
backgroundColor: 'darkolivegreen'
},
button5: {
alignItems: 'center',
borderRadius: 50,
width: 50,
height: 50,
backgroundColor: 'teal'
},
button6: {
alignItems: 'center',
borderRadius: 50,
width: 50,
height: 50,
backgroundColor: 'peachpuff'
//lavender
},
button7: {
alignItems: 'center',
borderRadius: 50,
width: 50,
height: 50,
backgroundColor: 'lightcoral'
},
button8: {

alignItems: 'center',
borderRadius: 50,
width: 50,
height: 50,
backgroundColor: 'mediumaquamarine'
},
button9: {
alignItems: 'center',
borderRadius: 50,
width: 50,
height: 50,
backgroundColor: 'paleturquoise'
},
button10: {
alignItems: 'center',
borderRadius: 50,
width: 50,
height: 50,
backgroundColor: 'peru'
},


layout2: {

flex: 1,
flexDirection: 'column',
justifyContent: 'space-around',
alignItems: 'center',
width: 420,
height: 150,
position: 'absolute',
bottom: 20,


},
row1: {

flex: 1,
flexDirection: 'row',
justifyContent: 'space-around',
alignItems: 'center',
width: 420,
height: 55,



},

row2: {

flex: 1,
flexDirection: 'row',
justifyContent: 'space-around',
alignItems: 'center',
width: 370,
height: 55,



},
 map2: {

                   ...StyleSheet.absoluteFillObject,





        },


});

