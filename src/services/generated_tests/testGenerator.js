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

    // Components to skip during test generation
    this.skipComponents = ['Animation'];
  }

  // Generate test for a given component
  async generateTest(componentPath) {
    const componentName = path.basename(componentPath, '.jsx');

    // Skip specified components
    if (this.skipComponents.includes(componentName)) {
      console.log(
        `Skipping test generation for ${componentName} as it's in the skip list`
      );
      return null;
    }

    console.log(`Generating test for: ${componentPath}`);

    const code = fs.readFileSync(componentPath, 'utf-8');
    const needsRouter =
      code.includes('react-router-dom') ||
      code.includes('useNavigate') ||
      code.includes('Link') ||
      code.includes('Route');

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
      ${needsRouter ? '8. Make sure to wrap the component in BrowserRouter since it uses React Router' : ''}

      Return only the test code.
      ${needsRouter ? 'Important: The component uses React Router, so it must be wrapped in BrowserRouter in the tests.' : ''}
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

      if (testCode) {
        this.saveTest(componentName, testCode);
        console.log(`Successfully generated test for: ${componentName}`);
      }
      return testCode;
    } catch (error) {
      console.error(`Error generating test for ${componentName}:`, error);
      const basicTest = this.createBasicTest(componentName);
      if (basicTest) {
        this.saveTest(componentName, basicTest);
      }
      return basicTest;
    }
  }

  // Simple fallback test when Codex fails
  createBasicTest(componentName) {
    // Skip specified components
    if (this.skipComponents.includes(componentName)) {
      console.log(
        `Skipping basic test creation for ${componentName} as it's in the skip list`
      );
      return null;
    }

    const isPage = componentName.includes('Page');
    const folderPath = isPage ? 'pages' : 'components';

    // Read the component file to check if it needs Router
    const componentPath = path.join(
      process.cwd(),
      'src',
      folderPath,
      componentName,
      `${componentName}.jsx`
    );
    const componentCode = fs.readFileSync(componentPath, 'utf-8');
    const needsRouter =
      componentCode.includes('react-router-dom') ||
      componentCode.includes('useNavigate') ||
      componentCode.includes('Link') ||
      componentCode.includes('Route');

    const imports = `
      import { render } from '@testing-library/react';
      ${needsRouter ? "import { BrowserRouter } from 'react-router-dom';" : ''}
      import ${componentName} from '../../../${folderPath}/${componentName}/${componentName}.jsx';
    `;

    const renderCode = needsRouter
      ? `render(<BrowserRouter><${componentName} /></BrowserRouter>);`
      : `render(<${componentName} />);`;

    return `
      ${imports}
  
      describe('${componentName}', () => {
        test('renders without crashing', () => {
          ${renderCode}
        });
      });
    `.trim();
  }

  saveTest(componentName, testCode) {
    // Skip saving tests for specified components
    if (this.skipComponents.includes(componentName)) {
      console.log(
        `Skipping test save for ${componentName} as it's in the skip list`
      );
      return;
    }

    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    const testPath = path.join(this.outputDir, `${componentName}.test.jsx`);
    fs.writeFileSync(testPath, testCode);
    console.log(`Test for ${componentName} saved at: ${testPath}`);
  }
}

export default TestGenerator;
