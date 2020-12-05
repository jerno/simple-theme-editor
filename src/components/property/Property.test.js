import { render, screen } from '@testing-library/react';
import Property from './Property';


describe('Property', () => {
  it('renders value and variableReference', () => {
    const PROPERTY_DEFINITION = {
      displayName: 'Prop A',
      value: 'valueA',
      variableReference: 'prop-a',
    }
    const PREFIX = 'test-prefix';

    render(<Property definition={PROPERTY_DEFINITION} prefix={PREFIX} />);
    const { value, variableReference } = PROPERTY_DEFINITION;

    const expectedValue = value;
    const expectedVariableReference = `${PREFIX}.${variableReference}`;

    expect(screen.getByText(expectedValue, { exact: false })).toBeDefined();
    expect(screen.getByText(expectedVariableReference, { exact: false })).toBeDefined();
  });

  it('renders the bare displayName for a textual type', () => {
    const PROPERTY_DEFINITION = {
      displayName: 'Prop A',
      value: 'valueA',
      type: 'text',
      variableReference: 'prop-a',
    }
    const PREFIX = 'test-prefix';

    render(<Property definition={PROPERTY_DEFINITION} prefix={PREFIX} />);
    const { displayName } = PROPERTY_DEFINITION;

    const expectedDisplayName = displayName;

    expect(screen.getByText(expectedDisplayName, { exact: false })).toBeDefined();
  });

  it('renders displayName with " (unit)" postfix for a "unit-like" type', () => {
    const PROPERTY_DEFINITION = {
      displayName: 'Prop A',
      value: '7',
      type: 'em',
      variableReference: 'prop-a',
    }
    const PREFIX = 'test-prefix';

    render(<Property definition={PROPERTY_DEFINITION} prefix={PREFIX} />);
    const { displayName, type } = PROPERTY_DEFINITION;

    const expectedValue = `${displayName} (${type})`;

    expect(screen.getByText(expectedValue, { exact: false })).toBeDefined();
  });
});
