const express = require('express');
const router = express.Router();
const { breakUrl, mergeUrl, downloadZip, unzip , clear } = require('../functions/functions'); // Corrected import
const { fileTypeCounter , fileExtensions , lineCounts } = require('../count');
router.post('/url', async (req, res) => {
    const url = req.body.url;
    console.log(url);

    const urlArray = breakUrl(url);
    const userName = urlArray[2];
    const projectName = urlArray[3];
    const updatedUrl = mergeUrl(userName, projectName);
    console.log(updatedUrl);

    try {
        // Clear existing files
        if (await clear()) {
            console.log('Cleared existing files.');

            // Download and unzip new files
            await downloadZip(updatedUrl);
            console.log("Download successful. Starting analysis.");

            // Perform operations on unzipped files
            const result = await fileTypeCounter("unzipped");
            console.log("File type counter result:", result);

            // Log fileExtensions and lineCounts
            console.log("File extensions:", fileExtensions);
            console.log("Line counts:", lineCounts);

            // Return response with data
            res.json({
                receivedUrl: url,
                result,
                fileExtensions,
                lineCounts
            });
        } else {
            throw new Error('Failed to clear existing files.');
        }
    } catch (error) {
        console.error('Error in processing:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




module.exports = router;
