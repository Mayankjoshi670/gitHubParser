const fs = require("fs");
const path = require("path");

const fileExtensions = new Set();
const lineCounts = {};

// Helper function to count lines in a file
function countLines(filePath) {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const lines = fileContent.split("\n").length;
    console.log("  not able to print")
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
                console.log("  inside file ");
                // Count lines in the file and add to the count for this extension
                lineCounts[ext] += countLines(filePath);
            }
        });

        const fullPathFolders = folders.map(folder => path.resolve(folderPath, folder));
        
        // Collect folder paths for logging
        

        // Recursive call for subdirectories
        recursion(fullPathFolders);
    });
}

// Start the recursion from the "unzipped" directory
// recursion([path.resolve(__dirname, "unzipped")]);

// Function to count file types in a directory
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
                fileTypes[ext] = (fileTypes[ext] || 0) + 1; // Counting file types
            }
        });
    }

    readDirectory(folderPath); // Start reading from the specified folder
    console.log('File types in unzipped folder:', fileTypes);
    console.log('Line counts:', lineCounts);
    console.log(fileExtensions);
    return fileTypes 
}

function findResult() {
  recursion([path.resolve(__dirname, "unzipped")]);
}

//   fileTypeCounter("unzipped");


module.exports = {
    fileTypeCounter,
    fileExtensions,
    lineCounts,
    recursion , findResult 
};


 
