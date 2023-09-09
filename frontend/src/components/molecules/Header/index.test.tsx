import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Header from '.';

test('render header test', () => {
  render(<Header header='Real Estate' />);
  const buttonElement = screen.getByText('Real Estate');
  expect(buttonElement).toBeInTheDocument();
});

test('render and click add property', async () => {
  render(<Header header='Real Estate' />);
  const button = screen.getByRole('button', {
    name: 'Add Property',
  });
  await userEvent.click(button);
});
