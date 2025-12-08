import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TestWrapper } from '../testUtils';
import TechArtProjectPage from '../../../pages/TechArtProjectPage/TechArtProjectPage';

describe('TechArtProjectPage', () => {
  
  test('renders without crashing', () => {
    render(
      <TestWrapper>
        <TechArtProjectPage />
      </TestWrapper>
    );
  });
});
