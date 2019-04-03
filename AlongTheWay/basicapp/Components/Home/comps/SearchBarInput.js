import React from 'react';
import {StyleSheet,View,TextInput} from 'react-native';


 const SearchBarInput =({value,onChangeText,onSubmitEditing}) => (
                            <View>
                              <TextInput
                                   placeholder="Enter destination..."
                                   style={styles.Stops}
                                   value={value}
                                   clearButtonMode="always"
                                   onChangeText = {onChangeText}
                                   onSubmitEditing = {onSubmitEditing}
                              />

                            </View>
                               );
   export default SearchBarInput;
 const styles = StyleSheet.create({


 Stops: {
           height: 40,
           borderWidth: 0.5,
           marginTop: 10,
           borderRadius: 10,
           marginLeft: 5,
           marginRight: 5,
           padding: 5,
           backgroundColor: "white"
         }


 });