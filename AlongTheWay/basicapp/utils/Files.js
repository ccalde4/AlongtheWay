
//ONLY write to files from ComponentWillUnMount
//ONLY read from files in ComponentDidMount or ComponentWillUnMount
//ADD anything you want to be saved to memory and reloaded from memory ONLY HERE appending to this when running
//    is NOT ALLOWED!!
const files = {
    radius     :     1000,
    index      :     0,
    mapsType   :    'standard',
    lat        :     null,
    long       :     null,
    categories :   {
         cat1:    false,
         cat2:    false,
         cat3:    false,
         cat4:    false,

    }



}

export default files;


