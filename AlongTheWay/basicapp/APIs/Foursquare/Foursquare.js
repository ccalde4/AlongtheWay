import request from '../lib/request';
import querystring from 'querystring';
import Config from './config/config';

class Foursquare {


constructor(){

this.params;

}



   setParams(params){

     this.params = params;

    }

   getParams(){

   return this.params;

   }


    search(){

    var config    = Config.getConfig();
    var urlString = config.apiUrl + "/venues/search?" +
                    querystring.stringify(this.getParams()) + '&' +
                    querystring.stringify(config.creds);

     return request(urlString).catch((err)=>{console.log("search failed")});

   }

   getVenueDetails(place_id){

     var config    = Config.getConfig();
     var urlString = config.apiUrl + "/venues/" + place_id + '?' + querystring.stringify(config.creds);

      return request(urlString).catch((err)=>{console.log("search failed")});

   }

    async getDetails(data_arr){
        let details = [];
        for(let i = 0; i < data_arr.response.venues.length; i++){
            console.log(i);
            details[i] = await this.getVenueDetails((data_arr.response.venues)[i].id);
            console.log(details[i].venue.name)
             }
             return details;
   }


}


export default Foursquare;