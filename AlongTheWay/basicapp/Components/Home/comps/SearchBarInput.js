import React, {Component} from 'react';
import {StyleSheet,View,TextInput,Keyboard,TouchableWithoutFeedback,Text,Dimensions,TouchableOpacity} from 'react-native';
import Predictions from './Predictions';
import request from '../../../APIs/_lib/request';
import Config from '../../../APIs/Google/config/config';
import _ from "lodash";
import MoreStops from './MoreStop'
var { winHeight, winWidth } = Dimensions.get('window');
var key;
var url;
 class SearchBarInput extends Component{

       constructor(props){
        super(props);
          this.state = {
           predictions: [],
           destination: " ",
           destinationId: " ",
           focused: false,
           cancel: true,

          }
          //function that prevents too many calls to google
          this.onChangeDestinationDebounced = _.debounce(
                         this.onChangeDestination,
                         1000
                       );

          key = Config.getConfig().creds.key;
          url = Config.getConfig().url2;
       }

       //function that calls google for suggestions
       async onChangeDestination(destination) {

               var onChangeDestination = url +"/place/autocomplete/json?key="+key+"&input="+destination+"&location="
                                             +this.props.lat+","+this.props.long+"&radius="+2000;

               try {
                const json = await request(onChangeDestination);
                 this.setState({
                   predictions: json.predictions
                 });
               //  console.log(json);
               } catch (err) {
                 console.error(err);
               }
             }

             //logic to handle when the cancel button is clicked
          onCancel(){
           if(this.props.start){
              this.setState({ destination: " "});
              this.setState({ destinationId: " " });
             this.props.remove(this.props.index);
             return;
           }
          this.setState({cancel:false});
          this.props.remove(this.props.index);
          }
            //function to keep track of what is typed
         onChangeText(text){
         this.onChangeDestinationDebounced(text);
         this.setState({ destination:text });
         }

            //function call by prediction Component that adds stop and exits searching screen
         addStop(destinationPlaceId,destinationName){

            this.setState({ destination:destinationName });
            this.setState({ destinationId:destinationPlaceId });
            this.setState({predictions: []});

            this.props.add(this.props.index,destinationPlaceId,destinationName)
            this.setState( (previousState) => ({focused: !previousState.focused}) );
            this.props.Search();
            Keyboard.dismiss();
         }

           onSubmit(){
            this.setState({predictions: [],destination: " ",destinationPlaceId: " "})
            Keyboard.dismiss();


           }

           //function to handle searchbars that are not being used to prevent funky rendering
         onFocus(){

         this.setState( (previousState) => ({focused: !previousState.focused}) );
         this.props.onFocus(this.props.index);
         this.props.Search();
         }

         cancel(){

                    //console.log("null");
                    this.setState( (previousState) => ({focused: !previousState.focused}) );
                    this.props.Search();
                    Keyboard.dismiss();
                    return;


         }


    render(){

          if(!this.state.cancel){
             return(<View/>)

          }
        if(this.props.inSearch&&!this.state.focused){

           return(<View/>)

        }

          if(!this.state.focused){
          return(
            <View style = {styles.decoyView}>

            <TouchableWithoutFeedback onPress = {this.onFocus.bind(this)}   >

               <View style = {styles.decoy}>
                   <Text> {this.state.destination} </Text>
               </View>

             </TouchableWithoutFeedback>
                 <TouchableOpacity  style = {styles.cancel}
                                    onPress = {this.onCancel.bind(this)}>
                <View />
                </TouchableOpacity>
           </View>

          );
         }else{

         return(
         <View style = {styles.container}>
          <TextInput  value = {this.state.destination}
                      placeholder="Enter destination..."
                      style={styles.textInput}
                      clearButtonMode= {"always"}
                      onChangeText = {this.onChangeText.bind(this)}
                      onSubmitEditing = {this.onSubmit.bind(this)}
                      onFocus = {()=>{}}
                                                          />
               {!this.state.predictions == [] ? this.state.predictions.map(prediction => {

                     return(
                      <Predictions
                                onClick = {this.addStop.bind(this)}
                                key = {prediction.id}
                                      {...prediction}
                                                                      />
                             );})

                :null}
                <MoreStops text = "Cancel"
                          onPress = {this.cancel.bind(this)}
                                                            />

          </View>



     );


         }

    }






 }
   export default SearchBarInput;
 const styles = StyleSheet.create({

 decoyView: {
  marginBottom: 10,
  height: 40,
  width: 420,
  flexDirection: "row",
 // alignItems: 'center',
 // justifyContent: 'space-between'
 },
  cancel:{
  width:30,
  width:30,
  paddingLeft: 2,
  borderRadius: 50,
  backgroundColor: 'lightgray',
  //position: 'absolute',
  marginTop: 10,
  },

 textInput: {
 height: 40,
 borderWidth: 0.5,
 marginTop: 10,
 borderRadius: 10,
 marginLeft: 5,
 marginRight: 5,
 padding: 5,
 backgroundColor: "white"
  },
 decoy: {

 width: 360,
 height: 40,
// borderWidth: 0.5,
 marginTop: 10,
 borderRadius: 10,
 marginLeft: 5,
 marginRight: 5,
 padding: 5,
 backgroundColor: "white"
  },


 container: {
        flex: 1,
       //   flexDirection: "column",
        width: winWidth,
        height: winHeight,
        backgroundColor: "green"

      },


 });