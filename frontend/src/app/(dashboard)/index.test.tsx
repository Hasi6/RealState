import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './page';

test('renders a button with the correct text', () => {
  render(<Button />);
  const buttonElement = screen.getByText('Dashboard');
  expect(buttonElement).toBeInTheDocument();
});
