// src/components/MyComponent.test.tsx

import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

test('renders greeting text', () => {
  render(<MyComponent />);
  expect(screen.getByText('Hello Testing!')).toBeInTheDocument();
});
