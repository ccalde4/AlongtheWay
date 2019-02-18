/**import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

export default class Home extends Component {
  render() {
    return (
      <View>
        <Text>Home Screen</Text>
         <Button
           title="Rate"
           onPress={() => this.props.navigation.navigate('AddRating')}
         />
        <Button
          title="Add a Review"
          onPress={() => this.props.navigation.navigate('AddReview')}
        />

        <Button
          title="List of Reviews"
          color="green"
          onPress={() => this.props.navigation.navigate('SeeReviews')}
        />
      </View>
    );
  }
}
*/