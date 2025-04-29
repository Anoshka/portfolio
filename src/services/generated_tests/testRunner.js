import fs from 'fs';
import path from 'path';
import TestGenerator from './testGenerator.js';
import { glob } from 'glob';
import jest from 'jest';

const DEBUG = process.env.DEBUG === 'true';

function debug(...args) {
  if (DEBUG) {
    console.log('[DEBUG]', ...args);
  }
}

class TestRunner {
  constructor(apiKey) {
    this.generator = new TestGenerator(apiKey);
    this.testOutputDir = path.join(
      process.cwd(),
      'src/services/generated_tests/output'
    );
  }

  async generateComponentTest(componentPath) {
    const componentName = path.basename(componentPath, '.jsx');
    const testCode = await this.generator.generateTest(componentPath);
    if (testCode) {
      const testPath = path.join(
        this.testOutputDir,
        `${componentName}.test.jsx`
      );
      console.log(`Test will be saved at: ${testPath}`);
      fs.writeFileSync(testPath, testCode);
    }
  }

  async runComponentTests(componentPath) {
    const componentName = path.basename(componentPath, '.jsx');

    const testCode = await this.generator.generateTest(componentPath);

    const testPath = path.join(this.testOutputDir, `${componentName}.test.jsx`);
    console.log(`Test will be saved at: ${testPath}`);
    fs.writeFileSync(testPath, testCode);

    await this.runTest(componentName);
  }

  async runTest(componentName) {
    const testPath = path.join(this.testOutputDir, `${componentName}.test.jsx`);
    const result = await jest.runCLI(
      {
        config: {
          testMatch: [testPath], // Ensure the correct path is passed here
        },
      },
      [process.cwd()] // Ensure Jest runs in the correct directory
    );
    console.log(result);
  }

  async runRouteTests(routes) {
    const testCode = await this.generator.generateRouteTest(routes);
    const testPath = path.join(this.testOutputDir, 'routes.test.jsx');
    console.log(`Test will be saved at: ${testPath}`);
    fs.writeFileSync(testPath, testCode);
  }
}

async function main() {
  console.log('🚀 Starting test generation...');

  const apiKey = process.env.HUGGING_FACE_API_KEY;
  if (!apiKey) {
    console.error('❌ HUGGING_FACE_API_KEY is not set');
    process.exit(1);
  }

  const runner = new TestGenerator();

  // Clean output directory
  const outputDir = path.join(
    process.cwd(),
    'src/services/generated_tests/output'
  );
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true });
  }
  fs.mkdirSync(outputDir, { recursive: true });

  const componentFiles = glob.sync('src/components/**/*.jsx');
  const pageFiles = glob.sync('src/pages/**/*.jsx');

  console.log('📁 Found components:', componentFiles);
  console.log('📁 Found pages:', pageFiles);

  for (const file of [...componentFiles, ...pageFiles]) {
    await runner.generateTest(file);
  }

  const results = runner.getResults();

  // Create a results file
  const resultsPath = path.join(outputDir, 'generation-results.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));

  console.log('\n📊 Test Generation Results:');
  console.log('---------------------------');
  console.log(`Total components processed: ${results.summary.total}`);
  console.log(`✅ Successfully generated: ${results.summary.successful}`);
  console.log(`❌ Failed to generate: ${results.summary.failed}`);
  console.log(`⏭️ Skipped: ${results.summary.skipped}`);

  if (results.details.failed.length > 0) {
    console.log('\n❌ Failed Components:');
    results.details.failed.forEach(({ component, error }) => {
      console.log(`- ${component}: ${error}`);
    });
  }

  // Exit with error if no tests were generated
  if (results.summary.successful === 0) {
    console.error('❌ No tests were generated successfully');
    process.exit(1);
  }

  console.log('\n✅ Test generation completed');
}

main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});

export default TestRunner;
