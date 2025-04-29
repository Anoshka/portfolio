import fs from 'fs';
import path from 'path';
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
    this.skipComponents = ['Animation']; // Add any components you want to skip
  }

  async generateTest(componentPath) {
    const componentName = path.basename(componentPath, '.jsx');

    if (this.skipComponents.includes(componentName)) {
      console.log(`Skipping test generation for ${componentName}`);
      return null;
    }

    console.log(`Generating test for: ${componentPath}`);
    const code = fs.readFileSync(componentPath, 'utf-8');
    const prompt = getTestPrompt(componentName, code);

    try {
      const response = await fetch(
        'https://api-inference.huggingface.co/models/meta-llama/Llama-2-70b-chat-hf',
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
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const result = await response.json();
      const testCode = this.processGeneratedCode(
        result[0].generated_text,
        componentName
      );

      if (testCode) {
        this.saveTest(componentName, testCode);
        return testCode;
      }
    } catch (error) {
      console.error(`Error generating test for ${componentName}:`, error);
      const fallbackTest = this.createFallbackTest(componentName);
      if (fallbackTest) {
        this.saveTest(componentName, fallbackTest);
      }
      return fallbackTest;
    }
  }

  processGeneratedCode(generatedText, componentName) {
    // Clean up the generated code
    let code = generatedText.trim();

    // Ensure proper imports
    const imports = `import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TestWrapper${componentName === 'Animation' ? ', mockCanvas' : ''} } from '../testUtils';
import ${componentName} from '${componentName.includes('Page') ? '../../../pages' : '../../../components'}/${componentName}/${componentName}';`;

    // Replace any direct BrowserRouter imports/usage with TestWrapper
    code = code.replace(
      /import.*BrowserRouter.*from.*react-router-dom.*;\n?/g,
      ''
    );
    code = code.replace(
      /<BrowserRouter>(.*?)<\/BrowserRouter>/gs,
      '<TestWrapper>$1</TestWrapper>'
    );

    // Add warning suppression for React Router
    const setup = `
// Suppress React Router warnings
beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation((msg) => {
    if (!msg.includes('React Router')) {
      console.warn(msg);
    }
  });
});

afterAll(() => {
  jest.restoreAllMocks();
});`;

    return `${imports}

${setup}

${code}`;
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
    console.log(`Test saved: ${testPath}`);
  }
}

export default TestGenerator;
