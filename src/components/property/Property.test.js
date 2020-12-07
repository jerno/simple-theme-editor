import { fireEvent, render, screen } from '@testing-library/react';
import Property from './Property';

jest.mock('../../config/Definitions', () => ({
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

describe('Property', () => {
  it('renders raw value and variableReference', () => {
    const PROPERTY_DEFINITION = {
      displayName: 'Prop A',
      value: 'valueA',
      type: 'text',
      variableReference: 'prop-a',
    }
    const PREFIX = 'prefix';

    render(<Property definition={PROPERTY_DEFINITION} prefix={PREFIX} />);
    const { value, variableReference } = PROPERTY_DEFINITION;

    const expectedValue = value;
    const expectedVariableReference = `${PREFIX}.${variableReference}`;

    expect(screen.getByText(expectedValue, { exact: false })).toBeDefined();
    expect(screen.getByText(expectedVariableReference, { exact: false })).toBeDefined();
  });

  it('renders \'resolved\' value', () => {
    const PROPERTY_DEFINITION = {
      displayName: 'Prop A',
      value: 'valueA {test.ref}',
      type: 'text',
      variableReference: 'prop-a',
    };
    const DEFINITION_MAP = {
      "test.ref": {
        value: "resolved",
        type: "text"
      }
    };
    const PREFIX = 'prefix';

    render(<Property definition={PROPERTY_DEFINITION} prefix={PREFIX} resolvedReferences={DEFINITION_MAP} />);

    const expectedValue = 'valueA resolved';

    expect(screen.getByText(expectedValue, { exact: false })).toBeDefined();
  });

  it('renders the bare displayName for a textual type', () => {
    const PROPERTY_DEFINITION = {
      displayName: 'Prop A',
      value: 'valueA',
      type: 'opt1',
      variableReference: 'prop-a',
    }
    const PREFIX = 'prefix';

    render(<Property definition={PROPERTY_DEFINITION} prefix={PREFIX} />);
    const { displayName } = PROPERTY_DEFINITION;

    const expectedDisplayName = displayName;

    expect(screen.getByText(expectedDisplayName, { exact: false })).toBeDefined();
  });

  it('renders displayName with " (unit)" postfix for a "unit-like" type', () => {
    const PROPERTY_DEFINITION = {
      displayName: 'Prop A',
      value: '7',
      type: 'opt1',
      variableReference: 'prop-a',
    }
    const PREFIX = 'prefix';

    render(<Property definition={PROPERTY_DEFINITION} prefix={PREFIX} />);
    const { displayName, type } = PROPERTY_DEFINITION;

    const expectedValue = `${displayName} (${type})`;

    expect(screen.getByText(expectedValue, { exact: false })).toBeDefined();
  });

  it('emits onEdit when user clicks the component', () => {
    const PROPERTY_DEFINITION = {
      displayName: 'Prop A',
      value: '7',
      type: 'opt1',
      variableReference: 'prop-a',
    }
    const PREFIX = 'prefix';

    const mockCallback = jest.fn(() => { });
    render(<Property definition={PROPERTY_DEFINITION} prefix={PREFIX} onEdit={mockCallback} />);
    
    fireEvent.click(screen.getByRole('row'), {});

    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
