import React from 'react';

import { SearchBar } from 'react-native-elements';

import { Text, View,StyleSheet, KeyboardAvoidingView,Keyboard, TextInput, ScrollView, Image} from 'react-native';

import { GoogleAutoComplete } from 'react-native-google-autocomplete';

import LocationItem from '../Components/LocationItem';













export default class App extends React.Component {

  render() {

    return (

      <View style={styles.container}>

        <GoogleAutoComplete apiKey =  {'AIzaSyCvfftvHMnURvTGkaiVyHQMdcYsGZsCVNs'} debounce = {500} minLength ={2}>



            {({handleTextChange,

               locationResults,

               fetchDetails,

               isSearching

               }) => (

                <React.Fragment>

                    {console.log('locationResults', locationResults)}

                  <View>

                   <TextInput

                    style={styles.textInput}

                    placeholder="Type Here..."

                    onChangeText ={handleTextChange}

                    />

                        </View>

                        <ScrollView>

                        {locationResults.map(el => (

                            <LocationItem

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

    container: {

        backgroundColor: 'white',

        alignItems: 'center',

        justifyContent: 'center',

    },

    textInput: {

        height: 40,

        width: 400,

        borderWidth: 1,

        paddingHorizontal: 16

    },





});


