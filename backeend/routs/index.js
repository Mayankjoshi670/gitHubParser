const express = require('express');
const router = express.Router();
const path = require('path');
const { breakUrl, mergeUrl, downloadZip , clear  } = require('../functions/functions'); // Corrected import
const {   
    lineCounts,
     findResult ,fileTypes} = require('../count');
router.post('/url', async (req, res) => {
    const url = req.body.url;
    console.log(url);

    const urlArray = breakUrl(url);
    const userName = urlArray[2];
    const projectName = urlArray[3];
    const updatedUrl = mergeUrl(userName, projectName);
    console.log(updatedUrl);
  
    // await   clear()
     
      
            
            await downloadZip(updatedUrl);
            console.log("Download successful. Starting analysis.");
            
            await  findResult()  ;  
            console.log("before clear .................")
            // await   clear()
         

            res.json({
                receivedUrl: url,
   lineCounts,
    fileTypes
            });
        
   
});

 

module.exports = router;
