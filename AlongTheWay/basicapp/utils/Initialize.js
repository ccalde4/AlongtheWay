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
  let x = JSON.stringify(files);
    await file.createFile("MainFile",x);
    let z = await file.fileRead("MainFile");

        let y = await JSON.parse(z);

         Object.assign(files,y);
   return true;
  }

 }

}
export default App;