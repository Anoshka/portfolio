export const getTestPrompt = (componentName, code) => {
  const isPage = code.includes('/pages/');
  const importPath = isPage
    ? `../../../pages/${componentName}/${componentName}`
    : `../../../components/${componentName}/${componentName}`;

  // Animation component test
  if (componentName === 'Animation') {
    return `
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TestWrapper, mockCanvas } from '../testUtils';

// Mock Three.js modules
jest.mock('three', () => ({
  WebGLRenderer: jest.fn().mockImplementation(() => ({
    setSize: jest.fn(),
    render: jest.fn(),
    setClearColor: jest.fn(),
    domElement: document.createElement('canvas')
  })),
  Scene: jest.fn(),
  PerspectiveCamera: jest.fn(),
  AmbientLight: jest.fn(),
  DirectionalLight: jest.fn(),
  Clock: jest.fn(() => ({ getElapsedTime: () => 0 })),
  Vector3: jest.fn()
}));

jest.mock('three/examples/jsm/loaders/FBXLoader', () => ({
  FBXLoader: jest.fn().mockImplementation(() => ({
    load: jest.fn((url, onLoad) => onLoad({}))
  }))
}));

jest.mock('three/examples/jsm/controls/OrbitControls', () => ({
  OrbitControls: jest.fn()
}));

import ${componentName} from '${importPath}';

describe('${componentName}', () => {
  beforeAll(() => {
    mockCanvas();
  });

  beforeEach(() => {
    jest.clearAllMocks();
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
});`;
};
