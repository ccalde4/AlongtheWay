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

phoneSearch(phoneNum){
 var config = Config.getConfig();
    var urlString = config.apiUrl + "/search/phone?phone=+1" + phoneNum ;
    var headers =  {
     headers:{
                'Authorization': 'Bearer ' + config.creds.key}
                }
      return request(urlString,headers).catch((err)=>{console.log("yelp phone search failed")});

}

  /*async search(){

    var config = Config.getConfig();
    var urlString = config.apiUrl + "/search?" + querystring.stringify(this.getParams());
    var headers =  {
     headers:{
                'Authorization': 'Bearer ' + config.creds.key}
                }
     let searchReturn = await request(urlString,headers).catch((err)=>{console.log("yelp search failed")});
     return searchReturn;
     // return request(urlString,headers).catch((err)=>{console.log("yelp search failed")});

    }*/
 search(obj){
    console.log(obj);
    var config = Config.getConfig();
    var urlString = config.apiUrl + "/search?" + querystring.stringify(obj);
    var headers =  {
     headers:{
                'Authorization': 'Bearer ' + config.creds.key}
                }

      return request(urlString,headers).catch((err)=>{console.log("yelp search failed")});

    }
    getDetails(place_id){

       var config = Config.getConfig();
       var urlString = config.apiUrl + "/" + place_id ;
       var headers =  {
           headers:{
                   'Authorization': 'Bearer ' + config.creds.key}
                   }
         return request(urlString,headers).catch((err)=>{console.log("yelp getDetails search failed")});

   }

   getReviews(place_id){
   var config = Config.getConfig();
          var urlString = config.apiUrl + "/" + place_id +"/reviews";
          var headers =  {
              headers:{
                      'Authorization': 'Bearer ' + config.creds.key}
                      }
            return request(urlString,headers).catch((err)=>{console.log("yelp getReviews search failed")});
   }


}

export default Yelp;