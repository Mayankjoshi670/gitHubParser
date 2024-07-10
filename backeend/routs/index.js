const express = require('express');
const router = express.Router();
const path = require('path');
const { breakUrl, mergeUrl, downloadZip, unzip , clear } = require('../functions/functions'); // Corrected import
const { fileTypeCounter , fileExtensions , lineCounts , recursion  , findResult} = require('../count');
router.post('/url', async (req, res) => {
    const url = req.body.url;
    console.log(url);

    const urlArray = breakUrl(url);
    const userName = urlArray[2];
    const projectName = urlArray[3];
    const updatedUrl = mergeUrl(userName, projectName);
    console.log(updatedUrl);

    
         

            // Download and unzip new files
            await downloadZip(updatedUrl);
            console.log("Download successful. Starting analysis.");

            // Perform operations on unzipped files
            
// recursion([path.resolve("../"+__dirname, "unzipped")]);
 await  findResult()  ; 
            // const result = await fileTypeCounter("unzipped");
            // console.log("File type counter result:", result);

            // Log fileExtensions and lineCounts
            // console.log("File extensions:", fileExtensions);
            // console.log("Line counts:", lineCounts);

            // Return response with data
          await   clear()

            res.json({
                receivedUrl: url,
                // result,
                fileExtensions,
                lineCounts
            });
        
   
});




module.exports = router;
