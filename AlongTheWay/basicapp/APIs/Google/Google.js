import request from '../lib/request';
import querystring from 'querystring';
import Config from './config/config';

class Google  {

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
    var urlString = config.apiUrl + "/nearbysearch/json?" + querystring.stringify(this.getParams()) + '&' + querystring.stringify(config.creds);


      return request(urlString);

    }

    getDetails(place_id){
     var config = Config.getConfig();
     var urlString = config.apiUrl+" /details/json?placeid=" + place_id + '&' + querystring.stringify(config.creds);

     return request(urlString);
    }


}

export default Google;