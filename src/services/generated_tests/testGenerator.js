import { OpenAI } from 'openai'; // Import OpenAI SDK
import fs from 'fs';
import path from 'path';
// import dotenv from 'dotenv';
// dotenv.config();

class TestGenerator {
  constructor() {
    // Initialize OpenAI with API Key (make sure it's in your environment variables)
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.outputDir = path.join(
      process.cwd(),
      'src/services/generated_tests/output'
    );
  }

  // Generate test for a given component
  async generateTest(componentPath) {
    console.log(`Generating test for: ${componentPath}`);

    // Read the component code
    const code = fs.readFileSync(componentPath, 'utf-8');
    const componentName = path.basename(componentPath, '.jsx');

    // Prepare prompt for Codex (GPT-3)
    const prompt = `
      Generate a Jest test for this React component:
      ${code}

      Requirements:
      1. Use React Testing Library
      2. Test component rendering
      3. Test user interactions
      4. Test route handling (if applicable)
      5. Test responsive design
      6. Test animations (if present)
      7. Include error cases

      Return only the test code.
    `;

    try {
      // Call OpenAI Codex to generate test
      const completion = await this.openai.chat.completions.create({
        model: 'code-davinci-002', // Use Codex model
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful assistant that generates Jest test cases for React components.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      // Extract generated test code from the response
      const testCode = completion.choices[0].message.content;

      // Save the generated test code to a file
      this.saveTest(componentName, testCode);
      console.log(`Successfully generated test for: ${componentName}`);
      return testCode;
    } catch (error) {
      console.error(`Error generating test for ${componentName}:`, error);
      // Fallback to a basic test if Codex fails
      const basicTest = this.createBasicTest(componentName);
      this.saveTest(componentName, basicTest);
      return basicTest;
    }
  }

  // Simple fallback test when Codex fails
  createBasicTest(componentName) {
    return `
      import { render } from '@testing-library/react';
      import ${componentName} from './${componentName}';

      describe('${componentName}', () => {
        test('renders without crashing', () => {
          render(<${componentName} />);
        });
      });
    `;
  }

  // Save the test code to the output directory
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
