const express = require('express');
const router = express.Router();
 const {breakUrl} = require('../functions/functions')
 const {mergeUrl} = require('../functions/functions')
 
router.post('/url', (req, res) => {  
    const url = req.body.url;
    console.log(url);

    const urlArray = breakUrl(url) ;
    
    const userName = urlArray[2]  ; 
    const projectName = urlArray[3] ; 
    const updatedUrl = mergeUrl(userName ,projectName) ;  

    console.log(updatedUrl);

//    const flag = dawnloadZip(updatedUrl) ; 
//     if(flag){
//         console.log("Download successful") ;
//         unzip() ; 
//     }
//     else{
//         console.log("dawnload failed") ; 
//     }

    res.json({
        receivedUrl: url
    });
});

module.exports = router;
