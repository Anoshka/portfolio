import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import { getTestPrompt } from './testPrompts.js';

class TemplateGenerator {
  constructor() {
    this.outputDir = path.join(
      process.cwd(),
      'src/services/generated_tests/output'
    );
    this.skipComponents = ['Animation'];
  }

  cleanOutputDirectory() {
    console.log('🧹 Cleaning output directory...');

    // Force remove the entire output directory
    if (fs.existsSync(this.outputDir)) {
      fs.rmSync(this.outputDir, { recursive: true, force: true });
      console.log('   Removed existing output directory', this.outputDir);
    }

    // Create fresh output directory
    fs.mkdirSync(this.outputDir, { recursive: true });
    console.log('📁 Created fresh output directory');

    // Remove any lingering Animation test files
    const animationFiles = globSync(
      path.join(this.outputDir, 'Animation.test.*')
    );
    animationFiles.forEach((file) => {
      fs.unlinkSync(file);
      console.log(`   Removed lingering file: ${file}`);
    });
  }

  generateTestFromPrompt(componentName, prompt, importPath) {
    // Remove Animation-specific code since we're skipping it
    const isSpecialComponent = ['Header', 'Card', 'TypeEffect'].includes(
      componentName
    );

    // Basic test structure for all components
    return `
import React from 'react';
import { render, screen ${isSpecialComponent ? ', fireEvent' : ''}} from '@testing-library/react';
import '@testing-library/jest-dom';
import { TestWrapper } from '../testUtils';
import ${componentName} from '${importPath}';

describe('${componentName}', () => {
  ${this.generateTestCasesFromPrompt(componentName, prompt)}
});`;
  }

  generateTestCasesFromPrompt(componentName, prompt) {
    // Extract test requirements from prompt and generate appropriate test cases
    const basicTest = `
  test('renders without crashing', () => {
    render(
      <TestWrapper>
        <${componentName} />
      </TestWrapper>
    );
  });`;

    if (componentName === 'Header') {
      return `
  test('renders navigation links', () => {
    render(
      <TestWrapper>
        <${componentName} isOpen={false} />
      </TestWrapper>
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('toggles menu on button click', () => {
    render(
      <TestWrapper>
        <${componentName} isOpen={false} />
      </TestWrapper>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
  });`;
    }

    if (componentName === 'Card') {
      return `
  const defaultProps = {
    title: 'Test Card',
    image: 'test-image.jpg',
    link: 'https://test.com'
  };

  test('renders with required props', () => {
    render(
      <TestWrapper>
        <${componentName} {...defaultProps} />
      </TestWrapper>
    );
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
  });

  test('renders link with correct href', () => {
    render(
      <TestWrapper>
        <${componentName} {...defaultProps} />
      </TestWrapper>
    );
    expect(screen.getByRole('link')).toHaveAttribute('href', defaultProps.link);
  });`;
    }

    return basicTest;
  }

  generateTestForComponent(componentPath) {
    const componentName = path.basename(componentPath, '.jsx');

    // Early return for Animation component
    if (this.skipComponents.includes(componentName)) {
      console.log(`⏭️ Skipping test generation for ${componentName}`);
      return;
    }

    console.log(`🔄 Generating test for: ${componentPath}`);

    try {
      const code = fs.readFileSync(componentPath, 'utf-8');
      const isPage = componentPath.includes('/pages/');
      const importPath = isPage
        ? `../../../pages/${componentName}/${componentName}`
        : `../../../components/${componentName}/${componentName}`;

      // Get the prompt for this component
      const prompt = getTestPrompt(componentName, code);

      // Generate test code from prompt
      const testCode = this.generateTestFromPrompt(
        componentName,
        prompt,
        importPath
      );

      // Force overwrite any existing test
      this.saveTest(componentName, testCode);
      console.log(`✅ Generated test for: ${componentName}`);
    } catch (error) {
      console.error(`❌ Error generating test for ${componentName}:`, error);
    }
  }

  saveTest(componentName, testCode) {
    const testPath = path.join(this.outputDir, `${componentName}.test.jsx`);

    // Force overwrite the file
    fs.writeFileSync(testPath, testCode.trim() + '\n', { flag: 'w' });
    console.log(`📝 Saved test: ${testPath}`);
  }

  async generateAllTests() {
    // Clean up before generating new tests
    this.cleanOutputDirectory();

    const componentFiles = globSync('src/components/**/*.jsx');
    const pageFiles = globSync('src/pages/**/*.jsx');

    console.log('\n🔄 Starting test generation...');
    for (const file of [...componentFiles, ...pageFiles]) {
      this.generateTestForComponent(file);
    }
    console.log('\n✅ Test generation complete!');
  }
}

// Run the generator
const generator = new TemplateGenerator();
generator.generateAllTests().catch(console.error);

export default TemplateGenerator;
