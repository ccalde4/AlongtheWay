package com.alongtheway;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;

public class RatnRevModule extends ReactContextBaseJavaModule {
String[] review = new String[10] ;
int i = 0;
    public RatnRevModule(ReactApplicationContext reactContext) {
        super(reactContext); //required by React Native
    }

    @Override
    //getName is required to define the name of the module represented in JavaScript
    public String getName() {
        return "RatnRev";
    }


    @ReactMethod
    public void StoreReview(String input) {
        review[i] = input;
        i++;
    }
}