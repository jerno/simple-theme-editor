import { fireEvent, render, screen } from '@testing-library/react';
import { SectionDefinitions } from '../config/Definitions';
import App from './App';
import PropertyValueValidator from './PropertyValueValidator';

jest.mock('../config/Definitions', () => ({ 
  SectionDefinitions: [
    {
      id: 1,
      title: 'Custom section',
      prefix: 'custom',
      properties: [
        {
          displayName: 'Variable name',
          value: 'customValue',
          type: 'text',
          variableReference: 'var',
        }
      ]
    },
    {
      id: 2,
      title: 'Custom section 2',
      prefix: 'custom2',
      properties: [
        {
          displayName: 'Variable name 2',
          value: 'otherValue',
          type: 'text',
          variableReference: 'var2',
        }
      ]
    },
  ],
  PropertyTypeDefinitions: [
    {
      value: 'opt1',
      label: 'opt1',
    },
    {
      value: 'opt2',
      label: 'opt2',
    },
  ]
}));

const MOCK_UPDATED_SECTION_DEFINITION = {
  id: 1,
  title: 'Custom section',
  prefix: 'custom',
  properties: [
    {
      displayName: 'Variable name',
      value: 'nextValue',
      type: 'text',
      variableReference: 'var',
    }
  ]
}

jest.mock('../components/section/Section', () => ({definition, updateSectionDefinition}) => {
  return (
    <div 
      role="rowgroup" 
      data-testid={`userUpdateSimulator-${definition.id}`} 
      onClick={() => updateSectionDefinition({
        nextSectionDefinition: MOCK_UPDATED_SECTION_DEFINITION,
        nextProperty: MOCK_UPDATED_SECTION_DEFINITION.properties[0]
      })}
    >
      { JSON.stringify(definition) }
    </div>
  );
});

jest.mock('./PropertyValueValidator', () => ({
  validatePropertyAgainstDefinitions: jest.fn((property, definitions) => false)
}));

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
  
  it('updates SectionDefinitions upon child update request', () => {
    const valueElement = screen.getByText(/customValue/i);
    expect(valueElement).toBeInTheDocument();

    const userUpdateSimulator = screen.getByTestId("userUpdateSimulator-1");
    fireEvent.click(userUpdateSimulator, {});

    const updatedValueElement = screen.getByText(/nextValue/i);
    expect(updatedValueElement).toBeInTheDocument();
  });

  it('maps the properties of the definitions (for the validation)', () => {
    const userUpdateSimulator = screen.getByTestId("userUpdateSimulator-1");
    fireEvent.click(userUpdateSimulator, {});

    expect(PropertyValueValidator.validatePropertyAgainstDefinitions.mock.calls.length).toBe(1);
    const firstCallParameters = PropertyValueValidator.validatePropertyAgainstDefinitions.mock.calls[0];
    const passedDefinitions = firstCallParameters[1];
    expect(passedDefinitions).toStrictEqual({
      "custom.var": "customValue",
      "custom2.var2": "otherValue"
    });
  });
});
