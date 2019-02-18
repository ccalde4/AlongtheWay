/**import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import ReviewComponent from './Components/ReviewComponent';

import { db } from '../config/db';

let reviewsRef = db.ref('ratingsAndReviews/places');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#B6A6BB',
    }
  })

export default class SeeReviews extends Component {

    state = {
        reviews: []
    }

    componentDidMount() {
        reviewsRef.on('value', (snapshot) => {
            let data = snapshot.val();
            let reviews = Object.values(data);
            this.setState({reviews});
         });
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.reviews.length > 0
                    ? <ReviewComponent reviews={this.state.review} />
                    : <Text>No reviews</Text>
                }
            </View>
        )
    }
}*/
