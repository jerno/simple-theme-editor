import { render, screen } from '@testing-library/react';
import Property from './Property';

const PROPERTY_DEFINITION = {
  displayName: 'Prop A',
  value: '7px',
  variableReference: 'prop-a',
}
const PREFIX = 'test-prefix';

describe('Property', () => {
  beforeEach(() => {
    render(<Property definition={PROPERTY_DEFINITION} prefix={PREFIX} />);
  });

  it('renders each property details', () => {
    const propertyDisplayName = screen.getByText(new RegExp(PROPERTY_DEFINITION.displayName, "i"));
    const propertyValue = screen.getByText(new RegExp(PROPERTY_DEFINITION.value, "i"));
    const propertyVariableReference = screen.getByText(new RegExp(`${PREFIX}.${PROPERTY_DEFINITION.variableReference}`, "i"));
    expect(propertyDisplayName).toBeDefined();
    expect(propertyValue).toBeDefined();
    expect(propertyVariableReference).toBeDefined();
  });
});
