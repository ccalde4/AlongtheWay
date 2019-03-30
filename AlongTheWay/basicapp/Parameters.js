
	//var latitude;
	//var longitude;
	//var searchTerm;
	//var radius;
	//var limit;
	//var categories;

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
	setParams(obj){
		this.params.latitude = obj.latitude;
		this.params.longitude = obj.longitude;
		this.params.searchTerm = obj.query;
		this.params.radius = obj.radius;
		this.params.limit = obj.limit;

		if(obj.categories){
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
            term: (this.params.searchTerm).toLowerCase(),
            radius: this.params.radius,
            //categories: this.categories,
            limit: this.params.limit,

        }
        if(this.categories){
            yelpParams['categories'] = this.params.categories;
        }
   return (yelpParams);
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