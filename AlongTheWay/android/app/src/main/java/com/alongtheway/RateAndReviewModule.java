package com.alongtheway;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;
public class RateAndReviewModule  {

    private double lat;
    private double lon;
    private int reviewCount;
    private int ratingsCount;
    private String[] reviews;
    private int rating;

    public RateAndReviewModule(double latitude,double longitude, int revCount, int ratCount, String[] review, int rat   ){
        lat = latitude;
        lon = longitude;
        reviewCount = revCount;
        ratingsCount = ratCount;
        reviews = review;
        rating = rat;
    }

    public double getLat(){
        return lat;
    }
    public double getLon(){
        return lon;
    }

    public int getReviewCount() {
        return reviewCount;
    }

    public int getRatingsCount(){
        return ratingsCount;
    }

    public String[] getReviews(){
        return reviews;
    }

    public int getRating(){
        return rating;
    }
}