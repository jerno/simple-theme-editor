import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PropertyTypeDefinitions } from '../../config/Definitions';
import PropertyEditor from './PropertyEditor';


describe('PropertyEditor', () => {
  it('renders currnet value and variableReference', () => {
    const PROPERTY_DEFINITION = {
      displayName: 'Prop A',
      value: 'valueA',
      type: 'text',
      variableReference: 'prop-a',
    }
    const PREFIX = 'prefix';

    render(<PropertyEditor definition={PROPERTY_DEFINITION} prefix={PREFIX} />);
    const { value, variableReference } = PROPERTY_DEFINITION;

    const expectedValue = value;
    const expectedVariableReference = `${PREFIX}.${variableReference}`;

    expect(screen.getByText(expectedValue, { exact: false })).toBeDefined();
    expect(screen.getByText(expectedVariableReference, { exact: false })).toBeDefined();
  });

  it('renders value editor field with the correct value', () => {
    const { value } = renderEditor();

    expect(screen.getByRole('textbox')).toBeDefined();
    expect(screen.getByDisplayValue(value)).toBeDefined();
  });

  it('changes value when changing editor field', () => {
    const { value } = renderEditor();

    const valueField = screen.getByDisplayValue(value);
    userEvent.type(valueField, '_updated');
    
    expect(screen.getByDisplayValue('valueA_updated')).toBeDefined();
  });

  it('renders type editor radio group', () => {
    const PROPERTY_DEFINITION = {
      displayName: 'Prop A',
      value: 'valueA',
      type: 'px',
      variableReference: 'prop-a',
    }
    const PREFIX = 'prefix';

    render(<PropertyEditor definition={PROPERTY_DEFINITION} prefix={PREFIX} />);

    expect(screen.queryAllByRole('radio')).toHaveLength(PropertyTypeDefinitions.length);

    const radioOptions = screen.getAllByRole('radio');

    const checkedItems = radioOptions.filter((el) => el.checked);
    expect(checkedItems.length).toEqual(1);
    
    const uncheckedItems = radioOptions.filter((el) => !el.checked);
    expect(uncheckedItems.length).toEqual(PropertyTypeDefinitions.length - 1);
    
    const selectedDisplayName = PropertyTypeDefinitions.find((def) => def.value === PROPERTY_DEFINITION.type).label;
    const elementSelected = screen.getByDisplayValue(selectedDisplayName);
    expect(elementSelected).toBeDefined();
    
    expect(elementSelected.checked).toBeTruthy();
  });

  it('changes value when changing selected radio button', () => {
    const PROPERTY_DEFINITION = {
      displayName: 'Prop A',
      value: 'valueA',
      type: 'px',
      variableReference: 'prop-a',
    }
    const PREFIX = 'prefix';

    render(<PropertyEditor definition={PROPERTY_DEFINITION} prefix={PREFIX} />);
    
    const pixelLabel = PropertyTypeDefinitions.find((def) => def.value === 'px').label;
    const plainTextLabel = PropertyTypeDefinitions.find((def) => def.value === 'text').label;

    const pixelRadio = screen.getByLabelText(pixelLabel);
    const plainTextRadio = screen.getByLabelText(plainTextLabel);
    expect(pixelRadio).toBeDefined();
    expect(plainTextRadio).toBeDefined();
    
    expect(pixelRadio.checked).toBeTruthy();
    expect(plainTextRadio.checked).toBeFalsy();
    
    fireEvent.click(plainTextRadio, {});
    
    expect(pixelRadio.checked).toBeFalsy();
    expect(plainTextRadio.checked).toBeTruthy();
  });

  it('emits value only when user submits the editor', () => {
    const { value, mockCallback } = renderEditor();

    const valueField = screen.getByDisplayValue(value);
    userEvent.type(valueField, '_updated');
        
    expect(mockCallback.mock.calls.length).toBe(0);
    
    fireEvent.click(screen.getByText('OK'), {});

    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0].value).toBe('valueA_updated');
  });

  it('emits nothing when user cancels the edition', () => {
    const { value, mockCallback, mockCancel } = renderEditor();

    const valueField = screen.getByDisplayValue(value);
    userEvent.type(valueField, '_updated');
        
    expect(mockCallback.mock.calls.length).toBe(0);
    
    fireEvent.click(screen.getByText('cancel'), {});

    expect(mockCallback.mock.calls.length).toBe(0);
    expect(mockCancel.mock.calls.length).toBe(1);
  });

  it('renders error message when validation fails', () => {
    const { value, mockCallback } = renderEditor({
      updateCallback: () => 'Error message'
    });

    const valueField = screen.getByDisplayValue(value);
    userEvent.type(valueField, '_updated');
        
    expect(mockCallback.mock.calls.length).toBe(0);
    
    fireEvent.click(screen.getByText('OK'), {});

    expect(mockCallback.mock.calls.length).toBe(1);
    expect(screen.getByText('Error message', { exact: false })).toBeDefined();
  });

});

function renderEditor(options = {}) {
  const updateCallback = options.updateCallback || (() => { });
  const PROPERTY_DEFINITION = {
    displayName: 'Prop A',
    value: 'valueA',
    type: 'text',
    variableReference: 'prop-a',
  };
  const PREFIX = 'prefix';

  const mockCallback = jest.fn(updateCallback);
  const mockCancel = jest.fn(() => { });

  render(<PropertyEditor definition={PROPERTY_DEFINITION} prefix={PREFIX} updateSectionDefinition={mockCallback} onCancel={mockCancel} />);
  const { value } = PROPERTY_DEFINITION;
  return { value, mockCancel, mockCallback };
}
