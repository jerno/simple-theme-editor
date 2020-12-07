import { fireEvent, render, screen } from '@testing-library/react';
import { SectionDefinitions } from '../config/Definitions';
import App from './App';

jest.mock('../config/Definitions', () => ({ 
  SectionDefinitions: [
    {
      id: 1,
      title: 'Custom section',
      prefix: 'custom',
      properties: [
        {
          displayName: 'Variable name',
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
          variableReference: 'var2',
        }
      ]
    },
  ],
  PropertyTypeDefinitions: [
    {
      value: 'text',
      label: 'text',
    },
  ]
}));

jest.mock('./storage/Storage', () => ({ 
  loadValues: () => (
    {
      'custom.var': {
        value: 'customValue',
        type: 'text'
      },
      'custom2.var2': {
        value: 'otherValue',
        type: 'text'
      }
    }
  )
}));

jest.mock('../components/section/Section', () => ({definition, updateSectionDefinition, resolvedReferences}) => {
  return (
    <div 
      role="rowgroup" 
      data-testid={`userUpdateSimulator-${definition.id}`} 
      onClick={() => updateSectionDefinition({
        variableReference: 'custom.var',
        updatedProperties: {
          value: 'nextValue',
          type: 'text',
        }
      })}
    >
      { definition.properties.map((prop) => resolvedReferences[`${definition.prefix}.${prop.variableReference}`].value).join(" ") }
    </div>
  );
});

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
});
