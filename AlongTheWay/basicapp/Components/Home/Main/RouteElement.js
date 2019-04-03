export default class RouteElement extends SearchBar {

constructor(props){
    super(props);

    this.state = {}

    this.destination = {
    id: null;
    lat: null,
    long: null,
    }
}

setDestination(id,arr){
this.destination.id = id;
this.destination.lat = arr[0];
this.destination.long = arr[1];

return this.destination;
}






}