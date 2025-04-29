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

        // First, check if the model is ready
        const checkResponse = await fetch(
          'https://api-inference.huggingface.co/models/bigcode/starcoder',
          {
            method: 'HEAD',
            headers: {
              Authorization: `Bearer ${this.apiKey}`,
            },
          }
        );

        if (checkResponse.status === 503) {
          console.log('Model is loading, waiting...');
          // Get the estimated time from the response
          const waitTime = parseInt(
            checkResponse.headers.get('X-Wait-For') || '20'
          );
          await new Promise((resolve) =>
            setTimeout(resolve, (waitTime + 5) * 1000)
          );
        }

        const response = await fetch(
          'https://api-inference.huggingface.co/models/bigcode/starcoder',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify({
              inputs: prompt,
              parameters: {
                max_new_tokens: 1024,
                temperature: 0.2, // Lower temperature for more focused output
                top_p: 0.95,
                do_sample: true,
                return_full_text: false,
                num_return_sequences: 1,
              },
            }),
          }
        );

        // Log the full response for debugging
        console.log(`Response status: ${response.status}`);
        console.log(
          `Response headers:`,
          Object.fromEntries(response.headers.entries())
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Full error response:`, errorText);

          if (response.status === 404) {
            throw new Error(
              'Model not found. Please check the model name and try again.'
            );
          } else if (response.status === 403) {
            throw new Error(
              'Authentication failed. Please check your API key.'
            );
          } else {
            throw new Error(
              `API request failed: ${response.statusText}. Details: ${errorText}`
            );
          }
        }

        const result = await response.json();
        console.log('Raw API response:', JSON.stringify(result, null, 2));

        let testCode;
        if (Array.isArray(result)) {
          testCode = result[0].generated_text;
        } else if (result.generated_text) {
          testCode = result.generated_text;
        } else {
          throw new Error('Unexpected API response format');
        }

        // Clean up the generated code
        testCode = testCode.replace(/```jsx?|```/g, '').trim();

        if (!testCode || !testCode.includes('import')) {
          console.log('Generated code:', testCode);
          throw new Error('Generated test code is invalid or incomplete');
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

        // Exponential backoff
        const waitTime = Math.pow(2, attempt) * 1000;
        console.log(`Waiting ${waitTime / 1000} seconds before retry...`);
        await new Promise((resolve) => setTimeout(resolve, waitTime));
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
