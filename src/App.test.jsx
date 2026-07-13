import {render, screen} from '@testing-library/react';
import App from './App';

test('renders the mode tabs', () => {
  render(<App />);
  expect(screen.getByRole('button', {name: /clock/i})).toBeInTheDocument();
  expect(screen.getByRole('button', {name: /stopwatch/i})).toBeInTheDocument();
  expect(screen.getByRole('button', {name: /alarm/i})).toBeInTheDocument();
});
