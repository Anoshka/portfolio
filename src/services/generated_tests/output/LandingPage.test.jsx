import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TestWrapper } from '../testUtils';
import LandingPage from '../../../pages/LandingPage/LandingPage';

describe('LandingPage', () => {
  test('renders without crashing', () => {
    render(
      <TestWrapper>
        <LandingPage />
      </TestWrapper>
    );
  });
});
