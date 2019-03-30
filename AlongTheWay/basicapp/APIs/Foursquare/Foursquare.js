import request from '../lib/request';
import querystring from 'querystring';
import Config from './config/config';
var details;
class Foursquare {


constructor(){
details = [];
this.params;


}



   setParams(params){

     this.params = params;

    }

   getParams(){

   return this.params;

   }


    search(obj){

    var config    = Config.getConfig();
    var urlString = config.apiUrl + "/venues/search?" +
                    querystring.stringify(obj) + '&' +
                    querystring.stringify(config.creds);

     return request(urlString).catch((err)=>{console.log("search failed")});

   }

   getVenueDetails(place_id){

     var config    = Config.getConfig();
     var urlString = config.apiUrl + "/venues/" + place_id + '?' + querystring.stringify(config.creds);

      return request(urlString).catch((err)=>{console.log("venue detail search failed")});

   }

    getDetails(data_arr){

        for(let i = 0; i < data_arr.response.venues.length; i++){
            //console.log(i);
            details[i] =  this.getVenueDetails((data_arr.response.venues)[i].id);
            console.log("getDetails reached");
             }

   }

   getDeets(){
   return details;
   }





}
export default Foursquare;