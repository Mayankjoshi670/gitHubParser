const express = require('express');
const router = express.Router();

router.post('/url', (req, res) => {  
    const url = req.body;
    console.log(url);
    res.json({
        message: "inside router",
        receivedUrl: url
    });
});

module.exports = router;
