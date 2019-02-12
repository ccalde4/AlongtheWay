import { SearchBar } from 'react-native-elements';
import React, {Component} from 'react';
import { Text, View,StyleSheet, KeyboardAvoidingView,Keyboard} from 'react-native';

export default class App extends React.Component {
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <SearchBar
        containerStyle = {styles.map}
        placeholder="Avery"
        onChangeText={this.updateSearch}
        value={search}
      />
    );
  }
}


const styles = StyleSheet.create({


    map: {
                width: 400,
                height: 100,
                position: 'absolute',
                top: 10,

    },





});
