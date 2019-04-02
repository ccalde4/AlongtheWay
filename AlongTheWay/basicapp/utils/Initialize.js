import files from './Files';
import File from './FileSystem';

const App = {
 start: async function(){
 let file = new File();
 let isNotFirst = await file.fileExists("MainFile");
  if(isNotFirst){

  //logic to read MainFile and set files variables from it;
    let x = await file.fileRead("MainFile");

    let y = await JSON.parse(x);

     Object.assign(files,y);

  return true;
  }
  else{
    file.createFile("MainFile","");
    return false;
  }

 }

}
export default App;