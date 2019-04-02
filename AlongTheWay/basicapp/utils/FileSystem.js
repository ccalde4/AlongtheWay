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
      // console.log('FILE WRITTEN!');
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
       return RNFS.exists(filepath);
     }

    fileRead(path){
        var filepath = RNFS.DocumentDirectoryPath + path;
        console.log('Read File');
        return RNFS.readFile(filepath,'utf8');
    }

    fileWrite(path,content){
        var filepath = RNFS.DocumentDirectoryPath + path;
        RNFS.writeFile(filepath,content)
            .then((success) => {
            //   console.log('FILE WRITTEN!');
            })
            .catch((err) => {
            console.log(err.message);
            });



    }


}

