import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TestWrapper } from '../testUtils';
import WebDevProjectPage from '../../../pages/WebDevProjectPage/WebDevProjectPage';

describe('WebDevProjectPage', () => {
  
  test('renders without crashing', () => {
    render(
      <TestWrapper>
        <WebDevProjectPage />
      </TestWrapper>
    );
  });
});
