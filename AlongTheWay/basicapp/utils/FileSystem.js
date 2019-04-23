import * as RNFS from 'react-native-fs';

export default class File {
constructor(){
var RNFS = require('react-native-fs');
}



  //creates file in Android path using file name and string as content
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
    //delete file by passing name
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

   //checks if file exists
    fileExists(path){
       var filepath = RNFS.DocumentDirectoryPath + path;
       return RNFS.exists(filepath);
     }

    fileRead(path){
        var filepath = RNFS.DocumentDirectoryPath + path;
        console.log('Read File');
        return RNFS.readFile(filepath,'utf8');
    }
      //creates or appends to file
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

