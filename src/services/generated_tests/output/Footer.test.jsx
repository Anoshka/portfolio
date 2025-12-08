import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TestWrapper } from '../testUtils';
import Footer from '../../../components/Footer/Footer';

describe('Footer', () => {
  
  test('renders without crashing', () => {
    render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    );
  });
});
