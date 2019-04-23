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

/*MasterAPI class allows both yelp and foursquare APIs to be called and returns uniform venue objects*/
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
    //sets the parameters for the api search
    setParams(params){
        searchParameters.setParams(params);


    }
    //searches the API and returns 1 if API search comes up empty
    async search(){
    let yp = await searchParameters.getYelpParams();
        let yelpReturn = await yelp.search(yp);
       if(yelpReturn.total !== 0){
            return yelpReturn;
            }
        else{
        return -1
        }
    }

    /*searches API and immediately gets the details for each venue
    returns a venue component with desired attributes if API search does not come up empty,
    else, returns -1*/
    async searchAndGetDetails(){

    let yp = await searchParameters.getYelpParams();
    console.log(yp);
    let yelpReturn = await yelp.search(yp);
    console.log(yelpReturn);
    if(yelpReturn.total !== 0){
        let tempYelp = await this.addProp(yelpReturn,'yelp') ;
        console.log(tempYelp);

            if(tempYelp.total !== 0){
            let changedYelp = await this.cloneObject(tempYelp);
            console.log(changedYelp);
            let details = await this.getDetails(changedYelp);
            let uniformDetails = await this.makeUniform(details);
            //console.log(uniform)
            console.log(uniformDetails.length);
            return uniformDetails;
        }
     }
     else{
     return (-1);
     }

    }



    async getDetails(obj){

    for(let i = 0; i < obj.places.length; i++){
        if(((obj.places)[i]).from === 'yelp'){
            let temp = await yelp.getDetails((obj.places)[i].id);
            temp['reviews'] = (await yelp.getReviews((obj.places)[i].id)).reviews;
           temp['from'] = 'yelp';
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


    /*adds "from" to more easily distinguish between API returns and
     adds "distance" property to distArray to use in the uniform component later*/
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
/*makes object more uniform by replacing API property with "places" to avoid more if-statements down the line*/
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
/*makes a uniform venue object that contains only the information desired and
makes working with multiple API returns easier*/
    async makeUniform(obj){
         var uniform = []
        for(let i = 0; i < obj.length; i++){
            let place = this.cloneObject(obj[i]);
            place['distance'] = distArray[i]/1609.34;
            uniform[i] = await venues.makeUniformVenue(place);
             console.log(uniform[i].distance);
       }

        if(uniform !== null){
        return uniform;
        }
    }




}
export default MasterAPI;