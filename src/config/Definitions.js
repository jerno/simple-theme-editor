export const SectionDefinitions = [
  {
    id: 1,
    title: 'General colors',
    prefix: 'colors',
    properties: [
      {
        displayName: 'Primary font color',
        variableReference: 'primary',
      },
      {
        displayName: 'Primary background color',
        variableReference: 'primaryBackground',
      },
      {
        displayName: 'Secondary font color',
        variableReference: 'secondary',
      },
      {
        displayName: 'Secondary background color',
        variableReference: 'secondaryBackground',
      },
      {
        displayName: 'Highlight on primary background',
        variableReference: 'highlight1',
      },
      {
        displayName: 'Highlight on secondary background',
        variableReference: 'highlight2',
      },
    ]
  },
  {
    id: 2,
    title: 'Global sizes',
    prefix: 'sizes',
    properties: [
      {
        displayName: 'Default text size',
        variableReference: 'text',
      },
      {
        displayName: 'Header1 text size',
        variableReference: 'h1',
      },
      {
        displayName: 'Header2 text size',
        variableReference: 'h2',
      },
      {
        displayName: 'Default border width ',
        variableReference: 'borderWidth',
      }
    ]
  },
  {
    id: 3,
    title: 'Text field',
    prefix: 'textfield',
    properties: [
      {
        displayName: 'Text size',
        variableReference: 'textSize',
      },
      {
        displayName: 'Font color',
        variableReference: 'color',
      },
      {
        displayName: 'Border',
        variableReference: 'border',
      },
      {
        displayName: 'Background',
        variableReference: 'background',
      }
    ]
  },
  {
    id: 4,
    title: 'Buttons',
    prefix: 'buttons',
    properties: [
      {
        displayName: 'Font size',
        variableReference: 'fontSize',
      },
      {
        displayName: 'Font color',
        variableReference: 'color',
      },
      {
        displayName: 'Background',
        variableReference: 'background',
      }
    ]
  },
]
export const PropertyTypeDefinitions = [
  {
    value: 'text',
    label: 'Plain text',
  },
  {
    value: 'em',
    label: 'em',
  },
  {
    value: 'px',
    label: 'px',
  },
  {
    value: 'color',
    label: 'Color',
  },
]