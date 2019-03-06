import request from '../../lib/request';
import querystring from 'querystring';
var config = {
  apiUrl        : 'https://maps.googleapis.com/maps/api/place',
  creds         : {
   "key"           : 'AIzaSyCvfftvHMnURvTGkaiVyHQMdcYsGZsCVNs'

  }

}

const Config = {


   getLocale: function(){

   return config.creds.locale;

   },

   setLocale: function(locale){

    config.creds.locale = locale;

   },

   getConfig: function(){

   return config;

   },

}


export default Config;