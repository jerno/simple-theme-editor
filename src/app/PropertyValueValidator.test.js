import PropertyValueValidator from './PropertyValueValidator';

jest.mock('../config/Definitions', () => ({ 
  PropertyTypeDefinitions: [
    {
      value: 'text',
      label: 'text',
    },
    {
      value: 'em',
      label: 'em',
    },
  ]
}));

describe('PropertyValueValidator', () => {
  it('passes for fixed values', () => {
    const property = {
      displayName: 'Variable name 2',
      value: '1',
      type: 'em',
      variableReference: 'var2',
    };
    const definitions = {};

    const validationError = PropertyValueValidator.validatePropertyAgainstDefinitions(property, definitions);
    expect(validationError).toBe(false);
  });

  it('passes for values of properties if the references are existing', () => {
    const property = {
      displayName: 'Variable name 2',
      value: '{sizes.text}',
      type: 'em',
      variableReference: 'var2',
    };
    const definitions = {
      "sizes.text": {
        value: "1.2",
        type: "em",
      }
    };

    const validationError = PropertyValueValidator.validatePropertyAgainstDefinitions(property, definitions);
    expect(validationError).toBe(false);
  });

  it('fails for values of properties if the references are NOT existing', () => {
    const property = {
      displayName: 'Variable name 2',
      value: '1px solid {colors.nonExisting}',
      type: 'text',
      variableReference: 'var2',
    };
    const definitions = {
      "colors.primary": {
        value: "#11ff22",
        type: "color",
      }
    };

    const validationError = PropertyValueValidator.validatePropertyAgainstDefinitions(property, definitions);
    expect(validationError).toContain('Undefined property');
    expect(validationError).toContain('colors.nonExisting');
  });
  
  it('fails for values of NON-existing property types', () => {
    const property = {
      displayName: 'Variable name 2',
      value: '1px solid',
      type: 'nonExisting',
      variableReference: 'var2',
    };
    const definitions = {};

    const validationError = PropertyValueValidator.validatePropertyAgainstDefinitions(property, definitions);
    expect(validationError).toContain('Undefined type');
  });

  it('fails for values that are using further references', () => {
    const property = {
      displayName: 'Variable name',
      value: '1px solid {colors.color1}',
      type: 'text',
      variableReference: 'var',
    };
    const definitions = {
      "colors.color1": {
        value: "{colors.color2}",
        type: "color"
      }
    };

    const validationError = PropertyValueValidator.validatePropertyAgainstDefinitions(property, definitions);
    expect(validationError).toContain('Chaining not spported');
  });

  it('fails for values that are using self references', () => {
    const property = {
      displayName: 'Variable name',
      value: '1px solid {prefix.var}',
      type: 'text',
      variableReference: 'var',
    };
    const definitions = {
      "prefix.var": {
        value: "1px solid {prefix.var}",
        type: "text"
      }
    };

    const validationError = PropertyValueValidator.validatePropertyAgainstDefinitions(property, definitions);
    expect(validationError).toContain('Chaining not spported');
  });
});
