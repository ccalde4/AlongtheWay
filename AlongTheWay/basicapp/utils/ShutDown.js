import files from './Files';
import File from './FileSystem';

const App = {
 end: async function(){
 let file = new File();
 let isNotFirst = await file.fileExists("MainFile");

  let x = files;
  //logic to make file object into string;
  let y = JSON.stringify(x);





   file.fileWrite("MainFile",y);

 }



}
export default App;