import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight
} from 'react-native';

//import { addRating } from '../Services/RatingService';
export default class AddRating extends Component {
  constructor(props) {
      super(props);
      this.state = {
        newRating: 0,
        starCount: 0

      }
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
      addRating(this.state.newRating)
      console.log("rating added")
    }
  onStarRatingPress(rating) {
      this.setState({
        starCount: rating
            });
          }
  render() {
    return (
    <View style={styles.main}>
     <Text style={styles.title}>Rate</Text>
   /* <StarRating
            disabled={false}
            maxStars={5}
            rating={this.state.starCount}
            selectedStar={(rating) => this.onStarRatingPress(rating)}
          />*/
        <TouchableHighlight
                style = {styles.button}
                underlayColor= "white"
                onPress = {this.handleSubmit}
              >
              <Text
                  style={styles.buttonText}>
                 Submit Rating
              </Text>
            </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#2a8ab7'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center'
  },

  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor:'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});