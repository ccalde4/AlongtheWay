import request from '../../lib/request';
import querystring from 'querystring';
var config = {
  apiUrl        : 'https://api.yelp.com/v3/businesses',
  creds         : {
   "key"           : 'dwgERu3Ms4e9ktmhnnL0pwdq7uJO9r6IzfEfWw9VZthBrC4WYOEIWFT3QtX9k8p_ghX61Laoy1258GLbmj9xbhF3qxqOI_QHLeHGxCawMoZAgFstyTpZPmvz4gOAXHYx'

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