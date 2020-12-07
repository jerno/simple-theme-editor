import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PropertyTypeDefinitions } from '../../config/Definitions';
import PropertyEditor from './PropertyEditor';


describe('PropertyEditor', () => {
  it('renders current value and variableReference', () => {
    const { value, variableReference, PREFIX } = renderEditor();

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
    const { type } = renderEditor();

    expect(screen.queryAllByRole('radio')).toHaveLength(PropertyTypeDefinitions.length);

    const radioOptions = screen.getAllByRole('radio');

    const checkedItems = radioOptions.filter((el) => el.checked);
    expect(checkedItems.length).toEqual(1);
    
    const uncheckedItems = radioOptions.filter((el) => !el.checked);
    expect(uncheckedItems.length).toEqual(PropertyTypeDefinitions.length - 1);
    
    const selectedDisplayName = PropertyTypeDefinitions.find((def) => def.value === type).label;
    const elementSelected = screen.getByLabelText(selectedDisplayName, { exact: false });
    expect(elementSelected).toBeDefined();
    
    expect(elementSelected.checked).toBeTruthy();
  });

  it('changes value when changing selected radio button', () => {
    renderEditor();
    
    const pixelLabel = PropertyTypeDefinitions.find((def) => def.value === 'px').label;
    const plainTextLabel = PropertyTypeDefinitions.find((def) => def.value === 'text').label;

    const pixelRadio = screen.getByLabelText(pixelLabel);
    const plainTextRadio = screen.getByLabelText(plainTextLabel);
    expect(pixelRadio).toBeDefined();
    expect(plainTextRadio).toBeDefined();
    
    expect(pixelRadio.checked).toBeFalsy();
    expect(plainTextRadio.checked).toBeTruthy();
    
    fireEvent.click(pixelRadio, {});
    
    expect(pixelRadio.checked).toBeTruthy();
    expect(plainTextRadio.checked).toBeFalsy();
  });

  it('emits value only when user submits the editor', () => {
    const { value, mockCallback } = renderEditor();

    const valueField = screen.getByDisplayValue(value);
    userEvent.type(valueField, '_updated');
        
    const submissionsBeforeClick = filterSubmissions(mockCallback.mock.calls);
    expect(submissionsBeforeClick.length).toBe(0);
    
    fireEvent.click(screen.getByText('OK'), {});

    const submissionsAfterClick = filterSubmissions(mockCallback.mock.calls);

    expect(submissionsAfterClick.length).toBe(1);
    expect(submissionsAfterClick[0][0].value).toBe('valueA_updated');
  });

  it('emits nothing when user cancels the edition', () => {
    const { value, mockCallback, mockCancel } = renderEditor();

    const valueField = screen.getByDisplayValue(value);
    userEvent.type(valueField, '_updated');
        
    const submissionsBeforeClick = filterSubmissions(mockCallback.mock.calls);
    expect(submissionsBeforeClick.length).toBe(0);
    
    fireEvent.click(screen.getByText('cancel'), {});

    const submissionsAfterClick = filterSubmissions(mockCallback.mock.calls);

    expect(submissionsAfterClick.length).toBe(0);
    expect(mockCancel.mock.calls.length).toBe(1);
  });

  it('renders error message when validation fails', () => {
    const { value, mockCallback } = renderEditor({
      updateCallback: () => 'Error message'
    });

    const valueField = screen.getByDisplayValue(value);
    userEvent.type(valueField, '_updated');
    
    const submissionsBeforeClick = filterSubmissions(mockCallback.mock.calls);
    expect(submissionsBeforeClick.length).toBe(0);
    
    fireEvent.click(screen.getByText('OK'), {});

    const submissionsAfterClick = filterSubmissions(mockCallback.mock.calls);

    expect(submissionsAfterClick.length).toBe(0);
    expect(screen.getByText('Error message', { exact: false })).toBeDefined();
    expect(screen.getByText('OK')).toBeDisabled();
  });

});

function filterSubmissions(calls) {
  return calls.filter((params) => params[1] === false);
}

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
  const { value, type, variableReference } = PROPERTY_DEFINITION;
  return { value, type, variableReference, PREFIX, mockCancel, mockCallback };
}
