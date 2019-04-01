import request from '../_lib/request';
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

   getDetails(place_id){

     var config    = Config.getConfig();
     var urlString = config.apiUrl + "/venues/" + place_id + '?' + querystring.stringify(config.creds);

      return request(urlString).catch((err)=>{console.log("venue detail search failed")});

   }







}
export default Foursquare;