import fs from 'fs';
import path from 'path';
import TestGenerator from './testGenerator.js';
import { glob } from 'glob';

class TestRunner {
  constructor(apiKey) {
    this.generator = new TestGenerator(apiKey);
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
    const testCode = await this.generator.generateComponentTest(
      componentCode,
      componentName
    );

    // Save test
    const testPath = path.join(this.testOutputDir, `${componentName}.test.jsx`);
    console.log(`Test will be saved at: ${testPath}`);
    fs.writeFileSync(testPath, testCode);

    // Run test
    // need to add jest.runCLI() to run tests immediately
  }

  async runRouteTests(routes) {
    const testCode = await this.generator.generateRouteTest(routes);
    const testPath = path.join(this.testOutputDir, 'routes.test.jsx');
    console.log(`Test will be saved at: ${testPath}`);
    fs.writeFileSync(testPath, testCode);
  }
}

async function main() {
  const generator = new TestGenerator();

  // Find all component files
  const componentFiles = glob.sync('src/components/**/*.jsx');
  const pageFiles = glob.sync('src/pages/**/*.jsx');

  // Generate tests for all components
  for (const file of [...componentFiles, ...pageFiles]) {
    console.log(`Generating test for ${file}...`);
    await generator.generateTest(file);
  }
}

main().catch(console.error);

export default TestRunner;
