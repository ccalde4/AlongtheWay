import React, {PureComponent}from 'react';
import {StyleSheet,TouchableHighlight,Text,View} from 'react-native';

// prediction button used to render suggested location and clickable to add to route
class Predictions extends PureComponent {

           onClick(){

          this.props.onClick(this.props.place_id,this.props.description);
           //console.log(this.props.place_id+" "+this.props.description);
           }


          render(){
           return(
          <TouchableHighlight onPress= {this.onClick.bind(this)}
                  key={this.props.id}
                                                >
             <View>
               <Text style={styles.suggestions}>
                 {this.props.description}
               </Text>
             </View>
           </TouchableHighlight>
           );
           }


};

export default Predictions;

const styles = StyleSheet.create({


suggestions: {
      backgroundColor: "white",
      padding: 5,
      fontSize: 18,
      borderWidth: 0.5,
      marginLeft: 5,
      marginRight: 5
    }



});