
  var calculated;
 export default class DistanceCalc {

    constructor(){
       calculated = [];

    }
      //function for getting an array of lat longs that are the required distance apart from an arrray of lat,longs
     getParsedDist(arr){
       // y is the hardcoded desired distance between each lat long
      let y = 11/2 +11;
      console.log(y);
       let k = 0;
         for(let i =0;i<arr.length;i++){
             for(let j = i+1;j<arr.length-1;j++){
             let x = this.getSpaced(arr[i].latitude,arr[i].longitude,arr[j].latitude,arr[j].longitude);
                if(x<y){
                  continue;

                }
                else{
                   calculated[k] = arr[j];
                    k++
                    i = j;
                    break;
                }


             }



         }



        return calculated;

     }
          //distance between formula for lat long
        getSpaced(lat1,long1,lat2,long2){


         var R = 3958.8; // Radius of the earth in miles
         var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
         var dLon = this.deg2rad(long2-long1);
         var a =
             Math.sin(dLat/2) * Math.sin(dLat/2) +
             Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
             Math.sin(dLon/2) * Math.sin(dLon/2)
                                                   ;
         var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
         var d = R * c; // Distance in miles
         return d;


        }


     deg2rad(deg) {
       return deg * (Math.PI/180)
     }


  }