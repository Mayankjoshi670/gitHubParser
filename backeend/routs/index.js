const express = require('express');
const router = express.Router();
const { breakUrl, mergeUrl, downloadZip, unzip } = require('../functions/functions'); // Corrected import

router.post('/url', async (req, res) => {  // Ensure async usage here
    const url = req.body.url;
    console.log(url);

    const urlArray = breakUrl(url);
    
    const userName = urlArray[2];
    const projectName = urlArray[3];
    const updatedUrl = mergeUrl(userName, projectName);

    console.log(updatedUrl);

    try {
        await downloadZip(updatedUrl); // Await downloadZip because it's async
        console.log("Download successful");
        // await unzip(downloadPath); // Ensure you pass the correct downloadPath if needed
        console.log("Unzip successful");
    } catch (error) {
        console.error("Download or unzip failed:", error);
    }

    res.json({
        receivedUrl: url
    });
});

module.exports = router;
