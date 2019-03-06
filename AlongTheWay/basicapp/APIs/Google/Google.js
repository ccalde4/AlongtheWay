import request from '../lib/request';
import querystring from 'querystring';
import Config from './config/config';

class Google  {

constructor(){
this.places ;
this.params ;

}
   setParams(params){

     this.params = params;

    }

   getParams(){

   return this.params;

   }

   setPlaces(places){

   this.places = places;

   }

   getPlaces(){

     return this.places;

     }

   search(){

    var config = Config.getConfig();
    var urlString = config.apiUrl + "/nearbysearch/json?" + querystring.stringify(this.getParams()) + '&' + querystring.stringify(config.creds);


      return request(urlString);
        /* .then((response)=>{this.setPlaces(response)})
          .catch((error)=>{console.log(error)});
        */
    }

    getDetails(place_id){
     var config = Config.getConfig();
     var urlString = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + place_id + '&' + querystring.stringify(config.creds);
     return request(urlString);
    }







}



export default Google;