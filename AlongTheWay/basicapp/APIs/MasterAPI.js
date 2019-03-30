import querystring from 'querystring';
import Parameters from '../Parameters';
import Yelp from './Yelp/Yelp';
import Foursquare from './Foursquare/Foursquare';


var searchParameters;
var yelp;
var foursquare;

var finalArray;

class MasterAPI {

constructor(){

this.params;
this.yelpParams;
this.yelpReturn;
this.foursquareReturns;
this.foursquareParams;

searchParameters = new Parameters();
yelp = new Yelp();
foursquare = new Foursquare();

}

setParams(params){
    searchParameters.setParams(params);
}

async search(){

//let yp = await searchParameters.getYelpParams();
//console.log(this.yelpParams);
let tempYelp = await this.addFromProp(await yelp.search(searchParameters.getYelpParams()),'yelp') ;
let changedYelp = await this.cloneObject(tempYelp);

//console.log(tempYelp);
//console.log(changedYelp)
/*//let temp = addFromProp(tempYelp, yelp);

//await console.log(tempYelp.businesses[9]);
//let tempYelpLength = await tempYelp.businesses.length;
//await console.log(tempYelpLength);
//this.yelpReturns =  tempYelp;
//let fp = await searchParameters.getFoursquareParams();
//console.log(fp);*/
//let tempFoursquare = await addFromProp( await foursquare.search(searchParameters.getFoursquareParams()), 'foursquare');
//console.log(tempFoursquare);
//this.foursquareReturns =  tempFoursquare;
//finalArray = tempYemp2.concat(tempFoursquare2);
//finalArray = (tempYelp.businesses).concat(tempFoursquare.response.venues);
return tempYelp;
//let tempDetails = await this.getDetails(tempFoursquare);
//console.log(tempDetails);
//console.log(tempYelp.total);

//finalPlacesArray = await this.removeDuplicates(tempYelp.concat(tempFoursquare), tempYelpLength);
//return (finalPlacesArray);

//console.log(tempFoursquare);
}

/*removeDuplicates(allResultsArray, breakPoint)
{
for(let i = 0; i< breakPoint;i++){
console.log(allResultsArray[i]);
    for(let j = breakPoint; j < foursquare_array.length; j++){
        if((foursquare_array.response.venues)[j].address === (yelp_array.businesses)[i].address1){
        console.log((yelp_array.businesses)[j].address1);
        }e
    }
}
}*/

async getDetails(obj){

for(let i = 0; i < obj.length; i++){
console.log("in details");
    if(((obj.places)[i]).from === 'yelp'){
        let temp = await yelp.getVenueDetails(obj.places[i].id);
        console.log("u r in get details");
        finalArray[i]  = temp;
    }
    else if(obj.places[i].from === 'foursquare'){
         finalArray[i] = await foursquare.getDetails(obj.places[i].id);
    }
    else{
        console.log("get details error occurred");
    }
}

if(finalArray !== null){
return finalArray}

}
getParams(){

   return this.params;

   }

addFromProp(obj,from){
    if(from === 'yelp'){
        for(let i = 0; i < obj.businesses.length; i++){
            (obj.businesses[i]).from = 'yelp';
            //console.log(obj.businesses[i]);
        }

    }

    else if(from == 'foursquare'){
         for(let i = 0; i < obj.response.venues.length; i++){
                    (obj.response.venues)[i].from = 'foursquare';
                    console.log((obj.response.venues)[i]);
          }

     }
     return obj;
}
cloneObject(obj){
if(obj.businesses){
    obj['places'] = obj.businesses;
    delete(obj.businesses);

    }
 else if(obj.response){
    obj['places'] = obj.response.venues;
    delete(obj.response);
 }
 return obj;
}


isEmpty(){
return (this.params === null);
}

}
export default MasterAPI;