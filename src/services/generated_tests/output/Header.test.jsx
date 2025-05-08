import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TestWrapper } from '../testUtils';
import Header from '../../../components/Header/Header';

describe('Header', () => {
  test('renders navigation links', () => {
    render(
      <TestWrapper>
        <Header isOpen={false} />
      </TestWrapper>
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('toggles menu on button click', () => {
    render(
      <TestWrapper>
        <Header isOpen={false} />
      </TestWrapper>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
  });
});
