import * as RNFS from 'react-native-fs';
//import Files2 from './Files2';


export default class File {
constructor(){


var RNFS = require('react-native-fs');
}

// require the module

//creates a file in default Android path using file name, and a string as its content
  createFile(file, content){
    var path = RNFS.DocumentDirectoryPath + file;
   return RNFS.writeFile(path, content, 'utf8')


  }

  deleteFile (file){

    var path = RNFS.DocumentDirectoryPath + file;

    return RNFS.unlink(path);

  }


    fileExists(path){
       var filepath = RNFS.DocumentDirectoryPath + path;
       return RNFS.exists(filepath);
     }

    fileRead(path){
        var filepath = RNFS.DocumentDirectoryPath + path;

        return RNFS.readFile(filepath,'utf8');
    }

    //Used to either overwrite or append to a currently existing file
    fileWrite(path,content){
        var filepath = RNFS.DocumentDirectoryPath + path;
        return  RNFS.writeFile(filepath,content)




    }


}

