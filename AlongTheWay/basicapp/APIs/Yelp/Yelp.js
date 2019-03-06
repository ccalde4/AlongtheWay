import request from '../lib/request';
import querystring from 'querystring';
import Config from './config/config';

class Yelp  {

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
    var urlString = config.apiUrl + "/search?" + querystring.stringify(this.getParams());

     var headers =  {
     headers:{
                'Authorization': 'Bearer ' + config.creds.key}
                }
      return request(urlString,headers);
        /* .then((response)=>{this.setPlaces(response)})
          .catch((error)=>{console.log(error)});
        */
}








}



export default Yelp;