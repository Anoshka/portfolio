import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TestWrapper } from '../testUtils';
import Card from '../../../components/Card/Card';

describe('Card', () => {
  const defaultProps = {
    title: 'Test Card',
    image: 'test-image.jpg',
    link: 'https://test.com',
  };

  test('renders with required props', () => {
    render(
      <TestWrapper>
        <Card {...defaultProps} />
      </TestWrapper>
    );
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
  });

  test('renders link with correct href', () => {
    render(
      <TestWrapper>
        <Card {...defaultProps} />
      </TestWrapper>
    );
    expect(screen.getByRole('link')).toHaveAttribute('href', defaultProps.link);
  });
});
