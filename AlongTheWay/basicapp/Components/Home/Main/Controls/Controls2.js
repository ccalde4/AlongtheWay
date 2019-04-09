import React, {Component} from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import FilterButton from './comps/FilterButton';
import BottomDrawer from 'rn-bottom-drawer';

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


       <BottomDrawer
               containerHeight={350}
               offset={20}
               startUp = {false}

             >
               <View style = {{height:30,marginBottom:20}} />
               <View style = {styles.row}>
                  <FilterButton label = 'Re Center'
                                       color = 'crimson'
                                       clicked = {this.props.onRedClick}   />

                         <FilterButton label = 'Food'
                                       color = 'darksalmon'
                                       clicked = {this.props.onFoodClick}
                                       isPressed = {this.props.food}      />

                         <FilterButton label = 'Landmarks'
                                       color = 'darkkhaki'
                                       clicked = {this.props.onLandmarksClick}
                                       isPressed = {this.props.landmarks}     />

                         <FilterButton label = 'Fetch Data'
                                       color = 'darkolivegreen'
                                       clicked = {this.props.onFetchClick}
                                       isPressed = {this.props.fetch}      />

                         <FilterButton label = ' More '
                                       color = 'teal'
                                       clicked = {this.onMoreClicked.bind(this)}
                                       isPressed = {this.props.more}       />
               </View>
               <View style = {styles.row}>

                             <FilterButton label = 'Local'
                                           color = 'crimson'
                                           isPressed = {this.props.local}
                                           clicked = {this.props.onLocalClick}   />

                             <FilterButton label = 'Shop'
                                           color = 'peachpuff'
                                           clicked = {this.props.onShopClick}
                                           isPressed = {this.props.shop}  />

                            <FilterButton label = 'Outdoors'
                                           color = 'lightcoral'
                                           clicked = {this.props.onOutdoorsClick}
                                           isPressed = {this.props.outdoors}   />

                             <FilterButton label = 'Nightlife'
                                            color = 'mediumaquamarine'
                                            clicked = {this.props.onNightlifeClick}
                                            isPressed = {this.props.nightlife}   />

                             <FilterButton  label = 'Gas'
                                            color = 'peachpuff'
                                            clicked = {this.props.onGasClick}
                                            isPressed = {this.props.gas}  />



                             </View>
          <View style = {styles.row}>

                   <FilterButton label = 'Gas'
                                 color = 'peachpuff'
                                 clicked = {this.props.onGasClick}
                                 isPressed = {this.props.gas}  />

                   <FilterButton label = 'Rest'
                                 color = 'lightcoral'
                                 clicked = {this.props.onRestClick}
                                 isPressed = {this.props.rest}   />

                   <FilterButton label = 'Arts'
                                 color = 'mediumaquamarine'
                                 clicked = {this.props.onArtsClick}
                                 isPressed = {this.props.arts}   />

                   <FilterButton label = 'Emergency'
                                 color = 'paleturquoise'
                                 clicked = {this.props.onMedicalClick}
                                 isPressed = {this.props.medical}    />

                   <FilterButton label = 'Options'
                                 color = 'peru'
                                 clicked = {this.props.onOptionsClick}
                                 isPressed = {this.props.options} />

                 </View>
       </BottomDrawer>



    );
  }
}
const styles = StyleSheet.create({
//lavender
test: {
width: 50,
height: 50,
backgroundColor: 'pink'

},
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

//flex: 1,
flexDirection: 'row',
justifyContent: 'space-around',
alignItems: 'center',
marginTop: 15,
width: 420,
height: 67,

},



});