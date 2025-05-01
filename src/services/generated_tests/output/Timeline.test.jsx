import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TestWrapper } from '../testUtils';
import Timeline from '../../../components/Timeline/Timeline';

describe('Timeline', () => {
  
  test('renders without crashing', () => {
    render(
      <TestWrapper>
        <Timeline />
      </TestWrapper>
    );
  });
});
