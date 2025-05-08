import '@testing-library/jest-dom';

// Mock Three.js modules
jest.mock('three', () => ({
  WebGLRenderer: jest.fn(),
  Scene: jest.fn(),
  PerspectiveCamera: jest.fn(),
  Vector3: jest.fn(),
  Clock: jest.fn(),
  // Add other Three.js classes/functions you use
}));

jest.mock('three/examples/jsm/loaders/FBXLoader', () => ({
  FBXLoader: jest.fn(),
}));

jest.mock('three/examples/jsm/controls/OrbitControls', () => ({
  OrbitControls: jest.fn(),
}));
