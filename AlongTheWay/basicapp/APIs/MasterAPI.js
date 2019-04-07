import querystring from 'querystring';
import Parameters from './_lib/Parameters';
import Venues from './_lib/Venues';
import Yelp from './Yelp/Yelp';
import Foursquare from './Foursquare/Foursquare';



var searchParameters;
var yelp;
var foursquare;
var venues;
var distArray;
var finalArray;
var reviews;
class MasterAPI {

    constructor(){

        this.params;
        this.yelpParams;
        this.yelpReturn;

        finalArray = [];
        distArray = [];
        searchParameters = new Parameters();
        yelp = new Yelp();
        foursquare = new Foursquare();
        venues = new Venues();

    }

    setParams(params){
        searchParameters.setParams(params);


    }

    async search(){

    let yp = await searchParameters.getYelpParams();
    //console.log(this.yelpParams);
    let tempYelp = await this.addProp(await yelp.search(yp),'yelp') ;
    let changedYelp = await this.cloneObject(tempYelp);
        if(tempYelp != null){

        let details = await this.getDetails(changedYelp);
        //let detailsAndReviews = await this.getReviews(details);

        //console.log(details[0].reviews[0]);
        let uniformDetails = await this.makeUniform(details);
        return uniformDetails;

}
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

    for(let i = 0; i < obj.places.length; i++){
   // console.log("in details");
        if(((obj.places)[i]).from === 'yelp'){
            let temp = await yelp.getDetails((obj.places)[i].id);
            temp['reviews'] = (await yelp.getReviews((obj.places)[i].id)).reviews;
           // console.log(temp.reviews);
            temp['from'] = 'yelp';


            //console.log("u r in get details");
            //console.log(temp);
            finalArray[i]  = await temp;
        }
        else if(obj.places[i].from === 'foursquare'){
             let temp = await foursquare.getDetails((obj.places)[i].id);
             temp.response.venue['from'] = 'foursquare';
             finalArray[i]  = temp;
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



    addProp(obj,from){
        if(from === 'yelp'){
            for(let i = 0; i < obj.businesses.length; i++){
                (obj.businesses[i]).from = 'yelp';
                distArray[i] = obj.businesses[i].distance;
                //console.log(distArray[i]);
            }

        }

        else if(from === 'foursquare'){
             for(let i = 0; i < obj.response.venues.length; i++){
                        (obj.response.venues)[i].from = 'foursquare';
                        //console.log((obj.response.venues)[i]);
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
            {obj.response.venues ? obj['places'] = obj.response.venues : obj['places'] = obj.response.venue}
            delete(obj.response);
         }
         else{
         obj['places'] = obj;

         }
         return obj;
    }

    async makeUniform(obj){
        //console.log(obj.length);
        //console.log(obj);
        var uniform = []
        for(let i = 0; i < obj.length; i++){
            let place = this.cloneObject(obj[i]);
            place['distance'] = distArray[i]/1609.34;
            uniform[i] = await venues.makeUniformVenue(place);
             console.log(uniform[i].distance);
           // console.log(i);
            // console.log(uniform[i].reviews[0].user.name);
        }

        if(uniform !== null){
        return uniform;
        }
    }




}
export default MasterAPI;