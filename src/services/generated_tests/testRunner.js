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
  const apiKey = process.env.HUGGING_FACE_API_KEY;
  if (!apiKey) {
    console.error(
      'HUGGING_FACE_API_KEY is not set. Please make sure the GitHub secret is defined.'
    );
    process.exit(1);
  }

  const generator = new TestGenerator(apiKey);

  const componentFiles = glob.sync('src/components/**/*.jsx');
  const pageFiles = glob.sync('src/pages/**/*.jsx');

  console.log('Component files:', componentFiles);
  console.log('Page files:', pageFiles);

  for (const file of [...componentFiles, ...pageFiles]) {
    console.log(`Generating test for ${file}...`);
    await generator.generateTest(file);
  }
}

main().catch(console.error);

export default TestRunner;
