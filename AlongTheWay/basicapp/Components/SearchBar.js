import React from 'react';
import { SearchBar } from 'react-native-elements';
import { Text, View,StyleSheet, KeyboardAvoidingView,Keyboard, TextInput, ScrollView} from 'react-native';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import LocationItem from '../Components/LocationItem';






export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <GoogleAutoComplete key = 'AIzaSyCvfftvHMnURvTGkaiVyHQMdcYsGZsCVNs' debounce = {500} minLength ={2}>
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
        backgroundColor: '#4286f4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        height: 40,
        width: 300,
        borderWidth: 1,
        paddingHorizontal: 16
    },


});


