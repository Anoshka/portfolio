import { OpenAI } from 'openai';
import fs from 'fs';
import path from 'path';

class TestGenerator {
  constructor() {
    this.openai = new OpenAI(process.env.OPENAI_API_KEY);
    this.outputDir = path.join(
      process.cwd(),
      'src/services/generated_tests/output'
    );
  }

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
      7. Include error casess
      
      Return only the test code.
    `;

    try {
      const completion = await this.openai.createCompletion({
        model: 'gpt-4',
        prompt,
        max_tokens: 1500,
        temperature: 0.7,
      });

      const testCode = completion.choices[0].text;
      this.saveTest(componentName, testCode);
      console.log(`Successfully generated test for: ${componentName}`);
      return testCode;
    } catch (error) {
      console.error(`Error generating test for ${componentName}:`, error);
      // Create a basic test if OpenAI fails
      const basicTest = this.createBasicTest(componentName);
      this.saveTest(componentName, basicTest);
      return basicTest;
    }
  }

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
