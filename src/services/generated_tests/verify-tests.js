import fs from 'fs';
import path from 'path';

const outputDir = path.join(
  process.cwd(),
  'src/services/generated_tests/output'
);

// Verify output directory exists
if (!fs.existsSync(outputDir)) {
  console.error('❌ Output directory does not exist!');
  process.exit(1);
}

// Get list of test files
const testFiles = fs.readdirSync(outputDir);

if (testFiles.length === 0) {
  console.error('❌ No test files found!');
  process.exit(1);
}

console.log('📝 Found test files:');
testFiles.forEach((file) => {
  const stats = fs.statSync(path.join(outputDir, file));
  console.log(`   ${file} (${stats.size} bytes)`);
});

console.log('\n✅ Verification complete!');
