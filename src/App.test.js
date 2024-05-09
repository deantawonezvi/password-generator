import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
  render(<App />);
});

test('generates password of correct length', async () => {
  const { getByText, getByRole } = render(<App />);

  fireEvent.click(getByText('GENERATE'));

  await waitFor(() => {
    const password = getByRole('textbox');
    expect(password.value.length).toBe(10);
  });
});

test('generates password with correct character types', async () => {
  const { getByText, getByRole, getByLabelText } = render(<App />);

  fireEvent.click(getByLabelText('Include Uppercase letters'));
  fireEvent.click(getByLabelText('Include Numbers'));
  fireEvent.click(getByText('GENERATE'));

  await waitFor(() => {
    const password = getByRole('textbox');
    expect(password.value).toMatch(/[A-Z]/);
    expect(password.value).toMatch(/[0-9]/);
  });
});

test('calculates password strength correctly', async () => {
  const { getByText, getByRole, getByLabelText } = render(<App />);

  fireEvent.click(getByLabelText('Include Uppercase letters'));
  fireEvent.click(getByLabelText('Include Numbers'));
  fireEvent.click(getByText('GENERATE'));

  await waitFor(() => {
    const strength = getByText(/STRENGTH/);
    expect(strength.textContent).toBe('MEDIUM');
  });
});

test('copies password to clipboard', async () => {
  const { getByText, getByRole } = render(<App />);

  fireEvent.click(getByText('GENERATE'));

  await waitFor(() => {
    const copyButton = getByRole('button', { name: /Copy to clipboard/ });
    fireEvent.click(copyButton);

    const copiedText = getByText('Copied!');
    expect(copiedText).toBeInTheDocument();
  });
});