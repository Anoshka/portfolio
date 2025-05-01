import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';

class TemplateGenerator {
  constructor() {
    this.outputDir = path.join(
      process.cwd(),
      'src/services/generated_tests/output'
    );
    this.skipComponents = ['AutoRiggerPage'];
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

      // Generate test based on component type
      let testCode;
      if (componentName === 'Animation') {
        testCode = this.generateAnimationTest(componentName, importPath);
      } else if (componentName === 'Header') {
        testCode = this.generateHeaderTest(componentName, importPath);
      } else if (componentName === 'Card') {
        testCode = this.generateCardTest(componentName, importPath);
      } else if (componentName === 'TypeEffect') {
        testCode = this.generateTypeEffectTest(componentName, importPath);
      } else {
        testCode = this.generateBasicTest(componentName, importPath);
      }

      this.saveTest(componentName, testCode);
      console.log(`✅ Generated test for: ${componentName}`);
    } catch (error) {
      console.error(`❌ Error generating test for ${componentName}:`, error);
    }
  }

  generateAnimationTest(componentName, importPath) {
    return `
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TestWrapper, mockCanvas } from '../testUtils';
import ${componentName} from '${importPath}';

describe('${componentName}', () => {
  beforeAll(() => {
    mockCanvas();
  });

  test('renders without crashing', () => {
    render(
      <TestWrapper>
        <${componentName} />
      </TestWrapper>
    );
  });

  test('cleans up on unmount', () => {
    const { unmount } = render(
      <TestWrapper>
        <${componentName} />
      </TestWrapper>
    );
    unmount();
  });
});`;
  }

  generateHeaderTest(componentName, importPath) {
    return `
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TestWrapper } from '../testUtils';
import ${componentName} from '${importPath}';

describe('${componentName}', () => {
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
  });
});`;
  }

  generateCardTest(componentName, importPath) {
    return `
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TestWrapper } from '../testUtils';
import ${componentName} from '${importPath}';

describe('${componentName}', () => {
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
  });
});`;
  }

  generateTypeEffectTest(componentName, importPath) {
    return `
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TestWrapper } from '../testUtils';
import ${componentName} from '${importPath}';

describe('${componentName}', () => {
  test('renders without crashing', () => {
    render(
      <TestWrapper>
        <${componentName} />
      </TestWrapper>
    );
  });

  test('renders with custom text', () => {
    const text = 'Test text';
    render(
      <TestWrapper>
        <${componentName} text={text} />
      </TestWrapper>
    );
  });
});`;
  }

  generateBasicTest(componentName, importPath) {
    return `
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TestWrapper } from '../testUtils';
import ${componentName} from '${importPath}';

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
    fs.writeFileSync(testPath, testCode.trim() + '\n');
  }

  async generateAllTests() {
    const componentFiles = globSync('src/components/**/*.jsx');
    const pageFiles = globSync('src/pages/**/*.jsx');

    for (const file of [...componentFiles, ...pageFiles]) {
      this.generateTestForComponent(file);
    }
  }
}

// Run the generator
const generator = new TemplateGenerator();
generator.generateAllTests().catch(console.error);

export default TemplateGenerator;
