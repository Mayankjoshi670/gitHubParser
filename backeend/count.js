const fs = require("fs");
const path = require("path");

const folderList = [];
const fileExtensions = new Set();
const lineCounts = {};

// Helper function to count lines in a file
function countLines(filePath) {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const lines = fileContent.split("\n").length;
    return lines;
}

// Recursive function to traverse directories
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

                // Initialize line count for this extension if not already done
                if (!lineCounts[ext]) {
                    lineCounts[ext] = 0;
                }

                // Count lines in the file and add to the count for this extension
                lineCounts[ext] += countLines(filePath);
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
recursion([path.resolve(__dirname, "unzipFile")]);

console.log("Folders:", folderList);
console.log("File Extensions:", [...fileExtensions]);
console.log("Line Counts:", lineCounts);
