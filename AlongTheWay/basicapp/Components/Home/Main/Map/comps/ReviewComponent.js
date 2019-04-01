import React, { Component } from 'react';
import {  View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    reviewsList: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    reviewText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default class ReviewComponent extends Component {

  static propTypes = {
      reviews: PropTypes.array.isRequired
  };

  render() {
    return (
      <View style={styles.reviewsList}>
        {this.props.reviews.map((review, index) => {
            return (
                <View key={index}>
                    <Text style={styles.reviewText}>{review.name}</Text>
                </View>
            )
        })}
      </View>
    );
  }
}