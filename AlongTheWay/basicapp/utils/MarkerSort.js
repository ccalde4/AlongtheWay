import _ from "lodash";

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
    sortBy = s;
    byTop = b;



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

       let sorted = _.cloneDeep(this.quickSort(unsorted, 0, unsorted.length-1));
     //  this.setTopPlaces(sorted);
        return sorted;
  }



//sorting algorithm to sort unsorted array of places by their rating
quickSort(unsorted, left, right){


    if(left >= right)return;
     //pivot set to middle element in array and set to compare based upon rating
    let pivot = (unsorted[Math.floor((left + right) / 2)][sortBy]);
    let index = this.partition(unsorted, left, right, pivot);
    //recursively sorting elements before pivot
    this.quickSort(unsorted, left, index -1);
     //recursively sorting elements after pivot
    this.quickSort(unsorted, index, right);

    return unsorted;

}
//partitions elements into two sub-arrays(left and right of the pivot)
partition(unsorted, left, right, pivot){
    while(left <= right){
          //while value at left is less than pivot move left
        while(unsorted[left][sortBy] < pivot){
            left++;
        }
          //while value at right is greater than pivot move right
        while(unsorted[right][sortBy] > pivot){
            right--;
        }
        if(left <= right){
              //if sub-arrays do no match swap left and right
            [unsorted[left], unsorted[right]] = [unsorted[right], unsorted[left]];

            left++;
            right--;
        }
      }
      return left;
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


