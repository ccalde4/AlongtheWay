import request from '../lib/request';
import querystring from 'querystring';
import Config from './config/config';

class Yelp  {

 constructor(){

 this.params ;

 }
   setParams(params){

     this.params = params;

    }

   getParams(){

   return this.params;

   }



   search(){

    var config = Config.getConfig();
    var urlString = config.apiUrl + "/search?" + querystring.stringify(this.getParams());
    var headers =  {
     headers:{
                'Authorization': 'Bearer ' + config.creds.key}
                }
      return request(urlString,headers).catch((err)=>{console.log("search failed")});

    }

    getDetails(place_id){

       var config = Config.getConfig();
       var urlString = config.apiUrl + "/" + place_id ;
       var headers =  {
           headers:{
                   'Authorization': 'Bearer ' + config.creds.key}
                   }
         return request(urlString,headers).catch((err)=>{console.log("search failed")});

   }


}

export default Yelp;