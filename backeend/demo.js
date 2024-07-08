const fs = require('fs');
const path = require('path');

// Assuming __dirname is the current directory where this script resides
const dir = path.join(__dirname, 'unzipped');

console.log(dir); // Ensure the path is correct

try {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`Deleted folder and its contents: ${dir}`);
} catch (err) {
    console.error(`Error deleting folder: ${err}`);
}
