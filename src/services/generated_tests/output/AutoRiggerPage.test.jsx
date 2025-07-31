import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TestWrapper } from '../testUtils';
import AutoRiggerPage from '../../../pages/AutoRiggerPage/AutoRiggerPage';

describe('AutoRiggerPage', () => {
  
  test('renders without crashing', () => {
    render(
      <TestWrapper>
        <AutoRiggerPage />
      </TestWrapper>
    );
  });
});
