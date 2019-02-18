import 'react-native';
import React from 'react';
import App from '../App';
let reviews = [
    {
        placeID: 1,
        name: 'Louie Cafe',
       // longitude: '',
        //latitude: '',
        rating: 0,
        ratingCount:0,
        reviewCount: 0,
        locReviews: []
    },
    {
        placeID: 2,
        name: 'Inga Subs',
       // longitude: '',
       // latitude: '',
        rating: 0,
        ratingCount:0,
        reviewCount: 0,
        locReviews: []

    },
    {
        placeID: 3,
        name: 'Highland Coffee',
       // longitude: '',
        //latitude: '',
        rating: 0,
        ratingCount:0,
        reviewCount: 0,
        locReviews:[]

    }
];

export let findAll = () => new Promise((resolve, reject) => {
    resolve(reviews);
});
//probably will have to parse this
export let findByName = (name) => new Promise((resolve, reject) => {
    let filtered = reviews.filter(review => (review.name).toLowerCase().indexOf(name.toLowerCase()) > -1);
    resolve(filtered);
});
export let findById = (id) => new Promise((resolve, reject) => {
    let review = reviews[id-1];
    resolve({
        name: review.name,
        //longitude: review.longitude,
       // latitude: review.latitude,
        rating: review.rating,
        ratingCount: review.ratingCount,
        reviewCount: review.reviewCount,
        locReviews: review.locReviews[]
    });
