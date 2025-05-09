import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TestWrapper } from '../testUtils';
import TechArtGrid from '../../../components/TechArtGrid/TechArtGrid';

describe('TechArtGrid', () => {
  
  test('renders without crashing', () => {
    render(
      <TestWrapper>
        <TechArtGrid />
      </TestWrapper>
    );
  });
});
