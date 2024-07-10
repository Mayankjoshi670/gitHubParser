const https = require('https'); 
const fs = require('fs');
const path = require('path');
const decompress = require('decompress');
const {fileTypeCounter} = require('../count');
const downloadPath = path.join(__dirname, '../download.zip');
const unzipPath = path.join(__dirname, '../unzipped');

function breakUrl(url) {
    return url.split(/\/{1,2}/).filter(Boolean);
}

function mergeUrl(userName, projectName) {
    return `https://codeload.github.com/${userName}/${projectName}/zip/refs/heads/master`;
}

 

 
function clear() {
    const parentDir = path.resolve(__dirname, '..');
    const dir = path.join(parentDir, 'unzipped');
   
    console.log(dir);

   try{
        const files = fs.readdirSync(dir);
        if (files.length === 0) {
            console.log('The folder is already empty.');
            return true ;
        }
        
        for (const file of files) {
            const filePath = path.join(dir, file);
            fs.rmSync(filePath, { recursive: true, force: true });
        }
       
 
        console.log(`Deleted contents of the folder: ${dir}`);
        return true ; 
    }catch(err){
        console.log("error"+ err) ; 
        return false ; 
    }
}



 



async function downloadZip(url) {
    function downloadingZip(url, dest) {
        return new Promise((resolve, reject) => {
            const file = fs.createWriteStream(dest);

            https.get(url, (response) => {
                if (response.statusCode === 200) {
                    response.pipe(file);
                    file.on('finish', () => {
                        file.close();
                        resolve(true);
                          unzip(dest) ; 
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
