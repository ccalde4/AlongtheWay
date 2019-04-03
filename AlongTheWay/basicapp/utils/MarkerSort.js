var topPlaces;
var unsorted;
var sortBy;
var byTop;
//markerSort is a one use class after sort is called a new instance should be created to sort another array;
export default class MarkerSort{
//sortBy can be radius or distance or any ratio data
//byTop is the the top(x) results based on sortBy
constructor(s,b){
    topPlaces = [];
    unsorted = [];
    sortBy = 'rating';
    byTop = 10;




}
    //**WARNING POTENTIAL PROBLEMS**\\
    //manipulating the array unsorted is derived from might possibly cause problems if unsorted is only pointing to the objects
    //of original array
    //consider cloning TopPlaces or sorted when return if this is the case
    //*note* this quicksort does not manipulate the original array; other possible side effects haven't been checked for yet
  sort(toSort){

       for(let i =0; i < toSort.length; i++){
                   unsorted[i] = toSort[i];
        }

       let sorted = this.quickSort(unsorted, 0, unsorted.length-1);
       this.setTopPlaces(sorted);
        return sorted;
  }




quickSort(unsorted, left, right){
    if(unsorted.length > 1){
        index = this.partition(unsorted, left, right); //index returned from partition
        if(left < index - 1){
            this.quickSort(unsorted, left, index -1); //recursion
        }
        if(index < right){
            this.quickSort(unsorted, index, right); //recursion
        }
    }

    return unsorted;
}

partition(unsorted, left, right){
    pivot = (unsorted[Math.floor((right + left) / 2)]).rating;
    while(left <= right){
        while(unsorted[left].rating < pivot){
            left++;
        }
        while(unsorted[right].rating  > pivot){
            right--;
        }
        if(left <= right ){
            this.swap(unsorted, left, right); //swapping two elements
            left++;
            right--;
        }
    }
    return left;
 }

swap(unsorted, leftIndex, rightIndex) {
    let temp = unsorted[leftIndex];
    unsorted[leftIndex] = unsorted[rightIndex];
    unsorted[rightIndex] = temp;
 }



    getTop(){
      return topPlaces;
    }

    setTopPlaces(sorted){
        let i = sorted.length-1;
        let j = 0;
        while(i>=0){

        if(topPlaces.length==byTop){
        break;
        }
        topPlaces[j] = sorted[i];
        j++;
        i--;
      }

    }

}


