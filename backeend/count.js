const fs = require("fs") ;
const path = require("path");
const {clear } = require("./functions/functions")
const fileExtensions = new Set();
const lineCounts = {};

function countLines(filePath) {
    try {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const lines = fileContent.split("\n").length;
        return lines;
    } catch (err) {
        console.error("Error reading file:", err);
        return 0; // or handle the error appropriately
    }
}

 async function recursion(folderPaths) {
    for (const folderPath of folderPaths) {
        try {
            const result = fs.readdirSync(folderPath);
            const fullPaths = result.map(file => path.resolve(folderPath, file));

            for (const fullPath of fullPaths) {
                const stats = fs.lstatSync(fullPath);

                if (stats.isDirectory()) {
                    // Recursively process subfolders
                    recursion([fullPath]);
                } else if (stats.isFile()) {
                    // Process files
                    const ext = path.extname(fullPath);
                    if (ext) {
                        fileExtensions.add(ext);

                        if (!lineCounts[ext]) {
                            lineCounts[ext] = 0;
                        }
                        lineCounts[ext] += countLines(fullPath);
                    }
                }
            }
        } catch (err) {
            console.error("Error in recursion:", err);
        }
    } 
}

const fileTypes = {};

function fileTypeCounter(folderPath) {
    try {
        function readDirectorySync(dir) {
            const entries = fs.readdirSync(dir, { withFileTypes: true });
            for (const entry of entries) {
                const fullPath = path.join(dir, entry.name);
                if (entry.isDirectory()) {
                    readDirectorySync(fullPath); // Recursive call for directories
                } else {
                    const ext = path.extname(fullPath).toLowerCase();
                    fileTypes[ext] = (fileTypes[ext] || 0) + 1;
                }
            }
        }
        
        readDirectorySync(folderPath);
        return fileTypes;
    } catch (err) {
        console.error("Error in fileTypeCounter:", err);
        throw err; // Rethrow the error or handle it appropriately
    }
}


async function findResult() {
    try {
        await recursion([path.resolve(__dirname, "unzipped")]);
        await fileTypeCounter(__dirname);
        await clear() 
        console.log("File types:", fileTypes);
        console.log("Line counts:", lineCounts);
    } catch (err) {
        console.error("Error in findResult:", err);
    }
}
 
module.exports = {
    lineCounts,
    findResult,
    fileTypes
};
