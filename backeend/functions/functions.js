function breakUrl(url){
    return url.split(/\/{1,2}/).filter(Boolean); 
 }
 

 function mergeUrl(userName , projectName){
    return `https://codeload.github.com/${userName}/${projectName}/zip/refs/heads/master` ; 
 }
 module.exports = {
    breakUrl,
    mergeUrl
 }