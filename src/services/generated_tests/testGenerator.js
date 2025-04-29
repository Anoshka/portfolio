import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { getTestPrompt } from './testPrompts.js';

class TestGenerator {
  constructor() {
    this.outputDir = path.join(
      process.cwd(),
      'src/services/generated_tests/output'
    );
    this.skipComponents = ['AutoRiggerPage', 'Animation'];
    this.results = {
      successful: [],
      failed: [],
      skipped: [],
    };
  }

  async generateTest(componentPath) {
    const componentName = path.basename(componentPath, '.jsx');

    if (this.skipComponents.includes(componentName)) {
      console.log(`⏭️ Skipping test generation for ${componentName}`);
      this.results.skipped.push(componentName);
      return null;
    }

    console.log(`🔄 Generating test for: ${componentPath}`);

    try {
      const code = fs.readFileSync(componentPath, 'utf-8');
      const prompt = getTestPrompt(componentName, code);

      // Call Python script for local model inference
      const testCode = await new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', [
          'src/services/generated_tests/local_model.py',
        ]);

        let result = '';
        let error = '';

        pythonProcess.stdout.on('data', (data) => {
          result += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
          error += data.toString();
        });

        pythonProcess.stdin.write(
          JSON.stringify({
            component_name: componentName,
            component_code: code,
            prompt_template: prompt,
          })
        );
        pythonProcess.stdin.end();

        pythonProcess.on('close', (code) => {
          if (code !== 0) {
            reject(new Error(`Python process failed: ${error}`));
            return;
          }
          try {
            const { test_code } = JSON.parse(result);
            resolve(test_code);
          } catch (e) {
            reject(new Error(`Failed to parse Python output: ${e.message}`));
          }
        });
      });

      if (!testCode || !testCode.includes('import')) {
        throw new Error('Generated test code is invalid');
      }

      this.saveTest(componentName, testCode);
      this.results.successful.push(componentName);
      console.log(`✅ Successfully generated test for: ${componentName}`);
      return testCode;
    } catch (error) {
      console.error(`❌ Error generating test for ${componentName}:`, error);
      this.results.failed.push({
        component: componentName,
        error: error.message,
      });
      const fallbackTest = this.createFallbackTest(componentName);
      if (fallbackTest) {
        this.saveTest(componentName, fallbackTest);
        console.log(`⚠️ Used fallback test for: ${componentName}`);
      }
      return fallbackTest;
    }
  }

  createFallbackTest(componentName) {
    const isPage = componentName.includes('Page');

    return `import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TestWrapper } from '../testUtils';
import ${componentName} from '${isPage ? '../../../pages' : '../../../components'}/${componentName}/${componentName}';

describe('${componentName}', () => {
  test('renders without crashing', () => {
    render(
      <TestWrapper>
        <${componentName} />
      </TestWrapper>
    );
  });
});`;
  }

  saveTest(componentName, testCode) {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    const testPath = path.join(this.outputDir, `${componentName}.test.jsx`);
    fs.writeFileSync(testPath, testCode);
    console.log(`📝 Test saved: ${testPath}`);
  }

  getResults() {
    return {
      summary: {
        total:
          this.results.successful.length +
          this.results.failed.length +
          this.results.skipped.length,
        successful: this.results.successful.length,
        failed: this.results.failed.length,
        skipped: this.results.skipped.length,
      },
      details: {
        successful: this.results.successful,
        failed: this.results.failed,
        skipped: this.results.skipped,
      },
    };
  }
}

export default TestGenerator;
