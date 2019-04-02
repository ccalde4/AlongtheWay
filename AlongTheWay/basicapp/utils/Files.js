
//ONLY write to files from ComponentWillUnMount
//ONLY read from files in ComponentDidMount or ComponentWillUnMount

const files = {
    radius     :     100,
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


