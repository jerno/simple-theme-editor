import { render, screen } from '@testing-library/react';
import Section from './Section';

const MOCK_UPDATE_PROPERTIES = { value: 'nextValue' };

jest.mock('../property/PropertyEditor', () => ({updateSectionDefinition}) => {
  updateSectionDefinition(MOCK_UPDATE_PROPERTIES);
  return <div role="row"></div>;
});

const SECTION_DEFINITION = {
  id: 1,
  title: 'Test section',
  prefix: 'test',
  properties: [
    {
      displayName: 'Prop A',
      value: '7',
      type: 'px',
      variableReference: 'prop-a',
    }
  ]
}

describe('Section', () => {
  let mockCallback;

  beforeEach(() => {
    mockCallback = jest.fn(({type, value}) => {});
    render(<Section definition={SECTION_DEFINITION} updateSectionDefinition={mockCallback} />);
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

  it('calls updateSectionDefinition upon child update request', () => {
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0].properties[0].value).toBe(MOCK_UPDATE_PROPERTIES.value);
  });
});
