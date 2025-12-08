import React from 'react';
import { render, screen , fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import { TestWrapper } from '../testUtils';
import TypeEffect from '../../../components/TypeEffect/TypeEffect';

describe('TypeEffect', () => {
  
  test('renders without crashing', () => {
    render(
      <TestWrapper>
        <TypeEffect />
      </TestWrapper>
    );
  });
});
