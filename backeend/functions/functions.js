const https = require('https');
const express = require('express');
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
                // Delete the file in case of an error
                fs.unlink(dest, () => {
                    reject(new Error(`Failed to write file: ${err.message}`));
                });
            });
        });
    }

    // Wait for the download to complete
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

module.exports = {
    breakUrl,
    mergeUrl,
    downloadZip,
    unzip
};
