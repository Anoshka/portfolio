// postinstall.cjs
const path = require('path');
const { rimraf } = require('rimraf');
const { globSync } = require('glob');

const patterns = ['./node_modules/**/.babelrc', './node_modules/**/.npmrc'];

async function cleanup() {
  try {
    const files = patterns.flatMap((pattern) => globSync(pattern));

    if (files.length > 0) {
      for (const filePath of files) {
        try {
          await rimraf(filePath);
          console.log(`Successfully deleted ${filePath}`);
        } catch (err) {
          console.error(`Error deleting ${filePath}:`, err);
        }
      }
    } else {
      console.log('No files found to clean up.');
    }
  } catch (err) {
    console.error('Error during cleanup:', err);
  }
}

cleanup().catch(console.error);
