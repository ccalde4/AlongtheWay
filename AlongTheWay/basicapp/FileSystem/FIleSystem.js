import * as RNFS from 'react-native-fs';

export default class File {


// require the module
var RNFS = require('react-native-fs');

  function createFile(file, content){
    var path = RNFS.DocumentDirectoryPath + file;
    RNFS.writeFile(path, content, 'utf8')
     .then((success) => {
       console.log('FILE WRITTEN!');
      })
     .catch((err) => {
       console.log(err.message);
     });

  }

  function deleteFile (file){

    var path = RNFS.DocumentDirectoryPath + file;

    return RNFS.unlink(path)
        .then(() => {
          console.log('FILE DELETED');
        })
        // `unlink` will throw an error, if the item to unlink does not exist
        .catch((err) => {
          console.log(err.message);
        });

  }

function fileExists(path){
    var filepath = RNFS.DocumentDirectoryPath + path;
    return RNFS.exists(filepath)
}
}

