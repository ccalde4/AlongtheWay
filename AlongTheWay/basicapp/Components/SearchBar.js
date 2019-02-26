import React, {Component} from 'react';
import { SearchBar } from 'react-native-elements';
import { Text, View,StyleSheet,TouchableOpacity, KeyboardAvoidingView,Keyboard, TextInput, ScrollView, ActivityIndicator} from 'react-native';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import LocationItem from '../Components/LocationItem';
import { Input } from 'react-native-elements';


export default class App extends Component {
        constructor(props){
        super(props);
        this.state ={
         canceled: true
        }
        }


       onCancel(){



      Keyboard.dismiss()

       }
    componentWillUnmount(){

      console.log("unMounted")
    }



  render() {

    return (

      <View style={styles.container}>

        <GoogleAutoComplete apiKey =  {'AIzaSyCvfftvHMnURvTGkaiVyHQMdcYsGZsCVNs'} debounce = {500} minLength ={2}>

            {({handleTextChange,
               locationResults,
               fetchDetails,
               isSearching,


               }) => (

                <React.Fragment>

                    {console.log('locationResults', locationResults)}

                  <View style = {styles.inputWrapper} >


                   <TextInput style={styles.textInput}


                              placeholder="Type Here..."
                              onChangeText ={handleTextChange}
                              blurOnSubmit = {true}
                              autoFocus = {true}
                              onKeyPress={(e) => console.log(e.nativeEvent.key)}


                              onSubmitEditing = {this.props.onSearch}
                              editable = {this.state.canceled}                 />


                    <TouchableOpacity style = {styles.home} onPress = {this.props.onSearch}>
                      <Text style = {styles.text} >  Go </Text>
                    </TouchableOpacity>
                        </View>


                        <ScrollView >

                        {locationResults.map(el => (

                            <LocationItem
                                 goTo = {this.props.goTo}
                                {...el}

                                key={el.id}

                                />

                            ))}

                        </ScrollView>

                            </React.Fragment>

                    )}

        </GoogleAutoComplete>

      </View>

    );

  }

}



const styles = StyleSheet.create({
    con: {
     width: 350,
     height: 60

    },
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,

    },
    home:{

         justifyContent: 'center'

        },

    textInput: {
        height: 50,
        width: 340,
        borderWidth: .1,
        paddingHorizontal: 16,
        borderRadius: 50,
        fontSize: 20,
        backgroundColor: 'lightgray'

    },
    inputWrapper: {
     flexDirection: 'row',

     marginTop: 15
    },
    text: {
    fontSize: 20
    }





});


