const http = require('http');
const experss = require('express') ; 
const fs = require('fs') ; 
const path = require('path'); 
const decompress = require('decompress');


function breakUrl(url){
    return url.split(/\/{1,2}/).filter(Boolean); 
 }
 

 function mergeUrl(userName , projectName){
    return `https://codeload.github.com/${userName}/${projectName}/zip/refs/heads/master` ; 
 }


 async function dawnloadZip(url){
 const dawnloadPath = path.join(__dirname,'../dawnload.zip');
    function dawnloadingZip(url , dest){
        return new Promise((resolve, reject) => {
            const file = fs.createWriteStream(dest);
        
            https.get(url, (response) => {
              if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                  file.close();
                  resolve(true);
                });
              } else {
                reject(new Error(`Failed to download file: ${response.statusCode}`));
              }
            }).on('error', (err) => {
              // Delete the file in case of an error
              fs.unlink(dest, () => {
                reject(new Error(`Failed to write file: ${err.message}`));
              });
            });
          });

 }
}
 module.exports = {
    breakUrl,
    mergeUrl,
    dawnloadZip
 }