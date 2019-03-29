import * as RNFS from 'react-native-fs';

export default class File {
constructor(){
var RNFS = require('react-native-fs');
}

// require the module


  createFile(file, content){
    var path = RNFS.DocumentDirectoryPath + file;
    RNFS.writeFile(path, content, 'utf8')
     .then((success) => {
       console.warn('FILE WRITTEN!');
      })
     .catch((err) => {
       console.log(err.message);
     });

  }

  deleteFile (file){

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

    fileExists(path){
        var filepath = RNFS.DocumentDirectoryPath + path;
        return RNFS.exists(filepath)
    }

    fileRead(path){
        var filepath = RNFS.DocumentDirectoryPath + path;
        let s = readFile(filepath,utf8);
        console.warn('Read File')
        return s;
    }

    fileWrite(path,content){
        var filepath = RNFS.DocumentDirectoryPath + path;
        RNFS.writeFile(filepath,content);
        console.warn('Wrote File');


    }


}

