import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TestWrapper } from '../testUtils';
import ResumePage from '../../../pages/ResumePage/ResumePage';

describe('ResumePage', () => {
  test('renders without crashing', () => {
    render(
      <TestWrapper>
        <ResumePage />
      </TestWrapper>
    );
  });
});
