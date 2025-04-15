import fs from 'fs';
import path from 'path';
import TestGenerator from './testGenerator';

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
    fs.writeFileSync(testPath, testCode);

    // Run test
    // need to add jest.runCLI() here if you want to run tests immediately
  }

  async runRouteTests(routes) {
    const testCode = await this.generator.generateRouteTest(routes);
    const testPath = path.join(this.testOutputDir, 'routes.test.jsx');
    fs.writeFileSync(testPath, testCode);
  }
}

export default TestRunner;
