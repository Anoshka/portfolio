import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TestWrapper } from '../testUtils';
import WebDevGrid from '../../../components/WebDevGrid/WebDevGrid';

describe('WebDevGrid', () => {
  test('renders without crashing', () => {
    render(
      <TestWrapper>
        <WebDevGrid />
      </TestWrapper>
    );
  });
});
