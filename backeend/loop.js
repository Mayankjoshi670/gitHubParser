const fs = require("fs");
const path = require("path");

function recursion(folderPaths) {
    if (folderPaths.length === 0) {
        return;
    }

    folderPaths.forEach(folderPath => {
        const result = fs.readdirSync(folderPath);
        const folders = result.filter(res => fs.lstatSync(path.resolve(folderPath, res)).isDirectory());
        
        const fullPathFolders = folders.map(folder => path.resolve(folderPath, folder));
        console.log(fullPathFolders);

        recursion(fullPathFolders);
    });
}
 
recursion([path.resolve(__dirname, "unzipFile")]);
