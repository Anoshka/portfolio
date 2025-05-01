import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TestWrapper } from '../testUtils';
import NotFoundPage from '../../../pages/NotFoundPage/NotFoundPage';

describe('NotFoundPage', () => {
  
  test('renders without crashing', () => {
    render(
      <TestWrapper>
        <NotFoundPage />
      </TestWrapper>
    );
  });
});
