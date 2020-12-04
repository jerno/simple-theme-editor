import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders with title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Simple Theme Editor/i);
    expect(titleElement).toBeInTheDocument();
  });
});
