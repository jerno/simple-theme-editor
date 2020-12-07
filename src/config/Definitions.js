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
      }
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
      }
    ]
  },
  {
    id: 3,
    title: 'Text field',
    prefix: 'textfield',
    properties: [
      {
        displayName: 'Border',
        variableReference: 'border',
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