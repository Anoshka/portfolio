import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TestWrapper } from '../testUtils';
import TechArtPage from '../../../pages/TechArtPage/TechArtPage';

describe('TechArtPage', () => {
  
  test('renders without crashing', () => {
    render(
      <TestWrapper>
        <TechArtPage />
      </TestWrapper>
    );
  });
});
