
export default class Venues{

    constructor(){
        this.venue ={
                      id : '',
                      name :'',
                      location = {
                               address1 : '',
                               address2 : '',
                               address3 : '',
                               city : '',
                               zip : '',
                               country : '',
                               state : '',
                               displayAddress : '',
                               }
                      rating : '',
                      phone : '',
                      lat : '',
                      long : '',
                      displayPhone : '',

                      categories : [],
                      reviews : '',
                      from : '',

    }

    makeUniformVenue(obj,from){

        if(from == yelp){
            console.log("this is a yelp object");
            return this.makeUniformYelp(obj);
        }
        else if(from == foursquare){
            console.log("this is a foursquare object");
            return this.makeUniformFoursquare(obj);
        }
        else{
        return new Error("invalid input");
        }
    }

    makeUniformYelp(obj){
    this.venue= {
                        id: obj.businesses.id;
                        name : obj.businesses.name,
                        address1 : obj.businesses.address1,
                       address2 : obj.businesses.address2,
                       address3 : obj.businesses.address3,
                       city : obj.businesses.location.city,
                       zip : obj.businesses.location.zip_code,
                       country : obj.businesses.location.country,
                       state : obj.businesses.location.state,
                       rating : obj.businesses.rating,
                       phone : obj.phone,
                       lat : obj.coordinates.latitude,
                       long : obj.coordinates.longitude,
                       displayPhone : obj.display_phone,
                       displayAddress : obj.location.display_address,
                       categories : obj.categories,
                       //reviews = ,
                       from : yelp,
                       }



    }


    }






}
