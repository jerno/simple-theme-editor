import { render, screen } from '@testing-library/react';
import { SectionDefinitions } from '../config/Definitions';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('renders with title', () => {
    const titleElement = screen.getByText(/Simple Theme Editor/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders with predefined sections', () => {
    const sectionElements = screen.queryAllByRole(/rowgroup/i);
    expect(sectionElements).toHaveLength(SectionDefinitions.length);
  });
});
