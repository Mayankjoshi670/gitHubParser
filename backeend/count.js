const fs = require("fs");
const path = require("path");

const fileExtensions = new Set();
const lineCounts = {};
 
function countLines(filePath) {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const lines = fileContent.split("\n").length;
    console.log("  not able to print")
    return lines;
}
 
function recursion(folderPaths) {
    if (folderPaths.length === 0) {
        return;
    }

    folderPaths.forEach(folderPath => {
        const result = fs.readdirSync(folderPath);
        const folders = result.filter(res => fs.lstatSync(path.resolve(folderPath, res)).isDirectory());
        const files = result.filter(res => !fs.lstatSync(path.resolve(folderPath, res)).isDirectory());

        // Process files
        files.forEach(file => {
            const filePath = path.resolve(folderPath, file);
            const ext = path.extname(file);
            if (ext) {
                fileExtensions.add(ext);
 
                if (!lineCounts[ext]) {
                    lineCounts[ext] = 0;
                }
                console.log("  inside file "); 
                lineCounts[ext] += countLines(filePath);
            }
        });

        const fullPathFolders = folders.map(folder => path.resolve(folderPath, folder));
     
        recursion(fullPathFolders);
    });
}
 
function fileTypeCounter(folderPath) {
    const fileTypes = {};

    function readDirectory(dir) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        entries.forEach(entry => {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                readDirectory(fullPath); // Recursive call for directories
            } else {
                const ext = path.extname(fullPath).toLowerCase();
                fileTypes[ext] = (fileTypes[ext] || 0) + 1;  
            }
        });
    }

    readDirectory(folderPath); 
    console.log('File types in unzipped folder:', fileTypes);
    console.log('Line counts:', lineCounts);
    console.log(fileExtensions);
    return fileTypes 
}

function findResult() {
  recursion([path.resolve(__dirname, "unzipped")]);
}

 


module.exports = {
    fileTypeCounter,
    fileExtensions,
    lineCounts,
    recursion , findResult 
};


 
