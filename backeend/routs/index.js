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
  
            await downloadZip(updatedUrl);
            console.log("Download successful. Starting analysis.");
  
 await  findResult()  ;  
          await   clear()

            res.json({
                receivedUrl: url,
               
                fileExtensions,
                lineCounts
            });
        
   
});

 

module.exports = router;
