import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { getTestPrompt } from './testPrompts.js';

class TestGenerator {
  constructor() {
    const apiKey = process.env.HUGGING_FACE_API_KEY;
    if (!apiKey) {
      throw new Error('HUGGING_FACE_API_KEY is required');
    }

    this.apiKey = apiKey;
    this.outputDir = path.join(
      process.cwd(),
      'src/services/generated_tests/output'
    );
    this.skipComponents = ['Animation'];
    this.results = {
      successful: [],
      failed: [],
      skipped: [],
    };
  }

  async generateTest(componentPath) {
    const componentName = path.basename(componentPath, '.jsx');
    const maxRetries = 3;
    let lastError;

    if (this.skipComponents.includes(componentName)) {
      console.log(`⏭️ Skipping test generation for ${componentName}`);
      this.results.skipped.push(componentName);
      return null;
    }

    console.log(`🔄 Generating test for: ${componentPath}`);

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const code = fs.readFileSync(componentPath, 'utf-8');
        const prompt = getTestPrompt(componentName, code);

        console.log(`Attempt ${attempt}/${maxRetries} for ${componentName}`);

        const response = await fetch(
          'https://api-inference.huggingface.co/models/google/flan-t5-xxl',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify({
              inputs: prompt,
              parameters: {
                max_new_tokens: 2000,
                temperature: 0.7,
                top_p: 0.95,
                do_sample: true,
                return_full_text: false,
              },
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `API request failed: ${response.statusText}. Details: ${errorText}`
          );
        }

        const result = await response.json();
        const testCode = result[0].generated_text;

        if (!testCode || !testCode.includes('import')) {
          throw new Error('Generated test code is invalid');
        }

        this.saveTest(componentName, testCode);
        this.results.successful.push(componentName);
        console.log(`✅ Successfully generated test for: ${componentName}`);
        return testCode;
      } catch (error) {
        lastError = error;
        console.error(
          `❌ Attempt ${attempt} failed for ${componentName}:`,
          error
        );

        if (attempt === maxRetries) {
          console.error(
            `❌ All ${maxRetries} attempts failed for ${componentName}`
          );
          this.results.failed.push({
            component: componentName,
            error: lastError.message,
          });
          const fallbackTest = this.createFallbackTest(componentName);
          if (fallbackTest) {
            this.saveTest(componentName, fallbackTest);
            console.log(`⚠️ Used fallback test for: ${componentName}`);
          }
          return fallbackTest;
        }

        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, 2000 * attempt));
      }
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
