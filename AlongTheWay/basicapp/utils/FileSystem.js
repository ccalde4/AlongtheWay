import * as RNFS from 'react-native-fs';
//import Files2 from './Files2';


export default class File {
constructor(){


var RNFS = require('react-native-fs');
}

// require the module


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

    fileWrite(path,content){
        var filepath = RNFS.DocumentDirectoryPath + path;
        return  RNFS.writeFile(filepath,content)




    }


}

