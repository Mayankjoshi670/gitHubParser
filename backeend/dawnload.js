const https = require('https');
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const decompress = require("decompress") ; 

// URL of the ZIP file to download
const fileUrl = 'https://codeload.github.com/Mayankjoshi670/E-commerce/zip/refs/heads/master';
// const fileUrl = 'https://codeload.github.com/Mayankjoshi670/casino/zip/refs/heads/master';
// Destination path for the downloaded file
const downloadPath = path.join(__dirname, 'master.zip');

// Function to download the file
function downloadFile(url, dest) {
  const file = fs.createWriteStream(dest);

  https.get(url, (response) => {
    if (response.statusCode === 200) {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log('Download completed!');

        // Once downloaded, inspect the ZIP file contents
        // inspectZipFile(dest);

        // unzip the file and save it 
        unzip(dest)  ; 
        // (async ()=>{
        //     try{
        //         const file = await decompress("master.zip" , "dist",) ; 
        //         console.log("unzip the file") ; 
        //     }
        //     catch(error){
        //         console.log("error generated" + error) ; 
        //     }
        // })
      });
    } else {
      console.error(`Failed to download file: ${response.statusCode}`);
    }
  }).on('error', (err) => {
    fs.unlink(dest, () => {
      console.error(`Failed to write file: ${err.message}`);
    });
  });
}

 async function  unzip(dest){

     try{
                const file = await decompress(dest , "unzipFile",) ; 
                console.log("unzip the file") ; 
            }
            catch(error){
                console.log("error generated" + error) ; 
            }

}



// Function to inspect the contents of a ZIP file
function inspectZipFile(zipFilePath) {
  try {
    const zip = new AdmZip(zipFilePath);
    const zipEntries = zip.getEntries();

    // Initialize an object to store file types and counts
    const fileTypes = {};

    // Function to recursively traverse ZIP entries
    function traverseZipEntries(entries) {
      entries.forEach((entry) => {
        if (entry.isDirectory) {
          // If entry is a directory, recursively traverse its entries
          traverseDirectory(entry.entryName);
        } else {
          // If entry is a file, get its extension
          const ext = path.extname(entry.entryName).toLowerCase();

          // Count file types
          if (fileTypes[ext]) {
            fileTypes[ext]++;
          } else {
            fileTypes[ext] = 1;
          }
        }
      });
    }

    // Function to recursively traverse directories
    function traverseDirectory(directoryPath) {
      const directoryEntries = zip.getEntries(directoryPath + '/');
      traverseZipEntries(directoryEntries);
    }

    // Start traversing ZIP entries from the root
    traverseZipEntries(zipEntries);

    // Log the file types and their counts
    console.log('File types in ZIP file:', fileTypes);
  } catch (err) {
    console.error(`Error inspecting ZIP file: ${err.message}`);
  }
}

// Start the download
downloadFile(fileUrl, downloadPath);
