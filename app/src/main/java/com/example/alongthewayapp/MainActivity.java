package com.example.alongthewayapp;

import android.app.Dialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;
import android.util.Log;




import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GoogleApiAvailability;

public class MainActivity extends AppCompatActivity {
private static final String TAG = "MainActivity";
private static final int ERROR_DIALOGUE_REQUEST = 9001;
    @Override


    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        if(isServicesOK()){
            init();
        }
    }
    private void init(){
        Button btnMap = (Button) findViewById(R.id.btnMap);
        btnMap.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view){
                Intent intent =  new Intent(MainActivity.this, MapActivity.class);
                startActivity(intent);
            }
        });

    }

    public boolean isServicesOK(){
        Log.d(TAG,"isServiceOK: check google services version");
        int available = GoogleApiAvailability.getInstance().isGooglePlayServicesAvailable(MainActivity.this);
        if(available == ConnectionResult.SUCCESS){
            Log.d(TAG, "isServiceOK: Google Play services is working");
            return true;
        }
        else if(GoogleApiAvailability.getInstance().isUserResolvableError(available)){
            Log.d(TAG, "an error occurred but we can fix it");
            Dialog dialog = GoogleApiAvailability.getInstance().getErrorDialog(MainActivity.this,available,ERROR_DIALOGUE_REQUEST );
            dialog.show();
        }
        else{
            Toast.makeText(this, "You can't make make requests", Toast.LENGTH_SHORT).show();
        }
        return false;
    }

}
