

var dist;
var points;
var i;
export default class RouteRadius { //not implemented yet ;(

constructor{
    this.points = {
    ll1: '',
    ll2: '',};
    this.pointsArr= [],
    i = 0;
    dist = 0;
}

//var points = ["51.38254, -2.362804", "51.235249, -2.297804", "51.086126, -2.210767", "51.084519, -2.262813", "51.175994, -2.159207", "51.132978, -2.213939"]


dummyFunction(){
for(let i = 0; i< points.length; i++){
    this.points = {
        ll1: points[i];
        ll2: points[i+1];
    }
    this.pointsArr[i] = this.points;
    }

}


while(i < points.length-1){
    if(dist == radius){
        return
    }

    dist = distance(points[i][0],points[i][1],points[i+2][0], points[i+2][1]);
}

    distance(lat1, lon1, lat2, lon2, M) { // M = unit in miles
         	    if ((lat1 == lat2) && (lon1 == lon2)) {
         		    return 0;
         	    }
	    else {
		    var radlat1 = Math.PI * lat1/180;
		    var radlat2 = Math.PI * lat2/180;
		    var theta = lon1-lon2;
		    var radtheta = Math.PI * theta/180;
		    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		    if (dist > 1) {
			    dist = 1;
		    }
		    dist = Math.acos(dist);
		    dist = dist * 180/Math.PI;
		    dist = dist * 60 * 1.1515;
		    //if (unit=="K") { dist = dist * 1.609344 }
		    //if (unit=="N") { dist = dist * 0.8684 }
		    return dist;
	       }
        }

}