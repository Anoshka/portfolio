import fs from 'fs';
import path from 'path';
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

class TestGenerator {
  constructor() {
    this.outputDir = path.join(
      process.cwd(),
      'src/services/generated_tests/output'
    );
    this.huggingFaceAPIKey = process.env.HUGGING_FACE_API_KEY; // Get API key from env
  }

  // Generate test for a given component
  async generateTest(componentPath) {
    console.log(`Generating test for: ${componentPath}`);

    // Read the component code
    const code = fs.readFileSync(componentPath, 'utf-8');
    const componentName = path.basename(componentPath, '.jsx');

    // Prepare prompt for the CodeGen model
    const prompt = `Generate a Jest test for this React component:
      ${code}

      Requirements:
      1. Use React Testing Library
      2. Test component rendering
      3. Test user interactions
      4. Test route handling (if applicable)
      5. Test responsive design
      6. Test animations (if present)
      7. Include error cases

      Return only the test code.`;

    try {
      // Call Hugging Face CodeGen model to generate the test
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/Salesforce/codegen-350M-mono', // Use the CodeGen model endpoint
        {
          inputs: prompt,
        },
        {
          headers: {
            Authorization: `Bearer ${this.huggingFaceAPIKey}`,
          },
        }
      );

      // Extract the generated test code from the response
      const testCode = response.data[0].generated_text;

      // Save the generated test code to a file
      this.saveTest(componentName, testCode);
      console.log(`Successfully generated test for: ${componentName}`);
      return testCode;
    } catch (error) {
      console.error(`Error generating test for ${componentName}:`, error);
      // Fallback to a basic test if CodeGen fails
      const basicTest = this.createBasicTest(componentName);
      this.saveTest(componentName, basicTest);
      return basicTest;
    }
  }

  // Simple fallback test when CodeGen fails
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
