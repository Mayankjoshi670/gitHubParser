const fs = require("fs");
const path = require("path");


const folderList = []
function recursion(folderPaths) {
    
    folderPaths.forEach(folderPath => {
        const result = fs.readdirSync(folderPath);
        const folders = result.filter(res => fs.lstatSync(path.resolve(folderPath, res)).isDirectory());
        const fullPathFolders = folders.map(folder => path.resolve(folderPath, folder));
        if (folderPaths.length === 0) {
            return;
        }
        // console.log(fullPathFolders);
        fullPathFolders.forEach(folderPath => folderList.push(folderPath));
        recursion(fullPathFolders);
    });
}
recursion([path.resolve(__dirname, "unzipFile")]);
console.log(folderList)
