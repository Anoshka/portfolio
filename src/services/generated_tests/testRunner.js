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
  debug('Starting test generation...');
  const apiKey = process.env.HUGGING_FACE_API_KEY;

  if (!apiKey) {
    console.error('HUGGING_FACE_API_KEY is not set');
    process.exit(1);
  }

  debug('API key found');

  // Ensure output directory exists and is empty
  if (fs.existsSync('src/services/generated_tests/output')) {
    fs.rmSync('src/services/generated_tests/output', { recursive: true });
  }
  fs.mkdirSync('src/services/generated_tests/output', { recursive: true });

  const runner = new TestRunner(apiKey);

  const componentFiles = glob.sync('src/components/**/*.jsx');
  const pageFiles = glob.sync('src/pages/**/*.jsx');

  debug('Found component files:', componentFiles);
  debug('Found page files:', pageFiles);

  for (const file of [...componentFiles, ...pageFiles]) {
    debug(`Generating test for ${file}...`);
    try {
      await runner.generateComponentTest(file);
      debug(`Successfully generated test for ${file}`);
    } catch (error) {
      console.error(`Error generating test for ${file}:`, error);
      process.exit(1);
    }
  }

  debug('Test generation completed');
}

main().catch(console.error);

export default TestRunner;
