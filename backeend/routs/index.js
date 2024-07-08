const express = require('express');
const router = express.Router();
const { breakUrl, mergeUrl, downloadZip, unzip , clear } = require('../functions/functions'); // Corrected import

router.post('/url', async (req, res) => {  // Ensure async usage here
    const url = req.body.url;
    console.log(url);

    const urlArray = breakUrl(url);
    
    const userName = urlArray[2];
    const projectName = urlArray[3];
    const updatedUrl = mergeUrl(userName, projectName);
    console.log(updatedUrl);

    await  clear() ; 
    
    setTimeout(() => {}, 1500);

    await downloadZip(updatedUrl);  
    console.log("Download successful");
    

    res.json({
        receivedUrl: url
    });
});

module.exports = router;
