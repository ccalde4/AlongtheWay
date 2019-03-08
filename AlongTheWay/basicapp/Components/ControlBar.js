import React, {Component} from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import FilterButton from '../Buttons/FilterButton';


export default class ControlBar extends Component {
   constructor(props){
         super(props);
          this.state = {
          isMoreClicked: false
          }
     }

     onMoreClicked(){
       this.setState( (previousState) => ({ isMoreClicked: !previousState.isMoreClicked }) );
       this.props.onMoreClick()

     }


  render() {
    return (

    <View style ={styles.layout} >
         {/* // First five buttons displayed by default  */}
     <View style = {styles.row}>

       <FilterButton label = 'Re Center'
                     color = 'crimson'
                     clicked = {this.props.onRedClick}   />

       <FilterButton label = 'Pizza'
                     color = 'darksalmon'
                     clicked = {this.props.onPizzaClick}
                     isPressed = {this.props.pizza}      />

       <FilterButton label = 'Coffee'
                     color = 'darkkhaki'
                     clicked = {this.props.onCoffeeClick}
                     isPressed = {this.props.coffee}     />

       <FilterButton label = 'Fetch Data'
                     color = 'darkolivegreen'
                     clicked = {this.props.onFetchClick}
                     isPressed = {this.props.fetch}      />

       <FilterButton label = ' More '
                     color = 'teal'
                     clicked = {this.onMoreClicked.bind(this)}
                     isPressed = {this.props.more}       />



       </View>

           {/* //Conditional rendering of buttons to be displayed if More is clicked  */}
        {this.state.isMoreClicked ?

         <View style = {styles.row}>

          <FilterButton label = 'Burgers'
                        color = 'peachpuff'
                        clicked = {this.props.onBurgerClick}
                        isPressed = {this.props.burger}  />

          <FilterButton label = 'Chicken'
                        color = 'lightcoral'
                        clicked = {this.props.onLocalClick}
                        isPressed = {this.props.local}   />

          <FilterButton label = 'Parks'
                        color = 'mediumaquamarine'
                        clicked = {this.props.onParksClick}
                        isPressed = {this.props.parks}   />

          <FilterButton label = 'Review'
                        color = 'paleturquoise'
                        clicked = {this.props.onCornClick}
                        isPressed = {this.props.corn}    />

          <FilterButton label = 'Options'
                        color = 'peru'
                        clicked = {this.props.onBurritoClick}
                        isPressed = {this.props.burrito} />

        </View>

       : null}


     </View>


    );
  }
}
const styles = StyleSheet.create({
//lavender

layout: {

flex: 1,
flexDirection: 'column',
justifyContent: 'space-around',
alignItems: 'center',
width: 420,
height: 150,
position: 'absolute',
bottom: 20,

},
row: {

flex: 1,
flexDirection: 'row',
justifyContent: 'space-around',
alignItems: 'center',
width: 420,
height: 55,

},



});

