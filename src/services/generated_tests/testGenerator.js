import { OpenAI } from 'openai'; // Import OpenAI SDK
import fs from 'fs';
import path from 'path';

class TestGenerator {
  constructor() {
    const apiKey = process.env.HUGGING_FACE_API_KEY;

    if (!apiKey) {
      console.error(
        'API key is missing! Please provide the Hugging Face API key.'
      );
      process.exit(1); // Exit the process if no API key is found
    }

    // Initialize OpenAI with the API key from the environment variable
    this.openai = new OpenAI({
      apiKey: apiKey,
    });
    this.outputDir = path.join(
      process.cwd(),
      'src/services/generated_tests/output'
    );
  }

  // Generate test for a given component
  async generateTest(componentPath) {
    console.log(`Generating test for: ${componentPath}`);

    const code = fs.readFileSync(componentPath, 'utf-8');
    const componentName = path.basename(componentPath, '.jsx');

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
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
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

      const testCode = completion.choices[0].message.content;

      this.saveTest(componentName, testCode);
      console.log(`Successfully generated test for: ${componentName}`);
      return testCode;
    } catch (error) {
      console.error(`Error generating test for ${componentName}:`, error);
      const basicTest = this.createBasicTest(componentName);
      this.saveTest(componentName, basicTest);
      return basicTest;
    }
  }

  // Simple fallback test when Codex fails
  createBasicTest(componentName) {
    const isPage = componentName.includes('Page');
    const folderPath = isPage ? 'pages' : 'components';

    return `
      import { render } from '@testing-library/react';
      import ${componentName} from '../../${folderPath}/${componentName}/${componentName}.jsx';
  
      describe('${componentName}', () => {
        test('renders without crashing', () => {
          render(<${componentName} />);
        });
      });
    `;
  }

  saveTest(componentName, testCode) {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    const testPath = path.join(this.outputDir, `${componentName}.test.jsx`);
    fs.writeFileSync(testPath, testCode); // This will overwrite the file
    console.log(`Test for ${componentName} saved at: ${testPath}`);
  }
}

export default TestGenerator;
