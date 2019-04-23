/*Parameters class sets the parameters for yelp and foursquare in their required terms and format*/
export default class Parameters{
	constructor(){
	this.params = {
	    latitude:'',
	    longitude: '',
	    searchTerm : '',
	    radius: 0,
	    limit: 0,
	}

}
/*sets the parameters of the object passed*/
	setParams(obj){
		this.params.latitude = obj.latitude;
		this.params.longitude = obj.longitude;
		this.params.searchTerm = obj.query;
		this.params.radius = obj.radius;
		this.params.limit = obj.limit;

		if(obj.categories){
		    console.log("set params categories:")
		    console.log(obj.categories[0]);
			this.params['categories'] = obj.categories;
		}

		}

    getLat(){
        return (this.latitude);
    }

    getLong(){
        return (this.longitude);
        }

    getSearchTerm(){
    return(this.searchTerm);
    }

    getRadius(){
    return(this.radius);
    }

    getLimit(){
    return(this.limit);
    }

    getCategories(){
    return(this.categories);
    }



   getYelpParams(){
        var yelpParams = {
            latitude: this.params.latitude,
            longitude: this.params.longitude,
            //term: (this.params.searchTerm).toLowerCase(),
            radius: this.params.radius,
            //categories: this.categories,
            limit: this.params.limit,

        }
        console.log(this.params.categories);
        if(this.params.categories){


            yelpParams['categories'] = this.getCategories();
        }
        if(this.params.searchTerm != ''){
        yelpParams['term'] = (this.params.searchTerm).toLowerCase();
        }
   return (yelpParams);
    }
//adds multiple categories to yelp search in the appropriate format
getCategories(){
    let x = '';

            for(let i = 0; i < this.params.categories.length; i++){

                if(i == 0 ){
                    x = "" + this.params.categories[0];
                }
                else
                    x += ","+this.params.categories[i];
                    console.log(x);
                    console.log(this.params.categories.length);
                if(i === this.params.categories.length-1){
                    return x;
                }
            }

    }
    getFoursquareParams(){
    var foursquareParams = {
        ll:this.params.latitude+','+this.params.longitude,
        radius: this.params.radius,
        query: this.params.searchTerm,
        limit: this.params.limit,
    }
    return (foursquareParams);
    }




}