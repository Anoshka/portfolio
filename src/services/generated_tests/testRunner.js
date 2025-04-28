import fs from 'fs';
import path from 'path';
import TestGenerator from './testGenerator.js';
import { glob } from 'glob';
import jest from 'jest';

class TestRunner {
  constructor(apiKey) {
    this.generator = new TestGenerator(apiKey); // Pass the API key here
    this.testOutputDir = path.join(
      process.cwd(),
      'src/services/generated_tests/output'
    );
  }

  async runComponentTests(componentPath) {
    // Read component code
    const componentCode = fs.readFileSync(componentPath, 'utf-8');
    const componentName = path.basename(componentPath, '.jsx');

    // Generate test
    const testCode = await this.generator.generateTest(componentPath);

    // Save test
    const testPath = path.join(this.testOutputDir, `${componentName}.test.jsx`);
    console.log(`Test will be saved at: ${testPath}`);
    fs.writeFileSync(testPath, testCode);

    // Run Jest on the generated test file
    await this.runTest(componentName);
  }

  async runTest(componentName) {
    const testPath = path.join(this.testOutputDir, `${componentName}.test.jsx`);
    // Run Jest using the generated test file
    const result = await jest.runCLI(
      {
        config: {
          testMatch: [testPath],
        },
      },
      [process.cwd()]
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
  const apiKey = process.env.OPENAI_API_KEY; // Fetch the API key from environment variables
  if (!apiKey) {
    console.error(
      'OPENAI_API_KEY is not set. Please make sure the GitHub secret is defined.'
    );
    process.exit(1);
  }

  const generator = new TestGenerator(apiKey); // Pass the API key here

  // Find all component files
  const componentFiles = glob.sync('src/components/**/*.jsx');
  const pageFiles = glob.sync('src/pages/**/*.jsx');

  console.log('Component files:', componentFiles);
  console.log('Page files:', pageFiles);

  // Generate tests for all components
  for (const file of [...componentFiles, ...pageFiles]) {
    console.log(`Generating test for ${file}...`);
    await generator.generateTest(file);
  }
}

main().catch(console.error);

export default TestRunner;
