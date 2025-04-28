const path = require('path');
const rimraf = require('rimraf');
const glob = require('glob'); // Use the synchronous version of glob

const babelrcPattern = path.join('node_modules', '**', '.babelrc');

// Use the synchronous glob to find .babelrc files
const files = glob.sync(babelrcPattern);

if (files.length > 0) {
  files.forEach((filePath) => {
    rimraf(filePath, (deleteErr) => {
      if (deleteErr) {
        console.error(`Error deleting file: ${filePath}`, deleteErr);
      } else {
        console.log(`Successfully deleted: ${filePath}`);
      }
    });
  });
} else {
  console.log('No .babelrc files found in node_modules.');
}
