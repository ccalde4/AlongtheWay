import request from '../../lib/request';
import querystring from 'querystring';
var config = {
  apiUrl        : 'https://api.foursquare.com/v2',
  creds         : {
   "v"            : '20190214',
   "client_id"     :'1KVMYPHAH15IRBPS4AAA4PYAPXCSU15ACB20L0B1DRUDGFFX',
   "client_secret" :'5O5Z3YVLXKYLF5HBRUQPVRIP5KFTUK2OIUJNI52DMFZEEMME',
    "locale"       : 'en'
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