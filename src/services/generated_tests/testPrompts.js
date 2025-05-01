export const getTestPrompt = (componentName, code) => {
  const isPage = code.includes('/pages/');
  const importPath = isPage
    ? `../../../pages/${componentName}/${componentName}`
    : `../../../components/${componentName}/${componentName}`;

  // Skip Animation component
  if (componentName === 'Animation') {
    return null;
  }

  // Page-specific test template
  if (componentName.includes('Page')) {
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

  test('all links are valid and clickable', () => {
    render(
      <TestWrapper>
        <${componentName} />
      </TestWrapper>
    );
    
    // Get all links in the page
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);

    // Verify each link has href and is clickable
    links.forEach(link => {
      expect(link).toHaveAttribute('href');
      expect(link).not.toHaveAttribute('href', '#');
      expect(link).toBeEnabled();
    });
  });

  test('navigation elements are accessible', () => {
    render(
      <TestWrapper>
        <${componentName} />
      </TestWrapper>
    );

    // Check for navigation landmarks if present
    const navElements = screen.queryAllByRole('navigation');
    navElements.forEach(nav => {
      expect(nav).toBeInTheDocument();
    });
  });
});`;
  }

  // Header component test
  if (componentName === 'Header') {
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
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    
    // Check all navigation links
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    
    links.forEach(link => {
      expect(link).toHaveAttribute('href');
      expect(link).not.toHaveAttribute('href', '#');
      expect(link).toBeEnabled();
    });
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

  test('mobile menu links are accessible when open', () => {
    render(
      <TestWrapper>
        <${componentName} isOpen={true} />
      </TestWrapper>
    );
    
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toBeVisible();
      expect(link).toBeEnabled();
    });
  });
});`;
  }

  // Card component test
  if (componentName === 'Card') {
    return `
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

  test('link is properly configured', () => {
    render(
      <TestWrapper>
        <${componentName} {...defaultProps} />
      </TestWrapper>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', defaultProps.link);
    expect(link).toBeEnabled();
  });

  test('handles click events', () => {
    render(
      <TestWrapper>
        <${componentName} {...defaultProps} />
      </TestWrapper>
    );
    const link = screen.getByRole('link');
    fireEvent.click(link);
  });
});`;
  }

  // Grid components (WebDevGrid, TechArtGrid)
  if (componentName.includes('Grid')) {
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

  test('all card links are valid', () => {
    render(
      <TestWrapper>
        <${componentName} />
      </TestWrapper>
    );
    
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    
    links.forEach(link => {
      expect(link).toHaveAttribute('href');
      expect(link).not.toHaveAttribute('href', '#');
      expect(link).toBeEnabled();
    });
  });

  test('grid layout is accessible', () => {
    render(
      <TestWrapper>
        <${componentName} />
      </TestWrapper>
    );
    
    // Check for proper list structure if using ul/li
    const list = screen.queryByRole('list');
    if (list) {
      const items = screen.getAllByRole('listitem');
      expect(items.length).toBeGreaterThan(0);
    }
  });
});`;
  }

  // Footer component test
  if (componentName === 'Footer') {
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

  test('all social links are valid', () => {
    render(
      <TestWrapper>
        <${componentName} />
      </TestWrapper>
    );
    
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    
    links.forEach(link => {
      expect(link).toHaveAttribute('href');
      expect(link).not.toHaveAttribute('href', '#');
      expect(link).toBeEnabled();
    });
  });

  test('links have proper aria labels', () => {
    render(
      <TestWrapper>
        <${componentName} />
      </TestWrapper>
    );
    
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('aria-label');
    });
  });
});`;
  }

  // Default test template for other components
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

  test('all links are valid if present', () => {
    render(
      <TestWrapper>
        <${componentName} />
      </TestWrapper>
    );
    
    const links = screen.queryAllByRole('link');
    if (links.length > 0) {
      links.forEach(link => {
        expect(link).toHaveAttribute('href');
        expect(link).not.toHaveAttribute('href', '#');
        expect(link).toBeEnabled();
      });
    }
  });
});`;
};
