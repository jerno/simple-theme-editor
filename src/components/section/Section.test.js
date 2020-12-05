import { render, screen } from '@testing-library/react';
import Section from './Section';

const SECTION_DEFINITION = {
  id: 1,
  title: 'Test section',
  prefix: 'test',
  properties: [
    {
      displayName: 'Prop A',
      value: '7px',
      variableReference: 'prop-a',
    }
  ]
}

describe('Section', () => {
  beforeEach(() => {
    render(<Section definition={SECTION_DEFINITION} />);
  });

  it('renders without crashing', () => {});
  
  it('renders with title', () => {
    const titleElement = screen.getByText(new RegExp(SECTION_DEFINITION.title, "i"));
    expect(titleElement).toBeInTheDocument();
  });

  it('renders a row for each property', () => {
    const propertyElements = screen.queryAllByRole('row');
    expect(propertyElements).toHaveLength(SECTION_DEFINITION.properties.length);
  });

  it('renders each property details', () => {
    const propertyDisplayName = screen.getByText(new RegExp(SECTION_DEFINITION.properties[0].displayName, "i"));
    const propertyValue = screen.getByText(new RegExp(SECTION_DEFINITION.properties[0].value, "i"));
    const propertyVariableReference = screen.getByText(new RegExp(`${SECTION_DEFINITION.prefix}.${SECTION_DEFINITION.properties[0].variableReference}`, "i"));
    expect(propertyDisplayName).toBeDefined();
    expect(propertyValue).toBeDefined();
    expect(propertyVariableReference).toBeDefined();
  });
});