
export default class Venues{

    constructor(){
       this.places ={
               id : '',
               name :'',
               location:  {
                        lat : '',
                        long : '',
                        address1 : '',
                        address2 : '',
                        address3 : '',
                        city : '',
                        zip : '',
                        country : '',
                        state : '',
                        displayAddress : '',
                        },
               rating : '',
               contact:{
                    displayPhone : '',
                    phone : '',
                    },
              categories : [],
               reviews : '',
               from : '',


       }

    }

    makeUniformVenue(obj){

        if(obj.places.from === 'yelp'){
            //console.log("this is a yelp object");
            return this.makeUniformYelp(obj);
        }
        else if(obj.places.from === 'foursquare'){
            //console.log("this is a foursquare object");
            return this.makeUniformFoursquare(obj);
        }
        else{
        console.log(obj);
        return new Error("invalid input");
        }
    }

    makeUniformYelp(obj){
    this.places= {
                        id: obj.id,
                        name : obj.name,
                        location : {
                                lat : obj.coordinates.latitude,
                                long : obj.coordinates.longitude,
                                address1 : obj.location.address1,
                                address2 : obj.location.address2,
                                address3 : obj.location.address3,
                                city : obj.location.city,
                                zip : obj.location.zip_code,
                                country : obj.location.country,
                                state : obj.location.state,
                                displayAddress : obj.location.display_address,
                                },

                       contact :{
                                phone : obj.phone,
                                displayPhone : obj.display_phone,
                         },
                         rating : obj.rating,
                       categories : obj.categories,
                       //reviews = ,
                       from : 'yelp',
                       }

    return this.places;

    }
    makeUniformFoursquare(obj){
        this.places= {
                            id: obj.response.venue.id,
                            name : obj.response.venue.name,
                            location: {
                                    lat : obj.response.venue.location.lat,
                                    long : obj.response.venue.coordinates.location.long,
                                    address1 : obj.response.venue.location.address,
                                    address2 : null,
                                    address3 : null,
                                    city : obj.response.venue.location.city,
                                    zip : obj.response.venue.location.postalCode,
                                    country : obj.response.venue.location.country,
                                    state : obj.response.venue.location.state,
                                    displayAddress : obj.response.venue.location.formattedAddress,
                                    },
                            contact : {
                             phone : obj.response.venue.contact.phone,
                             displayPhone : obj.formattedPhone,
                            },
                           rating : obj.response.venue.rating,
                           categories : obj.categories,
                           //reviews = ,
                           from : 'foursquare',
                           }

        return this.places;

        }



    }







