const https = require('https'); 
const fs = require('fs');
const path = require('path');
const decompress = require('decompress'); 
const downloadPath = path.join(__dirname, '../download.zip');
const unzipPath = path.join(__dirname, '../unzipped');

function breakUrl(url) {
    return url.split(/\/{1,2}/).filter(Boolean);
}

function mergeUrl(userName, projectName) {
    return `https://codeload.github.com/${userName}/${projectName}/zip/refs/heads/master`;
}
 
 async function clear() {
    const parentDir = await  path.resolve(__dirname, '..');
    const dir =  await  path.join(parentDir, 'unzipped'); 
    console.log("inside clear function "+dir); 
   try{
        const files =  await fs.readdirSync(dir);
        if (files.length === 0) {
            console.log('The folder is already empty.');
            return true ;
        }
        
        for (const file of files) {
            const filePath = await path.join(dir, file);
            await fs.rmSync(filePath, { recursive: true, force: true });
        }
       
 
        console.log(`Deleted contents of the folder: ${dir}`);
        return true ; 
    }catch(err){
        console.log("error"+ err) ; 
        return false ; 
    }
}



 



async function downloadZip(url) {
 async    function downloadingZip(url, dest) {
        return new Promise(async (resolve, reject) => {
            const file =  await    fs.createWriteStream(dest);

             https.get(url,async  (response) => {
                if (response.statusCode === 200) {
               await    response.pipe(file);
                    file.on('finish',async  () => {
                      await  file.close();
                                await   resolve(true);
                            await    unzip(dest) ; 
                    });
                } else {
                    reject(new Error(`Failed to download file: ${response.statusCode}`));
                }
            }).on('error', (err) => { 
                fs.unlink(dest, () => {
                    reject(new Error(`Failed to write file: ${err.message}`));
                });
            });
        });
    }
 
    await downloadingZip(url, downloadPath);
 
}

async function  unzip(dest){

  try{
             const file = await decompress(dest , unzipPath) ; 
             console.log("unzip the file") ;  
         }
         catch(error){
             console.log("error generated" + error) ; 
         }

}



//  clear();
module.exports = {
    breakUrl,
    mergeUrl,
    downloadZip,
    unzip , 
    clear
};
