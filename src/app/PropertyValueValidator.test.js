import PropertyValueValidator from './PropertyValueValidator';

jest.mock('../config/Definitions', () => ({ 
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

describe('PropertyValueValidator', () => {
  it('passes for values of non-textual existing properties', () => {
    const property = {
      displayName: 'Variable name 2',
      value: '1',
      type: 'opt1',
      variableReference: 'var2',
    };
    const definitions = {};

    const validationError = PropertyValueValidator.validatePropertyAgainstDefinitions(property, definitions);
    expect(validationError).toBe(false);
  });

  it('passes for values of textual properties if the references are existing', () => {
    const property = {
      displayName: 'Variable name 2',
      value: '1px solid {colors.primary}',
      type: 'text',
      variableReference: 'var2',
    };
    const definitions = {
      "colors.primary": "#11ff22"
    };

    const validationError = PropertyValueValidator.validatePropertyAgainstDefinitions(property, definitions);
    expect(validationError).toBe(false);
  });

  it('fails for values of non-textual existing properties containing references', () => {
    const property = {
      displayName: 'Variable name 2',
      value: '1px {colors.primary}',
      type: 'opt1',
      variableReference: 'var2',
    };
    const definitions = {};

    const validationError = PropertyValueValidator.validatePropertyAgainstDefinitions(property, definitions);
    expect(validationError).toContain('Unexpected reference');
    expect(validationError).toContain('colors.primary');
  });

  it('fails for values of textual properties if the references are NOT existing', () => {
    const property = {
      displayName: 'Variable name 2',
      value: '1px solid {colors.nonExisting}',
      type: 'text',
      variableReference: 'var2',
    };
    const definitions = {
      "colors.primary": "#11ff22"
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
      "colors.color1": "{colors.color2}"
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
      "prefix.var": "1px solid {prefix.var}"
    };

    const validationError = PropertyValueValidator.validatePropertyAgainstDefinitions(property, definitions);
    expect(validationError).toContain('Chaining not spported');
  });
});
