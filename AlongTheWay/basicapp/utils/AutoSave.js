import files from './Files';
import File from './FileSystem';

const Save = {
 save: async function(){
 let file = new File();
 let x = files;
 let y = JSON.stringify(x);
   file.fileWrite("MainFile",y);


 }



}
export default Save;