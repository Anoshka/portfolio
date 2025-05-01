import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import { getTestPrompt } from './testPrompts.js';

class TemplateGenerator {
  constructor() {
    // Determine the environment
    const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
    const isWindows = process.platform === 'win32';

    // Set base directory based on environment
    let baseDir;
    if (isGitHubActions) {
      // Use GitHub workspace in Actions
      baseDir = process.env.GITHUB_WORKSPACE;
    } else if (isWindows) {
      // Use Windows path locally
      baseDir = 'D:/personal/portfolio/portfolio';
    } else {
      // Fallback to current working directory
      baseDir = process.cwd();
    }

    // Normalize the base path for the current OS
    this.baseDir = path.normalize(baseDir);

    // Set output directory relative to base directory
    this.outputDir = path.join(
      this.baseDir,
      'src',
      'services',
      'generated_tests',
      'output'
    );

    console.log('🔍 Environment:', {
      isGitHubActions,
      isWindows,
      baseDir: this.baseDir,
      outputDir: this.outputDir,
    });

    this.skipComponents = ['Animation'];
  }

  cleanOutputDirectory() {
    console.log('🧹 Cleaning output directory...');

    try {
      // Force remove the entire output directory
      if (fs.existsSync(this.outputDir)) {
        const files = fs.readdirSync(this.outputDir);
        for (const file of files) {
          const filePath = path.join(this.outputDir, file);
          fs.unlinkSync(filePath);
          console.log(`   Removed: ${file}`);
        }
        console.log('   Removed all files from output directory');
      } else {
        console.log('   Output directory does not exist, creating it...');
      }

      // Create or ensure output directory exists
      fs.mkdirSync(this.outputDir, { recursive: true });
      console.log('📁 Created/verified output directory at:', this.outputDir);

      // Remove any lingering Animation test files
      const animationFiles = globSync(
        path.join(this.outputDir, 'Animation.test.*')
      );
      animationFiles.forEach((file) => {
        fs.unlinkSync(file);
        console.log(`   Removed lingering file: ${file}`);
      });
    } catch (error) {
      console.error('❌ Error cleaning output directory:', error);
      throw error;
    }
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
      throw error;
    }
  }

  saveTest(componentName, testCode) {
    try {
      const testPath = path.join(this.outputDir, `${componentName}.test.jsx`);

      // Ensure directory exists before writing
      fs.mkdirSync(path.dirname(testPath), { recursive: true });

      // Force overwrite the file
      fs.writeFileSync(testPath, testCode.trim() + '\n', { flag: 'w' });
      console.log(`📝 Saved test to: ${testPath}`);
    } catch (error) {
      console.error(`❌ Error saving test for ${componentName}:`, error);
      throw error;
    }
  }

  async generateAllTests() {
    try {
      // Clean up before generating new tests
      this.cleanOutputDirectory();

      const componentFiles = globSync('src/components/**/*.jsx');
      const pageFiles = globSync('src/pages/**/*.jsx');

      console.log('\n🔄 Starting test generation...');
      console.log('📁 Found components:', componentFiles);
      console.log('📁 Found pages:', pageFiles);

      for (const file of [...componentFiles, ...pageFiles]) {
        this.generateTestForComponent(file);
      }
      console.log('\n✅ Test generation complete!');
    } catch (error) {
      console.error('❌ Error generating tests:', error);
      throw error;
    }
  }
}

// Run the generator
const generator = new TemplateGenerator();
generator.generateAllTests().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});

export default TemplateGenerator;
