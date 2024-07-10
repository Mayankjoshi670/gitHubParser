 const fs = require("fs");
const path = require("path");

const folderList = [];
const fileExtensions = new Set();

function recursion(folderPaths) {
    if (folderPaths.length === 0) {
        return;
    }

    folderPaths.forEach(folderPath => {
        const result = fs.readdirSync(folderPath);
        const folders = result.filter(res => fs.lstatSync(path.resolve(folderPath, res)).isDirectory());
        const files = result.filter(res => !fs.lstatSync(path.resolve(folderPath, res)).isDirectory());

        // Add file extensions to the set
        files.forEach(file => {
            const ext = path.extname(file);
            if (ext) {
                fileExtensions.add(ext);
            }
        });

        const fullPathFolders = folders.map(folder => path.resolve(folderPath, folder));
        
        // Collect folder paths for logging
        fullPathFolders.forEach(folderPath => folderList.push(folderPath));

        // Recursive call for subdirectories
        recursion(fullPathFolders);
    });
}

// Start the recursion from the "unzipFile" directory
recursion([path.resolve(__dirname, "unzipped")]);

console.log("Folders:", folderList);
console.log("File Extensions:", [...fileExtensions]);

