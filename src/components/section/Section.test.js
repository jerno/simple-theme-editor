import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Section from './Section';

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

  it('renders no in-place editor until clicked', () => {
    const textbox = screen.queryAllByRole('textbox');
    expect(textbox).toHaveLength(0);
  });
  
  it('renders the in-place editor upon clicked', () => {
    const textboxesBeforeClick = screen.queryAllByRole('textbox');
    expect(textboxesBeforeClick).toHaveLength(0);

    const firstProperty = screen.queryAllByRole('row')[0];
    fireEvent.click(firstProperty, {});

    const textboxesAfterClick = screen.queryAllByRole('textbox');
    expect(textboxesAfterClick).toHaveLength(1);
  });

  it('hides the in-place editor upon ok clicked', () => {
    const textboxesBeforeClick = screen.queryAllByRole('textbox');
    expect(textboxesBeforeClick).toHaveLength(0);

    const firstProperty = screen.queryAllByRole('row')[0];
    fireEvent.click(firstProperty, {});

    const okButton = screen.getByText('OK');
    
    const textboxesAfterClick = screen.queryAllByRole('textbox');
    expect(textboxesAfterClick).toHaveLength(1);

    fireEvent.click(okButton, {});

    const textboxesAfterOkClick = screen.queryAllByRole('textbox');
    expect(textboxesAfterOkClick).toHaveLength(0);
  });

  it('hides the in-place editor upon cancel clicked', () => {
    const textboxesBeforeClick = screen.queryAllByRole('textbox');
    expect(textboxesBeforeClick).toHaveLength(0);

    const firstProperty = screen.queryAllByRole('row')[0];
    fireEvent.click(firstProperty, {});

    const cancelButton = screen.getByText('cancel');
    
    const textboxesAfterClick = screen.queryAllByRole('textbox');
    expect(textboxesAfterClick).toHaveLength(1);

    fireEvent.click(cancelButton, {});

    const textboxesAfterOkClick = screen.queryAllByRole('textbox');
    expect(textboxesAfterOkClick).toHaveLength(0);
  });

  it('calls updateSectionDefinition upon child update request', () => {
    const firstProperty = screen.queryAllByRole('row')[0];
    fireEvent.click(firstProperty, {});

    const valueField = screen.getByRole('textbox');
    expect(valueField).toBeDefined();
    
    userEvent.type(valueField, '0')
    
    expect(screen.getByDisplayValue('70')).toBeDefined();
    
    expect(mockCallback.mock.calls.length).toBe(0);
    
    fireEvent.click(screen.getByText('OK'), {});

    expect(mockCallback.mock.calls.length).toBe(1);
    const firstCall = mockCallback.mock.calls[0];
    const payload = firstCall[0];
    const affectedProperty = payload.nextProperty;
    expect(affectedProperty.value).toBe('70');
  });
});
