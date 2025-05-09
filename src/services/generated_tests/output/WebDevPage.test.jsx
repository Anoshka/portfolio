import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TestWrapper } from '../testUtils';
import WebDevPage from '../../../pages/WebDevPage/WebDevPage';

describe('WebDevPage', () => {
  
  test('renders without crashing', () => {
    render(
      <TestWrapper>
        <WebDevPage />
      </TestWrapper>
    );
  });
});
